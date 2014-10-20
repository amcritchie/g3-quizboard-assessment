//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function () {

    loadQuestion();

});

function loadQuestion() {
    $.getJSON("1/questions", function (data) {
        var items = [];

        items.push("<h2>" + data[0].description + "</h2>");

        $.each(data[0]["possible_answers"], function (key, val) {
            items.push("<button class='btn btn-default' data-correct=" + val.correct + ">" + val.description + "</button>");
        });
        items.push("<button id='next' class='btn btn-primary' data-correct=" + false + ">" + "Next" + "</button>");
        items.push("<h4 id='score' >" + 0 + "/ 4" + "</button>");


        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo(".container");

        registerClick()

    });
}

function registerClick() {

    console.log("green");

    $("button").on('click', function(){
        console.log($(this).data('correct'));
        if ($(this).data("correct") == true){
            $(this).attr("class", "btn btn-success");
//            $(this).toggleClass("btn btn-success");
        } else {
            console.log($("button"));
            fillButtons();
            $(this).attr("class", "btn btn-danger")
        }

    })
}

function fillButtons() {
    console.log("ello gov");
    $.each ($("button"), function(key,val){
        if ($(this).data("correct") == true){
            $(this).attr("class", "btn btn-success");
        } else {
            $(this).attr("class", "btn btn-danger")
        }
        $("#next").attr("class", "btn btn-primary");
        console.log(val)
    });
}


var getPieceAttributes = function () {
    var pieceJson = $.getJSON('/piece_attributes');
    pieceJson.success(function (jsonResponse) {
        pieceAtt = jsonResponse;
        console.log(jsonResponse)
    });
};