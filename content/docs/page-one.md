+++
title = 'test stuf'
draft = true
+++


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

# test stuf

Does LaTeX work? {{< katex >}}\pi(x){{< /katex >}}

TODO: text in markdown with latex support for maths
javascript support 

### here's chudnovsky's algorithm
{{< katex display >}}
\frac{1}{\pi}=12\sum^\infty_{k=0}\frac{(-1)^k(6k)!(545140134k+13591409)}{(3k)!(k!)^3(640320)^{3k+3/2}}
{{< /katex >}}
it calculates pi quickly, wow

<b>this might be bold</b>\
<i>this should be italic, seeing as the previous one worked</i>
<h1>hello</h1>
## newlines seem to be required to switch back to markdown

## like this

### what about code blocks?
```py
print("what about code blocks?")

omg = {
    "holy crap": "it works for free"
}
```

preliminary iframe thingy, TODO fix afterwards

<div id="quicksortCON" class="ssAV jsavcontainer" data-points="0.0" data-threshold="1.0" data-type="ss"
    data-required="False" data-short-name="quicksortCON" data-long-name="Quicksort Partition Slideshow" data-exer-id=""
    alt="Quicksort Partition Slideshow" tabindex="-1" voice="false">
    <span class="jsavcounter">1 / 24</span>
    <span class="new"><a class="jsavsettings" href="#">Settings</a><button aria-label="Sound"
            class="jsavsound soundOff"></button></span>
    <div class="jsavcontrols"><span class="jsavbegin" title="Begin">&lt;&lt;</span><span class="jsavbackward"
            title="Backward">&lt;</span><span class="jsavforward" title="Forward">&gt;</span><span class="jsavend"
            title="End">&gt;&gt;</span></div>
    <p class="jsavoutput jsavline">
    <div style="color:black;">When we start the partition function, we know that the pivot is in position 4 (the middle
        value).</div>
    </p>
    <div class="jsavcanvas" style="min-height: 90px; min-width: 850px;">
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
    </div>
    <div class="prof_indicators">
        <img id="quicksortCON_check_mark" class="prof_check_mark" src="_static/Images/green_check.png" alt="Proficient">
        <span id="quicksortCON_cm_saving_msg" class="cm_saving_msg">Saving...</span>
        <span id="quicksortCON_cm_error_msg" class="cm_error_msg">
            <img id="quicksortCON_cm_warning_icon" class="cm_warning_icon" src="_static/Images/warning.png"
                alt="Error Saving"><br>
            Server Error<br>
            <a href="#" class="resubmit_link">Resubmit</a>
        </span>
    </div>
    <div class="jsavshutter"></div>
</div>