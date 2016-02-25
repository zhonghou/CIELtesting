$(function () {
    var dataList;

    //to store question number
    var questionNum;

    // get the JSON file which is the same name as the HTML file
    var path = window.location.pathname;
    var filename = path.split("/").pop().split(".");

    var jsonFile = "data/" + filename[0] + ".json";

    $.getJSON(jsonFile, function (dataList) {
        //random question number
        questionNum = Math.floor((Math.random() * dataList.questions.length) + 0);

        $(".Counter").append(dataList.questions[questionNum].question + " / " + dataList.questions.length);
        $(".IntroHeader").append(dataList.questions[questionNum].IntroHeader);
        $(".IntroText").append(dataList.questions[questionNum].IntroText);
        $("#colourPickingImgWrap").append("<img src =\"" + dataList.questions[questionNum].PicUrl + "\" width='100%'  height ='100%'></img>");
        $(".BottomTextHeader").append(dataList.questions[questionNum].bottomTextHeader + ":");
        $(".BottonText").append(dataList.questions[questionNum].bottomText);
        //width='50%'  height ='50%'
        for (var u = 0; u < dataList.questions[questionNum].answers.length; u++) {
            $("#colourPickingdroppableWrap").append("<div id=\"answer" + u + "\" class=\"droppable ui-widget-header ui-droppable\" ></div>");
            $("#answer" + u).css("background-color", "#FFFFFF");
            //$("#answer" + u).addClass('droppable ui-widget-header');

            $("#answer" + u).droppable({
                drop: function (event, ui) {
                    var same = "false";
                    var answerGiven = "true";
                    for (var y = 0; y < dataList.questions[questionNum].answers.length; y++) {
                        var tempColor = $("#answer" + y).css("background-color");
                        if ($("#answer" + y).css("background-color") == ui.draggable.css("background-color")) {
                            same = "true";
                        };
                    };
                    //console.log(ui.draggable.css("background-color"));
                    if (same == "false") {
                        $(this)
                        .css("background-color", ui.draggable.css("background-color"));
                        //.find("p")
                        //.html("Dropped!");
                    };

                    for (var r = 0; r < dataList.questions[questionNum].answers.length; r++) {
                        if ($("#answer" + r).css("background-color") == 'rgb(255, 255, 255)') {
                            answerGiven = "false";
                        };
                    };
                    if (answerGiven == "true") {
                        $("#button").removeClass('disabled');
                    };
                }
            });
        }

        $("#button").click(function () {
            if ($("#button").hasClass('disabled')) {
            }
            else {
                var correct = 0;
                for (var r = 0; r < dataList.questions[questionNum].answers.length; r++) {
                    for (var e = 0; e < dataList.questions[questionNum].answers.length; e++) {
                        var dummy = $('<div/>');
                        $(dummy).css("background-color", dataList.questions[questionNum].answers[e]);
                        var tempbgcolor = $(dummy).css("background-color");

                        if ($("#answer" + r).css("background-color") == tempbgcolor) {
                            correct += 1;
                        };
                    };
                };

                if (correct == dataList.questions[questionNum].answers.length) {
                    $("#colourPickingswatchesWrap").remove();
                    $("img").remove();
                    //$("#colorKeysdroppableWrap").removeClass('colorKeysdroppableWrapDefault');
                    //$("#colorKeysdroppableWrap").addClass('colourKeysAnswerChangePosition');

                    $("#colourPickingdroppableWrap").append("<div id=\"colourPickingAnswerWrap\" class=\"colourPickingRightAnswerPosition\"></div>");
                    $("#colourPickingAnswerWrap").append("<div class=\"AnswerHeader\">Answer</div>");
                    for (var t = 0; t < dataList.questions[questionNum].answers.length; t++) {
                        $("#colourPickingAnswerWrap").append("<div id=\"answerbox" + t + "\" class=\"answerBox\"></div>");
                        $("#answerbox" + t).css("background-color", dataList.questions[questionNum].answers[t]);
                    };
                }
                else {
                    alert("Try Again.")
                }
            }
        });

        for (var i = 0; i < dataList.swatches.length; i++) {
            $("#colourPickingswatchesWrap").append("<div id=\"swatches" + i + "\"></div>");
            $("#swatches" + i).addClass('draggable');
            $("#swatches" + i).addClass('ui-widget-content');
            $("#swatches" + i).addClass('ui-draggable');
            $("#swatches" + i).addClass('ui-draggable-handle');
            $("#swatches" + i).css("background-color", dataList.swatches[i]);

            $("#swatches" + i).draggable({
                opacity: 0.7, helper: "clone",
                drag: function (event, ui) {
                    ui.helper.css("background-color", event.css);
                }
            });
        }
        $(".draggable:nth-child(4n+1)").css("margin-left", "5px");
        $(".droppable:nth-child(4n+1)").css("margin-left", "5px");
    })
});