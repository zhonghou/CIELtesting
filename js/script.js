$(function () {
    $.getJSON("json/colourscheme.json", function (data) {
        $(".colourSchemeIntroHeader").append(data.colourSchemeIntroHeader);
        $(".colourSchemeIntroText").append(data.colourSchemeIntroText);
    });

    $(".draggable").draggable({
        opacity: 0.7, helper: "clone",
        drag: function (event, ui) {
            ui.helper.css("background-color", event.target.id);
        }
    });
    //$("#set div").draggable({ stack: "#set div" });
    $(".droppable").droppable({
        drop: function (event, ui) {
            $(this)
               .css("background-color", ui.draggable.attr("id"))
              //.addClass("ui-state-highlight")
              .find("p")
              .html("Dropped!");
        }
    });
});