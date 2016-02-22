$(function () {
    var dataList;

    //to store question number
    var questionNum;

    $.getJSON("json/colourscheme.json", function (dataList) {
        //random question number
        questionNum = Math.floor((Math.random() * dataList.questions.length) + 0);
        
        $(".colourSchemeCounter").append(dataList.questions[questionNum].question + " / " + dataList.questions.length);
        $(".colourSchemeIntroHeader").append(dataList.questions[questionNum].colourSchemeIntroHeader);
        $(".colourSchemeIntroText").append(dataList.questions[questionNum].colourSchemeIntroText);

        for (var u = 0; u < dataList.questions[questionNum].answers.length; u++) {
            $("#droppableWrap").append("<div id=\"answer" + u + "\" class=\"droppable ui-widget-header ui-droppable\" ></div>");
            //$("#a" + u).addClass('droppable ui-widget-header');

            $("#answer" + u).droppable({
                drop: function (event, ui) {
                    console.log(ui.draggable.css("background-color"));
                    $(this)
                      .css("background-color", ui.draggable.css("background-color"));
                      //.find("p")
                      //.html("Dropped!");
                }
            });
        }

        for (var i = 0; i < dataList.questions[questionNum].swatches.length; i++) {
            $("#swatchesWrap").append("<div id=\"swatches" + i + "\"></div>");
            $("#swatches" + i).addClass('draggable');
            $("#swatches" + i).addClass('ui-widget-content');
            $("#swatches" + i).addClass('ui-draggable');
            $("#swatches" + i).addClass('ui-draggable-handle');
            $("#swatches" + i).css("background-color", dataList.questions[questionNum].swatches[i]);

            $("#swatches" + i).draggable({
                opacity: 0.7, helper: "clone",
                drag: function (event, ui) {
                    ui.helper.css("background-color", event.css);
                }
            });
        }
    })

    //$("input[type=submit]")
    //  .button()
    //  .click(function (event) {
          
    //  });

    //$(".draggable").draggable({
    //    opacity: 0.7, helper: "clone",
    //    drag: function (event, ui) {
    //        ui.helper.css("background-color", event.target.id);
    //    }
    //});
    ////$("#set div").draggable({ stack: "#set div" });
    //$(".droppable").droppable({
    //    drop: function (event, ui) {
    //        console.log(ui.draggable.attr("id"));
    //        $(this)
    //          .css("background-color", ui.draggable.attr("id"))
    //          //.addClass("ui-state-highlight")
    //          .find("p")
    //          .html("Dropped!");
    //    }
    //});
});