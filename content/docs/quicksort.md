+++
title = 'Quicksort'
draft = true
+++

<!--  we've got to fix this later !-->
<link rel="stylesheet" href="/lib/normalize.css" type="text/css" />
<link rel="stylesheet" href="/lib/JSAV.css" type="text/css" />
<link rel="stylesheet" href="/lib/odsaMOD-min.css" type="text/css" />
<link rel="stylesheet" href="/lib/jquery.ui.min.css" type="text/css" />
<link rel="stylesheet" href="/lib/odsaStyle-min.css" type="text/css" />
<link rel="stylesheet" href="/lib/accessibility.css" type="text/css" />
<script type="text/javascript" src="/lib/jquery.min.js"></script>
<script type="text/javascript" src="/lib/jquery.migrate.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js"></script>
<script type="text/javascript" src="/lib/accessibility.js"></script>
<script type="text/javascript" src="/lib/jquery.ui.min.js"></script>
<script type="text/javascript" src="/lib/jquery.transit.js"></script>
<script type="text/javascript" src="/lib/raphael.js"></script>
<script type="text/javascript" src="/lib/JSAV-min.js"></script>
<script type="text/javascript" src="_static/config.js"></script>
<script type="text/javascript" src="/lib/timeme-min.js"></script>
<script type="text/javascript" src="/lib/odsaUtils-min.js"></script>
<script type="text/javascript" src="/lib/odsaMOD-min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.min.js"></script>
<script type="text/javascript" src="https://d3js.org/d3-selection-multi.v1.min.js"></script>
<script type="text/javascript" src="/lib/dataStructures.js"></script>
<script type="text/javascript" src="/lib/conceptMap.js"></script>
<script type="text/javascript" src="/AV/Sorting/quicksortCODE.js"></script>
<script type="text/javascript" src="/AV/Sorting/quicksortCON.js"></script>
<script type="text/javascript" src="/AV/Sorting/QuickSortPartitionAnalysisCON.js"></script>
<script type="text/javascript" src="/AV/Sorting/QuickSortWorstCaseCON.js"></script>
<script type="text/javascript" src="/AV/Sorting/QuickSortBestCaseCON.js"></script>
<script type="text/javascript" src="/AV/Sorting/QuickSortAverageCaseCON.js"></script>

# 2.12. Quicksort

## 2.12.1. Introduction
While Mergesort uses the most obvious form of divide and conquer (split the list in half then sort the halves), this is not the only way that we can break down the sorting problem. We saw that doing the merge step for Mergesort when using an array implementation is not so easy. So perhaps a different divide and conquer strategy might turn out to be more efficient?

Quicksort is aptly named because, when properly implemented, it is one of the fastest known general-purpose in-memory sorting algorithms in the average case. It does not require the extra array needed by Mergesort, so it is space efficient as well. Quicksort is widely used, and is typically the algorithm implemented in a library sort routine such as the UNIX `qsort` function. Interestingly, Quicksort is hampered by exceedingly poor worst-case performance, thus making it inappropriate for certain applications.

Quicksort first selects a value called the pivot. Assume that the input array contains $k$ records with key values less than the pivot. The records are then rearranged in such a way that the $k$ values less than the pivot are placed in the first, or leftmost, $k$ positions in the array, the pivot itself is placed at index k, and the values greater than or equal to the pivot are placed in the last, or rightmost, $n-k-1$ positions. This is called a partition of the array. The values placed in a given partition need not (and typically will not) be sorted with respect to each other. All that is required is that all values end up in the correct partition. The pivot value itself is placed in position $k$. Quicksort then proceeds to sort the resulting subarrays now on either side of the pivot, one of size $k$ and the other of size $n-k-1$. How are these values sorted? Because Quicksort is such a good algorithm, using Quicksort on the subarrays would be appropriate.

