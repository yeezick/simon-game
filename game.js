//button colors
var buttonColors = ["red", "blue", "green", "yellow"];


//game pattern
var gamePattern = [];
var userChosenPattern = [];

var started = false;
var level = 0;


//user click
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);



  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userChosenPattern.length - 1);
});

//detects keypress to start game
$(document).keydown(function() {
  if (started) {

    $("#level-title").text(`Level ${level}!`);
    nextSequence();
    started = true;
  }
});


//start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//check answer
function checkAnswer(currentLevel) {
  if (userChosenPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userChosenPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {


    //wrong sound
    playSound("wrong");

    //red background flash
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Wrong! Game over! Press any key to try again!");
    startOver();
  }
}


//simon functions
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];

  gamePattern.push(chosenColor);

  //animate a flash
  $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound
  playSound(chosenColor);

  //increase level & reset human array
  level++;
  $("#level-title").text(`Level ${level}!`);

  userChosenPattern = [];
}


//selected sounds
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

//animate Press
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)

}
