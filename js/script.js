$(function () {
    var dataList;
    $.getJSON("json/colourscheme.json", function (dataList) {
        //for now only load question 1
        $(".colourSchemeCounter").append(dataList.questions[0].question + " / " + dataList.questions.length);
        $(".colourSchemeIntroHeader").append(dataList.questions[0].colourSchemeIntroHeader);
        $(".colourSchemeIntroText").append(dataList.questions[0].colourSchemeIntroText);

        for (var u = 0; u < dataList.questions[0].answers.length; u++) {
            $("#droppableWrap").append("<div id=\"answer" + u + "\" class=\"droppable ui-widget-header ui-droppable\" ></div>");
            //$("#a" + u).addClass('droppable ui-widget-header');


            $("#answer" + u).droppable({
                drop: function (event, ui) {
                    console.log(ui.draggable.css("background-color"));
                    $(this)
                      .css("background-color", ui.draggable.css("background-color"))
                      .find("p")
                      .html("Dropped!");
                }
            });
        }


        for (var i = 0; i < dataList.questions[0].swatches.length; i++) {
            $("#swatchesWrap").append("<div id=\"swatches" + i + "\"></div>");
            $("#swatches" + i).addClass('draggable');
            $("#swatches" + i).addClass('ui-widget-content');
            $("#swatches" + i).addClass('ui-draggable');
            $("#swatches" + i).addClass('ui-draggable-handle');
            $("#swatches" + i).css("background-color", dataList.questions[0].swatches[i]);

            $("#swatches" + i).draggable({
                opacity: 0.7, helper: "clone",
                drag: function (event, ui) {
                    ui.helper.css("background-color", event.css);
                }
            });
        }
    })

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