Unlike some of the sorts that we have seen earlier in this chapter, Quicksort might not seem very “natural” in that it is not an approach that a person is likely to use to sort real objects. But it should not be too surprising that a really efficient sort for huge numbers of abstract objects on a computer would be rather different from our experiences with sorting a relatively few physical objects.

Here is an implementation for Quicksort. Parameters left and right define the left and right indices, respectively, for the subarray being sorted. The initial call to `quickSort` would be `quickSort(array, 0, n-1)`.

{{< tabs "quicksort" >}}
{{< tab "Java" >}}
```java
public static <E extends Comparable<E>> void quickSort(E[] A, int left, int right) {
    if (left >= right)                          // Base case: Subarray length is <= 1
        return;
    int pivot = findPivot(A, left, right);      // Pick a pivot index
    pivot = partition(A, left, right, pivot);   // Partition the subarray; update pivot with its new position
    quickSort(A, left, pivot-1);                // Sort left partition
    quickSort(A, pivot+1, right);               // Sort right partition
}
```
{{< /tab >}}

{{< tab "Python" >}}

```py
def quickSort(A, left, right):
    if left >= right:                          # Base case: Subarray length is <= 1
        return
    pivot = findPivot(A, left, right)          # Pick a pivot index
    pivot = partition(A, left, right, pivot)   # Partition the subarray; update pivot with its new position
    quickSort(A, left, pivot-1)                # Sort left partition
    quickSort(A, pivot+1, right)               # Sort right partition
```
{{< /tab >}}
{{< /tabs >}}

Function partition will move records to the appropriate partition and then return the final position of the pivot. This is the correct position of the pivot in the final, sorted array. By doing so, we guarantee that at least one value (the pivot) will not be processed in the recursive calls to quickSort. Even if a bad pivot is selected, yielding a completely empty partition to one side of the pivot, the larger partition will contain at most n−1 records.

Selecting a pivot can be done in many ways. The simplest is to use the first key. However, if the input is sorted or reverse sorted, this will produce a poor partitioning with all values to one side of the pivot. One simple way to avoid this problem is to select the middle position in the array. Here is a simple findPivot function implementing this idea. Note that later in the chapter we will switch to a better pivot selection strategy.

{{< tabs "quicksort_pivotselect" >}}
{{< tab "Java" >}}
```java
static <E extends Comparable<E>> int findPivot(E[] A, int i, int j) {
    // Not-so-good pivot selection: always choose the middle element.
    return (i + j) / 2;
}
```
{{< /tab >}}

{{< tab "Python" >}}

```py
def findPivot(A, i, j):
    """Not-so-good pivot selection: always choose the middle element."""
    return (i + j) // 2
```
{{< /tab >}}
{{< /tabs >}}

<iframe id="QuicksortPivotPRO_iframe" aria-label="QuicksortPivotPRO" src="/Exercises/Sorting/QuicksortPivotPRO.html?localMode=true&amp;module=Quicksort&amp;selfLoggingEnabled=false&amp;JXOP-debug=true&amp;JOP-lang=en&amp;JXOP-code=pseudo&amp;scoringServerEnabled=false&amp;loggingServerEnabled=false&amp;threshold=5&amp;points=1.0&amp;required=True" class="embeddedExercise" width="950" height="525" data-showhide="show" scrolling="no" style="position: relative; top: 0px; width: 100%;">Your browser does not support iframes.</iframe>

## 2.12.2 Partition
We now turn to function partition. If we knew in advance how many keys are less than the pivot, partition could simply copy records with key values less than the pivot to the low end of the array, and records with larger keys to the high end. Because we do not know in advance how many keys are less than the pivot, we use a clever algorithm that moves indices inwards from the ends of the subarray, swapping values as necessary until the two indices meet.

Since Quicksort is a recursive algorithm, we will not only partition the whole array, but also part of the array. Therefore partition needs the positions of the leftmost and rightmost elements in the subarray that we will partition.

