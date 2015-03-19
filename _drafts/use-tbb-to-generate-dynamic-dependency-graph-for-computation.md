---
title: "Use TBB to Generate Dynamic Dependency Graph For Computation"
layout: post
category : Multi-Threading
tagline: ""
tags : [TBB, multithreading]
---
{% include JB/setup %}

# Overview

# Typical TBB Flow Graph

```
#include<cstdio>
#include "tbb/flow_graph.h"

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

The example above is quite simple, only take a fixed computation flow graph. However
in reality, the flow graph usually is dynamically created somewhere, and we are going
to create the TBB flow graph:

```
using fnode = tbb::flow::function_node<Param, Param>;

void computeFlowGraph(const std::vector<Node*>& nodes, const Param& computationParam) {
  std::vector<fnode*> fnodes;
  std::unordered_map<Node*, fnode*> nfmap;

  tbb::flow::graph g;

  for (auto n : nodes) {
    auto f = new fnode(g, n->getConcurrentCount(),
                       [=](const Param& p) { return (*n)(p); } ));
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

  deletePointerVector(fnodes);
}
```

Because the topology is not known until we create the graph, the TBB flow graph
nodes can only be placed on the heap so they will remain valid till the end of
the computation.

# 1 Task Per Message VS. 1 Task Per N Messages From All Parents

Everything in TBB is nice and useful, but the `function_node` is not the one
you want: You want the node to spawn only a task after it receives one message from
each parents, not spawn one task per message from any parent, because the node
needs to wait all its parents to finish processing the message first.

There is a `join_node` looks interesting, but after a closer look, it's still
not the expected one: because the message type is a fixed empty class `continue_msg`.

Also all other node type cannot satisfy this requirement. How to solve this problem?

# The Pipeline

# The Merge Node

[tbb::join_node documentation]:https://www.threadingbuildingblocks.org/docs/help/reference/flow_graph/join_node_cls.htm
