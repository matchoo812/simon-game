
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var levelDisplay = $("#level-title").text();
var blueSound = new Audio("sounds/blue.mp3");
var redSound = new Audio("sounds/red.mp3");
var greenSound = new Audio("sounds/green.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");

function nextSequence() {
  started = true;
  userClickedPattern = [];
  level++;
  levelDisplay = "Level " + level;
  $("#level-title").text(levelDisplay);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  var colorId = "#" + randomChosenColor;
  flashButton(colorId);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

$(document).on("keydown", function(){
  if(started === false){
    reset();
    nextSequence();
  }
});

$(".btn").on("click", function() {
  if(started === true){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress($(this));
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    }
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
      nextSequence();
      }, 1000);
     }
    } else {
      playSound("wrong");
      $("#level-title").html("Game Over :( <br>Press Any Key to Start Again");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      }, 250);
      started = false;
    }
}

function reset() {
  started = true;
  level = 0;
  gamePattern = [];
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function() {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function flashButton(name) {
  $(name).fadeOut(250).fadeIn(250);
}

function playSound(name) {
  switch(name) {
    case "red":
      redSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "wrong":
      wrongSound.play();
      break;
    default:
  }
}