{{< tabs "quicksort_partition" >}}
{{< tab "Java" >}}
```java
static <E extends Comparable<E>> int partition(E[] A, int left, int right, int pivot) {
    Util.swap(A, left, pivot);   // Put pivot at the leftmost index
    pivot = left;
    left++;                 // Start partitioning from the element after the pivot

    E pivotValue = A[pivot];
    while (true) {
        // Move `left` right as far as possible. Stop if equal to pivot!
        // Also stop if `left` moves past `right` – this is important,
        // so that `left` stops if it moves past the end of the array.
        while (left <= right && A[left].compareTo(pivotValue) < 0) 
            left++;

        // Move `right` left as far as possible. Stop if equal to pivot!
        // Also stop if `right` moves all the way left to `left`,
        // see above for why.
        while (left <= right && A[right].compareTo(pivotValue) > 0) 
            right--;

        // Stop here if `left` and `right` passed each other.
        if (left > right)
            break;

        // Otherwise, swap the elements and move `left` and `right` on by 1.
        Util.swap(A, left, right);
        left++; right--;
    }

    Util.swap(A, pivot, right);   // Finally, move the pivot into place
    return right;            // Return the position of the pivot
}
```
{{< /tab >}}

{{< tab "Python" >}}

```py
def partition(A, left, right, pivot):
    swap(A, left, pivot)   # Put pivot at the leftmost index
    pivot = left
    left += 1              # Start partitioning from the element after the pivot

    pivotValue = A[pivot]
    while True:
        # Move `left` right as far as possible. Stop if equal to pivot!
        # Also stop if `left` moves past `right` – this is important, 
        # so that `left` stops if it moves past the end of the array.
        while left <= right and A[left] < pivotValue:
            left += 1

        # Move `right` left as far as possible. Stop if equal to pivot!
        # Also stop if `right` moves all the way left to `left`,
        # see above for why.
        while left <= right and A[right] > pivotValue:
            right -= 1

        # Stop here if `left` and `right` passed each other.
        if left > right:
            break

        # Otherwise, swap the elements and move `left` and `right` on by 1.
        swap(A, left, right)
        left += 1; right -= 1

    swap(A, pivot, right)   # Finally, move the pivot into place
    return right            # Return the position of the pivot
```
{{< /tab >}}
{{< /tabs >}}

The function partition first puts the pivot at the leftmost position in the subarray, and increases left by one (so that the pivot is not included in the partitioning loop).

Then it moves left to the right until it finds a value which is larger than (or equal to) the pivot; and then it moves right to the left until it finds a value which is smaller than (or equal to) the pivot.

It breaks out of the loop if left and right passed each other; otherwise it swaps the left and right elements, moves the indices one step and continues with the loop.

Finally, it puts the pivot at its correct position, by swapping with right.

