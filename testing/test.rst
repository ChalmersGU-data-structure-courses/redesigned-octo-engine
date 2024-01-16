.. raw:: html

   <script>ODSA.SETTINGS.MODULE_SECTIONS = ['depth-first-solution', 'queue-based-solution-optional'];</script>

.. _GraphTopsort:


.. raw:: html

   <script>ODSA.SETTINGS.DISP_MOD_COMP = true;ODSA.SETTINGS.MODULE_NAME = "GraphTopsort";ODSA.SETTINGS.MODULE_LONG_NAME = "Topological Sort";ODSA.SETTINGS.MODULE_CHAPTER = "Graphs"; ODSA.SETTINGS.BUILD_DATE = "2022-11-16 09:58:48"; ODSA.SETTINGS.BUILD_CMAP = true;JSAV_OPTIONS['lang']='en';JSAV_EXERCISE_OPTIONS['code']='pseudo';</script>


.. |--| unicode:: U+2013   .. en dash
.. |---| unicode:: U+2014  .. em dash, trimming surrounding whitespace
   :trim:



.. odsalink:: AV/Graph/topSortDFSCON.css

.. odsalink:: AV/Graph/topSortQCON.css
.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: graph traversal
   :topic: Graphs

Topological Sort
================

Topological Sort
----------------

Assume that we need to schedule a series of tasks, such as classes or
construction jobs, where we cannot start one task until after its
prerequisites are completed.
We wish to organize the tasks into a linear order that allows us to
complete them one at a time without violating any prerequisites.
We can model the problem using a DAG.
The graph is directed because one task is a prerequisite of
another -- the vertices have a directed relationship.
It is acyclic because a cycle would indicate a conflicting series of
prerequisites that could not be completed without violating at least
one prerequisite.
The process of laying out the vertices of a DAG in a linear order to
meet the prerequisite rules is called a :term:`topological sort`.

Figure :num:`Figure #TopSort` illustrates the problem.
An acceptable topological sort for this example is J1,
J2, J3, J4, J5, J6, J7. However, other orders are also acceptable,
such as J1, J3, J2, J6, J4, J5, J7.

.. _TopSort:

.. inlineav:: topSortCON dgm
   :align: center

   An example graph for topological sort. Seven tasks have
   dependencies as shown by the directed graph.


Depth-first solution
---------------------

A topological sort may be found by performing a DFS on the graph.
When a vertex is visited, no action is taken (i.e., function
``PreVisit`` does nothing).
When the recursion pops back to that vertex, function
``PostVisit`` adds the vertex to a stack.
In the end, the stack is returned to the caller.

The reason that we use a stack is that this algorithm produces the
vertices in reverse topological order.
And if we pop the elements in the stack, they will be popped in
topological order.

So the DFS algorithm yields a topological sort in reverse order.
It does not matter where the sort starts, as long as all vertices
are visited in the end.
Here is implementation for the DFS-based algorithm.

.. codeinclude:: ChalmersGU/Graphs/Topsort
   :tag: TopsortDFS

Using this algorithm starting at J1 and visiting adjacent
neighbors in alphabetic order, vertices of the graph in
Figure :num:`Figure #TopSort` are pushed to the stack in the order J7,
J5, J4, J6, J2, J3, J1.
Popping them one by one yields the topological sort
J1, J3, J2, J6, J4, J5, J7.

Here is another example.

.. inlineav:: topSortDFSCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: TopSort Slideshow
   :output: show


Queue-based Solution (optional)
--------------------------------

We can implement topological sort using a queue
instead of recursion, as follows.

First visit all edges, counting the number of
edges that lead to each vertex (i.e., count the number of
prerequisites for each vertex).
All vertices with no prerequisites are placed on the queue.
We then begin processing the queue.
When vertex :math:`v` is taken off of the queue, it is added to
a list containing the topological order, and all
neighbors of :math:`v` (that is, all vertices that have :math:`v` as a
prerequisite) have their counts decremented by one.
Place on the queue any neighbor whose count becomes zero.
If the queue becomes empty without having added all vertices to the final list, then
the graph contains a cycle (i.e., there is no possible ordering
for the tasks that does not violate some prerequisite).
The order in which the vertices are added to the final list is
the correct one, so if traverse the final list
we will get the elements in topological order.
Applying the queue version of topological sort to the graph of
Figure :num:`Figure #TopSort` produces J1, J2, J3, J6, J4, J5, J7.
Here is an implementation for the algorithm.

.. codeinclude:: ChalmersGU/Graphs/Topsort
   :tag: TopsortBFS

.. inlineav:: topSortQCON ss
   :points: 0.0
   :required: False
   :threshold: 1.0
   :long_name: topSortQCON Slideshow
   :output: show

.. odsascript:: AV/Graph/topSortCON.js
.. odsascript:: AV/Graph/topSortDFSCON.js
.. odsascript:: AV/Graph/topSortQCON.js
