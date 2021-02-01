var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// press any key to start the game
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  // show current level
  $("#level-title").text("Level " + level);
  console.log("Level " + level);

  // randomly pick a color
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];

  // add to the game pattern
  gamePattern.push(randomChosenColor);

  // sound effect + animation
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  // level up
  level++;
  userClickedPattern = [];
}

$(".btn").on("click", function () {
  // add user chosen color to clicked pattern
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  // sound effect + animation
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // check answer
  checkAnswer();
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3")
  audio.play()
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  var indexOfTheLastAnswer = userClickedPattern.length - 1
  if (userClickedPattern[indexOfTheLastAnswer] == gamePattern[indexOfTheLastAnswer]) {
    console.log("success")

    // whether the sequence if finished
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");

    // game over text
    $("#level-title").text("Game Over. Press Any Key to Restart.");

    // sound effect
    playSound("wrong");

    // background flash
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)

    // restart
    startOver();
  }
}

function startOver() {
  // reset the values
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}