<div id="quicksortCON" class="ssAV jsavcontainer" data-points="0.0" data-threshold="1.0" data-type="ss"
    data-required="False" data-short-name="quicksortCON" data-long-name="Quicksort Partition Slideshow" data-exer-id=""
    alt="Quicksort Partition Slideshow" tabindex="-1" voice="false">
    <span class="jsavcounter">1 / 24</span>
    <span class="new"><a class="jsavsettings" href="#">Settings</a><button aria-label="Sound"
            class="jsavsound soundOff"></button></span>
    <!-- <div class="jsavcontrols"><span class="jsavbegin" title="Begin">&lt;&lt;</span><span class="jsavbackward"
            title="Backward">&lt;</span><span class="jsavforward" title="Forward">&gt;</span><span class="jsavend"
            title="End">&gt;&gt;</span></div> -->
    <div class="jsavcontrols"></div>
    <p class="jsavoutput jsavline">
    <!-- <div style="color:black;">When we start the partition function, we know that the pivot is in position 4 (the middle
        value).</div>
    </p> -->
    <!-- <div class="jsavcanvas" style="min-height: 90px; min-width: 850px;">
        <ol class="jsavautoresize jsavcenter jsavindexed jsavarray jsavhorizontalarray" data-visible="true"
            data-autoresize="true" data-center="true" data-layout="array" data-indexed="true"
            data-template="<span class=&quot;jsavvalue&quot;><span class=&quot;jsavvaluelabel&quot;>{{value}}</span></span><span class=&quot;jsavindexlabel&quot;>{{index}}</span>"
            style="height: 60px; width: 301px;">
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">80</span></span><span class="jsavindexlabel">0</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">76</span></span><span class="jsavindexlabel">1</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">6</span></span><span class="jsavindexlabel">2</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">57</span></span><span class="jsavindexlabel">3</span></li>
            <li class="jsavnode jsavindex processing" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">60</span></span><span class="jsavindexlabel">4</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">85</span></span><span class="jsavindexlabel">5</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">42</span></span><span class="jsavindexlabel">6</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">83</span></span><span class="jsavindexlabel">7</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">73</span></span><span class="jsavindexlabel">8</span></li>
            <li class="jsavnode jsavindex" style=""><span class="jsavvalue"><span
                        class="jsavvaluelabel">48</span></span><span class="jsavindexlabel">9</span></li>
        </ol>
    </div> -->
</div>

<iframe id="QuicksortPartitPRO_iframe" aria-label="QuicksortPartitPRO" src="../../../Exercises/Sorting/QuicksortPartitPRO.html?localMode=true&amp;module=Quicksort&amp;selfLoggingEnabled=false&amp;JXOP-debug=true&amp;JOP-lang=en&amp;JXOP-code=pseudo&amp;scoringServerEnabled=false&amp;loggingServerEnabled=false&amp;threshold=5&amp;points=1.0&amp;required=True" class="embeddedExercise" width="950" height="540" data-showhide="show" scrolling="no" style="position: relative; top: 0px; width: 100%;">Your browser does not support iframes.</iframe>

And here is a visualization illustrating the running time analysis of the partition function.

