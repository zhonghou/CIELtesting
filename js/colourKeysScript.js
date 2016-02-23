$(function () {
    var dataList;

    //to store question number
    var questionNum;

    $.getJSON("json/colourKeys.json", function (dataList) {
        //random question number
        questionNum = Math.floor((Math.random() * dataList.questions.length) + 0);
        
        $(".Counter").append(dataList.questions[questionNum].question + " / " + dataList.questions.length);
        $(".IntroHeader").append(dataList.questions[questionNum].IntroHeader);
        $("#colourKeysImgWrap").append("<img src =\"" + dataList.questions[questionNum].PicUrl + "\" width='100%'  height ='100%'></img>");
        //width='50%'  height ='50%'
        for (var u = 0; u < dataList.questions[questionNum].answers.length; u++) {
            $("#colorKeysdroppableWrap").append("<div id=\"answer" + u + "\" class=\"droppable ui-widget-header ui-droppable\" ></div>");
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
                //alert("Handler for .click() called.")
            }
        });

        for (var i = 0; i < dataList.questions[questionNum].swatches.length; i++) {
            $("#colorKeysswatchesWrap").append("<div id=\"swatches" + i + "\"></div>");
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
});