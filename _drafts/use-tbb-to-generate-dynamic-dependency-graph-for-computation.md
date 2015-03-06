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

# The New Merge Node

[tbb::join_node documentation]:https://www.threadingbuildingblocks.org/docs/help/reference/flow_graph/join_node_cls.htm