<div id="QuickSortPartitionAnalysisCON" class="ssAV jsavcontainer" data-points="0.0" data-threshold="1.0" data-type="ss"
    data-required="False" data-short-name="QuickSortPartitionAnalysisCON"
    data-long-name="Quicksort Partition Analysis Slideshow" data-exer-id="" alt="Quicksort Partition Analysis Slideshow"
    tabindex="-1" voice="false">
    <span class="jsavcounter">1 / 10</span>
    <span class="new"><a class="jsavsettings" href="#">Settings</a><button aria-label="Sound"
            class="jsavsound soundOff"></button></span>
    <div class="jsavcontrols"></div>
    <p class="jsavoutput jsavline">
    <!-- <div style="color:black;">To analyze Quicksort, we first analyze the findpivot and partition functions when
        operating on a subarray of length <span class="MathJax_Preview"
            style="color: inherit; display: none;"></span><span class="MathJax" id="MathJax-Element-10-Frame"
            tabindex="0" style="position: relative;"
            data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>k</mi></math>"
            role="presentation">
            <nobr aria-hidden="true"><span class="math" id="MathJax-Span-38"
                    style="width: 0.559em; display: inline-block;"><span
                        style="display: inline-block; position: relative; width: 0.556em; height: 0px; font-size: 96%;"><span
                            style="position: absolute; clip: rect(1.389em, 1000.54em, 2.511em, -1000em); top: -2.292em; left: 0em;"><span
                                class="mrow" id="MathJax-Span-39"><span class="mi" id="MathJax-Span-40"
                                    style="font-family: MathJax_Math; font-style: italic;">k</span></span><span
                                style="display: inline-block; width: 0px; height: 2.292em;"></span></span></span><span
                        style="display: inline-block; overflow: hidden; vertical-align: -0.077em; border-left: 0px solid; width: 0px; height: 0.81em;"></span></span>
            </nobr><span class="MJX_Assistive_MathML" role="presentation"><math
                    xmlns="http://www.w3.org/1998/Math/MathML"><mi>k</mi></math></span>
        </span>
        <script type="math/tex" id="MathJax-Element-10">k</script>
    </div> -->
    </p>
    <div class="jsavcanvas" style="min-height: 150px; min-width: 850px;">
        <ol class="jsavcode jsavcenter" style="display: none; width: 20px;"></ol>
        <ol class="jsavautoresize jsavcenter jsavindexed jsavarray jsavhorizontalarray" data-visible="true"
            data-autoresize="true" data-center="true" data-layout="array" data-left="150" data-top="20"
            data-indexed="true"
            data-template="<span class=&quot;jsavvalue&quot;><span class=&quot;jsavvaluelabel&quot;>{{value}}</span></span><span class=&quot;jsavindexlabel&quot;>{{index}}</span>"
            style="position: absolute; left: 150px; top: 20px; height: 60px; display: none;">
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">0</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">1</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">2</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">3</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">4</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">5</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">6</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">7</span></li>
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel"> </span></span><span
                    class="jsavindexlabel">8</span></li>
        </ol>
        <ol class="jsavautoresize jsavcenter jsavarray jsavhorizontalarray" data-visible="true" data-autoresize="true"
            data-center="true" data-layout="array" data-left="550" data-top="30" data-indexed="false"
            data-template="<span class=&quot;jsavvalue&quot;><span class=&quot;jsavvaluelabel&quot;>{{value}}</span></span>"
            style="position: absolute; left: 550px; top: 30px; height: 30px; display: none;">
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel">4</span></span></li>
        </ol>
        <div class="jsavlabel" style="position: absolute; left: 590px; top: 32px; display: none;">Pivot</div>
        <ol class="jsavautoresize jsavcenter jsavarray jsavhorizontalarray" data-visible="true" data-autoresize="true"
            data-center="true" data-layout="array" data-left="550" data-top="-10" data-indexed="false"
            data-template="<span class=&quot;jsavvalue&quot;><span class=&quot;jsavvaluelabel&quot;>{{value}}</span></span>"
            style="position: absolute; left: 550px; top: -10px; height: 30px; display: none;">
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel">1</span></span></li>
        </ol>
        <div class="jsavlabel" style="position: absolute; left: 590px; top: -8px; display: none;">Left</div>
        <ol class="jsavautoresize jsavcenter jsavarray jsavhorizontalarray" data-visible="true" data-autoresize="true"
            data-center="true" data-layout="array" data-left="550" data-top="70" data-indexed="false"
            data-template="<span class=&quot;jsavvalue&quot;><span class=&quot;jsavvaluelabel&quot;>{{value}}</span></span>"
            style="position: absolute; left: 550px; top: 70px; height: 30px; display: none;">
            <li class="jsavnode jsavindex"><span class="jsavvalue"><span class="jsavvaluelabel">8</span></span></li>
        </ol>
        <div class="jsavlabel" style="position: absolute; left: 590px; top: 72px; display: none;">Right</div>
    </div>
    <div class="prof_indicators">
        <img id="QuickSortPartitionAnalysisCON_check_mark" class="prof_check_mark" src="_static/Images/green_check.png"
            alt="Proficient">
        <span id="QuickSortPartitionAnalysisCON_cm_saving_msg" class="cm_saving_msg">Saving...</span>
        <span id="QuickSortPartitionAnalysisCON_cm_error_msg" class="cm_error_msg">
            <img id="QuickSortPartitionAnalysisCON_cm_warning_icon" class="cm_warning_icon"
                src="_static/Images/warning.png" alt="Error Saving"><br>
            Server Error<br>
            <a href="#" class="resubmit_link">Resubmit</a>
        </span>
    </div>
    <div class="jsavshutter"></div>
</div>