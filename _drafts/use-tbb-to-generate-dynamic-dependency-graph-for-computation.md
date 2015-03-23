---
title: "Use TBB to Generate Dynamic Dependency Graph For Computation"
layout: post
category : Multi-Threading
tagline: ""
tags : [TBB, multithreading]
---
{% include JB/setup %}

# Overview

TBB flow graph provides a way to do flow-based programming. For problems
which can be described as a dependency graph, it provides a clear interface to
describe the problem, with good performance and scalability across multiple CPU
cores.

A typical TBB flow graph code looks like below:

```
using namespace tbb::flow;

int main() {
   graph g;
   function_node<int,int>
       f1( g, unlimited, [](const int &i) { return 2*i; } );
   function_node<float,float>
       f2( g, unlimited, [](const float &f) { return f/2; } );

   join_node< flow::tuple<int,float> > j(g);

   function_node< flow::tuple<int,float> >
       f3( g, unlimited,
           []( const flow::tuple<int,float> &t ) {
               printf( "Result is %f\n",
                       std::get<0>(t) + std::get<1>(t));
           } );

   make_edge( f1, input_port<0>( j ) );
   make_edge( f2, input_port<1>( j ) ;
   make_edge( j, f3 );

   f1.try_put( 3 );
   f2.try_put( 3 );
   g.wait_for_all( );
   return 0;
}
```
_Example taken from [tbb::join_node documentation]._

# Dynamic Graph

The example above is quite simple, only take a predefined computation flow graph.
However in reality, the flow graph usually is dynamically created somewhere,
especially when trying to adopt TBB for a legacy system, and we will need
to create the flow graph at runtime:

```
using fnode = tbb::flow::function_node<msg_t, msg_t>;

void computeFlowGraph(const std::vector<Node*>& nodes, const msg_t& computationParam) {
  std::vector<fnode*> fnodes;
  std::unordered_map<Node*, fnode*> nfmap;

  tbb::flow::graph g;

  for (auto n : nodes) {
    // not capturing *n directly to avoid copy
    auto f = new fnode(g, n->getConcurrentCount(),
                       [=](const msg_t& p) { return (*n)(p); } ));
    fnodes.push_back(f);
    nfmap[n] = f;
  }

  for (auto n : nodes) {
    for (auto p : n->getParents()) {
      tbb::flow::make_edge(*nfmap[p], *nfmap[n]);
    }
  }

  // get all the initial function nodes and start computation
  std::vector<fnode> initials = getInitialNodes(nfmap);
  for (auto fn: initials) {
    fn->try_put(computationParam);
  }

  g.wait_for_all();

  deletePointerVector(fnodes);
}
```

Because the topology is not known until we create the graph, the TBB flow graph
nodes can only be placed on the heap so they will remain valid till the end of
the computation.

# 1 Task Per 1 Message VS. 1 Task Per N Messages

Everything in TBB is nice and handy, except the `function_node` might not be
the one you want: You are expecting a node will spawn only one task after
receiving one message from each parents, not spawn one task per message
received from any parent.
Because the node needs to wait all its parents to finish processing their
message first.

There is a `join_node` looks interesting, but after a closer look, it's still
not the expected one: the message type is of a fixed empty class `continue_msg`. There is no way to pass any extra information through the `join_node`.

Also all other node type cannot meet this requirement. How to solve this problem?

# The Pipeline

In TBB there is another pattern called [Pipeline]. It simulates a assembly line
which contains several processing stage. Only after one stage finishes its work, next
stage can start. Different stages can run at same time.

One constraint of `tbb::parallel_pipeline` is that TBB doesn't support
[non-linear pipelines]. This may seem to reduce the parallelism, however
it only affects the latency since all of the stages can always be processed in
parallel.

Because of this, the graph should be sorted before it can be expressed in
a linear pipeline.

But there is one limitation: If before the message can be passed to a child node,
we need to collect all messages coming from parents. Pipeline cannot deal with this
situation.

# The Merge Node

To solve the "1 task per N messages" problem, all messages from parents need to be
merged into one, then passed onto the child `function_node`.
The general idea is like this:

> `join_node<tuple<msg_t...>>` => `function_node<msg_t, msg_t>`

From the interface we can tell `join_node` is lightweight and what it does is
only put all the input from its parents into a `tuple` and passed to downstream.
 If we chain the `join_node` with a `function_node`, there should be little cost.

