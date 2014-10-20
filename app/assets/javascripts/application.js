//= require jquery
//= require jquery_ujs
//= require_tree .

var score = 0;
var questionNum = 0;

$(document).ready(function () {

    loadQuestion(questionNum);

});

function loadQuestion(question) {
    $.getJSON("1/questions", function (data) {
        var items = [];

        items.push("<h2>" + data[question].description + "</h2>");

        $.each(data[question]["possible_answers"], function (key, val) {
            items.push("<button class='btn btn-default' data-correct=" + val.correct + ">" + val.description + "</button>");
        });
        items.push("<button id='next' class='btn btn-primary' data-correct=" + false + ">" + "Next" + "</button>");
        items.push("<h4 id='score' >" + score + "/ 4" + "</button>");


        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo(".container");

        registerClick()

    });
}

function registerClick() {


    $("button").on('click', function(){

        if ($(this).data("correct") == true){
            score = score + 1;
        } else {
            score = score + 0;
        }

        $("button").off('click');
        fillButtons();
    })
}

function fillButtons() {

    $.each ($("button"), function(key,val){

        if ($(this).data("correct") == true){
            $(this).attr("class", "btn btn-success");
        } else {
            $(this).attr("class", "btn btn-danger")
        }

        $(this).disable = true
    });

    $("#next").disable = false;
    $("#next").attr("class", "btn btn-primary");
    questionNum = questionNum + 1;
    loadQuestion(questionNum)
}


var getPieceAttributes = function () {
    var pieceJson = $.getJSON('/piece_attributes');
    pieceJson.success(function (jsonResponse) {
        pieceAtt = jsonResponse;
        console.log(jsonResponse)
    });
};