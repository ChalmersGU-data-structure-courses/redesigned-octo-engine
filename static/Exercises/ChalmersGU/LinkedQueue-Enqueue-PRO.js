/*global JSAV, window */
(function() {
  "use strict";
  var av,                   // The JSAV object
      leftMargin,           //
      topMargin,            //
      answerArr = [],       // The (internal) array that stores the correct answer
      answerOrderArr = [],  // The (internal) array that stores the correct order of nodes
      jsavArr,              // Hidden JSAV array used for animation
      answFrontNode,        //
      answRearNode,         //
      orderArr = [],        // Stores the node.id() of the jsavList
      listArr = [],         // Stores the jsav list values
      front,                // pointer front
      rear,                 // pointer rear
      selected_pointer,     // pointer that is clicked, which will always be front here.
      status = 0,           // Nothing is currently selected, status = 0;
                            // pointer area is selected, status = 2;
                            // pointer top is selected, status = 3.
      newNodeGen,           //
      newLinkNode,          // New node
      connections = [],     //
      fromNode,             //
      toNode,               //
      jsavList,             // JSAV list
      listSize,             // JSAV list size
      insertValue;          // Value to be inserted

  var LinkedQueueEnqueuePRO = {
    userInput: null,            // Boolean: Tells us if user ever did anything

    // pointer click handler
    pclick: function(pointer) {
      selected_pointer = pointer;
      selected_pointer.element.toggleClass("highlight");
      status = 3;
      LinkedQueueEnqueuePRO.userInput = true;
    },

    // Helper function for seting pointer
    setPointer: function(pname, node) {
      var pointerRight = {anchor: "right top",
                          myAnchor: "left bottom", fixed: "true",
                          left: -10, top: -20};
      var pointerLeft = {anchor: "left top",
                         myAnchor: "right bottom", fixed: "true",
                         left: 5, top: -20};
      if (pname === "rear") {
	//      if (node.pNum === 1) {
        node.pNum++;
        return node.jsav.pointer(pname, node, pointerRight);
      }
      node.pNum++;
      return node.jsav.pointer(pname, node, pointerLeft);
    },

    // Add an edge from obj1 to obj2
    connection: function(obj1, obj2) {
      if (obj1 === obj2) { return; }
      var leftOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().left;
      var topOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().top;
      var fx = obj1.element.offset().left + 39 - leftOffset;
      var tx = obj2.element.offset().left  + 2 - leftOffset;
      var fy = obj1.element.offset().top + 16 - topOffset;
      var ty = obj2.element.offset().top + 16 - topOffset;
      var fx1 = fx, fy1 = fy, tx1 = tx, ty1 = ty;

      var disx = (fx - tx - 22) > 0 ? 1 : (fx - tx - 22) === 0 ? 0 : -1;
      var disy = (fy - ty) > 0 ? 1 : (fy - ty) === 0 ? 0 : -1;

      var dx = Math.max(Math.abs(fx - tx) / 2, 35);
      var dy = Math.max(Math.abs(fy - ty) / 2, 35);

      if ((fy - ty > -25) && (fy - ty < 25) && ((tx - fx < 36) || (tx - fx > 38))) {
        dx = Math.min(Math.abs(fx - tx), 20);
        dy = Math.min(Math.abs(fx - tx) / 3, 50);
        tx += 22;
        ty -= 15;
        fx1 = fx;
        fy1 = fy - dy;
        tx1 = tx - dx;
        ty1 = ty - dy;
      } else if (disx === 1) {
        tx += 22;
        ty += 15 * disy;
        fx1 = fx + dx;
        fy1 = fy - dy * disy;
        tx1 = tx;
        ty1 = ty + dy * disy;
      } else if (disx === -1) {
        fx1 = fx + dx;
        fy1 = fy;
        tx1 = tx - dx;
        ty1 = ty;
      }

      var edge = av.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
                             {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
      if (obj1.odsa_next) {
        obj1.odsa_edgeToNext.element.remove();
      } else {
        obj1.odsa_tail.element.remove();
        obj1.odsa_tail = null;
      }
      obj1.odsa_edgeToNext = edge;
    },

    // Function for connecting to nodes when click them
    connect: function(obj1, obj2) {
      var i;
      if (obj1 === obj2) { return; }
      LinkedQueueEnqueuePRO.connection(obj1, obj2);
      obj1.odsa_next = obj2;
      obj1._next = obj2;
      for (i = 0; i < connections.length; i++) {
        if ((connections[i].from === obj1) && (connections[i].to !== obj2)) {
          connections[i].to = obj2;
          return;
        }
      }
      connections.push({from: obj1, to: obj2});
    },

    // Click event handler on the list
    clickHandler: function(e) {
      var setright = {anchor: "right top", myAnchor: "left bottom", left: -10, top: -20};
      var setleft = {anchor: "left top", myAnchor: "right bottom", left: 15, top: -20};
      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if ((x > 31) && (x < 42) && (y > 0) && (y < 31)) {
        if (status === 0) {
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
          status = 2;
        } else if (status === 2) {
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          if (this.id() === fromNode.id()) {
            $("#" + this.id() + " .jsavpointerarea:first").removeClass("bgColor");
            fromNode = null;
            status = 0;
          } else {
            $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
            fromNode = this;
            status = 2;
          }
        }
      } else {
        if (status === 2) {
          toNode = this;
          LinkedQueueEnqueuePRO.connect(fromNode, toNode);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + toNode.id()).removeClass("bgColor");
          fromNode = null;
          toNode = null;
          status = 0;
        } else if (status === 3) {
          if (selected_pointer.target() !== this) {
            selected_pointer.target().pNum--;
            if (this.pNum === 1) {
              selected_pointer.target(this, setright);
              this.pNum++;
            } else if (this.pNum === 0) {
              selected_pointer.target(this, setleft);
              this.pNum++;
            }
          }
          av.container.trigger("jsav-updaterelative");
          selected_pointer.element.removeClass("highlight");
          selected_pointer = null;
          status = 0;
        }
        LinkedQueueEnqueuePRO.userInput = true;
      }
    },

    addTail: function(node) {
      var leftOffset = node.element.offset().left - av.container.find(".jsavcanvas:first").offset().left;
      var topOffset = node.element.offset().top - av.container.find(".jsavcanvas:first").offset().top;
      var fx = leftOffset + 34;
      var tx = leftOffset + 44;
      var fy = topOffset + 32;
      var ty = topOffset + 1;

      if (typeof node.odsa_tail !== "undefined") {
        node.odsa_tail.element.remove();
        node.odsa_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      } else {
        node.odsa_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      }
      node.odsa_next = null;
    },

    newnode: function() {
      var i;
      if (newNodeGen === false) {
        if (status === 2) {
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          fromNode = null;
        } else if (status === 3) {
          selected_pointer.element.removeClass("highlight");
          selected_pointer = null;
        }
        status = 0;
        newLinkNode = jsavList.newNode("null");
        newLinkNode.pNum = 0;
        // Calculate the position for the new node
        var leftOffset = (listSize - 1) * 73 / 2;
        var topOffset = 60;
        // Set the position for the new node
        newLinkNode.css({top: topOffset, left: leftOffset});

        newLinkNode.odsa_next = null;
        newLinkNode.odsa_edgeToNext = null;
        answerOrderArr = orderArr.slice(0);
        answerOrderArr.splice(listSize, 0, newLinkNode.id());

        var x1 = leftOffset + 34 + leftMargin;
        var y1 = topOffset + 46 + topMargin;
        var x2 = leftOffset + 44 + leftMargin;
        var y2 = topOffset + 16 + topMargin;

        newLinkNode.odsa_tail = av.g.line(x1, y1, x2, y2,
                                            {opacity: 100, "stroke-width": 1});

        $("#" + newLinkNode.id()).css("cursor", "pointer");
        $("#" + newLinkNode.id()).draggable({
          start: function() {
            $("#" + newLinkNode.id()).css("cursor", "pointer");
          },
          drag: function() {
            for (i = connections.length; i--; ) {
              LinkedQueueEnqueuePRO.connection(connections[i].from, connections[i].to);
            }
            if (newLinkNode.odsa_tail) {
              LinkedQueueEnqueuePRO.addTail(newLinkNode);
            }
          },
          stop: function() {
            for (i = connections.length; i--; ) {
              LinkedQueueEnqueuePRO.connection(connections[i].from, connections[i].to);
            }
            if (newLinkNode.odsa_tail) {
              LinkedQueueEnqueuePRO.addTail(newLinkNode);
            }
            av.container.trigger("jsav-updaterelative");
          }
        });
        answRearNode = newLinkNode;
        $("#NewNode").disabled = true;
        newNodeGen = true;
      } else { return; }
      LinkedQueueEnqueuePRO.userInput = true;
    },

    insert: function() {
      if (newLinkNode) {
        av.effects.copyValue(jsavArr, 0, newLinkNode);
        newLinkNode.unhighlight();
        status = 0;
      }
    },

    // Initialise the exercise
    initJSAV: function(size, value) {
      var i;
      // assign values to global variables
      answerArr.length = 0;
      listSize = size;
      insertValue = value;

      // Give random numbers in range 0..999
      for (i = 0; i < size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      listArr = answerArr.slice(0);

      reset();

      // correct answer
      answerArr.splice(listSize, 0, insertValue);

      // Set up click handlers
      $("#NewNode").click(function() { LinkedQueueEnqueuePRO.newnode(); });
      $("#insert").click(function() { LinkedQueueEnqueuePRO.insert(); });
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check user's answer for correctness
    checkAnswer: function(arr_size) {
      var i = 0,
          curr = jsavList.get(0);

      if (front.target() !== answFrontNode) { return false; }
      if (rear.target() !== answRearNode) { return false; }

      while (curr) {
        if ((curr.value() === answerArr[i]) && (curr.id() === answerOrderArr[i])) {
          curr = curr.odsa_next;
          i++;
        } else {
          return false;
        }
      }

      if (i !== (listSize + 1)) { return false; }
      return true;
    }
  };

  // reset function definition
  function reset() {
    var i;
    leftMargin = 40;
    topMargin = 60;
    LinkedQueueEnqueuePRO.userInput = false;
    newNodeGen = false;
    connections = [];
    status = 0;

    // Clear the old JSAV canvas.
    if ($("#LinkedQueue-Enqueue-PRO")) { $("#LinkedQueue-Enqueue-PRO").empty(); }

    // Set up the display
    av = new JSAV("LinkedQueue-Enqueue-PRO");
    jsavList = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
    for (i = listSize - 1; i >= 0; i--) {
      jsavList.addFirst(listArr[i]);
    }
    jsavList.layout();
    front = LinkedQueueEnqueuePRO.setPointer("front", jsavList.get(0));
    rear = LinkedQueueEnqueuePRO.setPointer("rear", jsavList.get(listSize - 1));
    // Hidden JSAV array for insert animation
    jsavArr = av.ds.array([insertValue], {indexed: false, center: false, left: 550, top: -70});
    av.displayInit();
    av.recorded();

    for (i = 0; i < listSize; i++) {
      orderArr[i] = jsavList.get(i).id();
      jsavList.get(i).odsa_next = jsavList.get(i).next();
      jsavList.get(i).odsa_edgeToNext = jsavList.get(i).edgeToNext();
    }
    jsavList.get(listSize - 1).odsa_tail =
      av.g.line(leftMargin + 34 + (listSize - 1) * 74, 47 + topMargin,
                leftMargin + 44 + (listSize - 1) * 74, 16 + topMargin,
                {opacity: 100, "stroke-width": 1});
    answFrontNode = jsavList.get(0);

    // Bind click handlers
    front.click(LinkedQueueEnqueuePRO.pclick);
    rear.click(LinkedQueueEnqueuePRO.pclick);
    jsavList.click(LinkedQueueEnqueuePRO.clickHandler);

    LinkedQueueEnqueuePRO.userInput = false;
  }

  window.LinkedQueueEnqueuePRO = window.LinkedQueueEnqueuePRO || LinkedQueueEnqueuePRO;
}());