But here comes another problem: How to store these nodes of different type.
The `join_node` which joins different number of nodes are of different type.
The entire graph is created dynamically, and all nodes need to be kept alive
before computation finishes. Take below topology for example:

```
// TODO: use a picture
A--B
 \  \
  ---C---
   \  \  \
    ------D
```  

Suppose we have a `merge_node` will merge all the parent inputs. These nodes above will be:

```
auto *A = new function_node<msg_t, msg_t>(...);
auto *B = new function_node<msg_t, msg_t>(...);
auto *C = new merge_node(new join_node<tuple<msg_t, msg_t>>(...),
                         new function_node<msg_t, msg_t>(...));
auto *D = new merge_node(new join_node<tuple<msg_t, msg_t, msg_t>>(...),
                         new function_node<msg_t, msg_t>(...));
```

Imagine the graph can be rather complicated where a node can have at most 10
parents! Either there will be many node vectors corresponding to each node
type, or we have to find another way to erase the type of each node and
restore the type information later for making edges and destruction.

# Erase/Restore Type Information

In above example, the type of a node is related to how many parents it has.
If you remember the old C trick: every pointer can be converted to a `void*`,
and convert back to a proper type. Using this trick, we can keep the pointer
to the join_node as a `void*`. Only convert it to correct type when we need
(i.e. making edge and inside destructor) by doing a runtime dispatch based on
how many parents a node has.

```
template <typename msg_t, typename merge_t>
class merge_node {
  const int n_parent = 0;
  void* jnode = nullptr;
  void* fnode = nullptr;
  merge_t merge;

public:
  template <typename Body>
  merge_node(tbb::flow::gaph& g, const Body& body, int n_parent);

  ~merge_node();
};

template <typename msg_t, typename merge_t>
template <typename Body>
merge_node<msg_t, merge_t>::merge_node(tbb::flow::graph& g, size_t concurrency,
                                       const Body& body, int n_parent)
  : n_parent(n_parent) {
  if (n_parent <= 1) {
    fnode = new function_node<msg_t, msg_t>(g, body);
  } else {
    switch (n_parent) {
    case 2: {
      auto* jn = new join_node<tuple<msg_t, msg_t>>(g);
      auto* fn = new function_node<tuple<msg_t, msg_t>, msg_t>(g, concurrency,
                    [=](const tuple<msg_t, msg_t>& msgs) {
                      return body(merge(msgs));
                    });
      make_edge(*jn, *fnode);
      jnode = jn;
      fnode = fn;
      break;
      }
    // case 3 and the rest is similar to case 2
    }
  }
}

template <typename msg_t, typename merge_t>
merge_node<msg_t, merge_t>::~merge_node() {
  assert(jnode);
  switch (n_parent) {
  case 0:
  case 1:
    assert(fnode && !jnode);
    delete reinterpret_cast<function_node<msg_t, msg_t>*>(fnode);
    return;

  case 2:
    assert(fnode && jnode);
    delete reinterpret_cast<function_node<tuple<msg_t, msg_t>, msg_t>*>(fnode);
    delete reinterpret_cast<join_node<tuple<msg_t, msg_t>>*>(jnode);
    return;
  // case 3 and the rest is similar to case 2
  }
}
```

Of course you can use macros to remove the many duplications here. For a full implementation, please refer to [merge_node sources].

# Known Limitations

Because TBB doesn't support `join_node` with more than 10 parents, `merge_node`
doesn't either. But you can always workaround this by creating an intermediate
node that merge 0~9 nodes and merge its output with the rest 10~N nodes.

However, usually these many parents would indicate a bottle neck in the graph,
and probably a poor graph design.

[tbb::join_node documentation]:https://www.threadingbuildingblocks.org/docs/help/reference/flow_graph/join_node_cls.htm
[non-linear pipelines]:https://www.threadingbuildingblocks.org/docs/help/tbb_userguide/Non-Linear_Pipelines.htm
[merge_node sources]:http://google.com
[Pipeline]:https://www.threadingbuildingblocks.org/docs/help/reference/algorithms/pipeline_cls.htm
[criticizing on TBB's flow-based programming]:https://groups.google.com/forum/#!topic/flow-based-programming/JkInzGvySAg
