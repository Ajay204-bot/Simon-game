var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var score = 0;
var highScore = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);

    $("#score").text("Score: " + score + " | High Score: " + highScore);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  //call to user to click correct oder
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //check if user clicked correct oder or not
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
        score++;
      if (score > highScore) {
        highScore = score;
      }
      // Update score display
      $("#score").text("Score: " + score + " | High Score: " + highScore);

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  var flagSpeed =Math.max(100-level*5 ,10);//It increase the speed of color blink
  $("#" + randomChosenColour).fadeIn(flagSpeed).fadeOut(flagSpeed).fadeIn(flagSpeed);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern =[];
  started = false;

  $("#score").text("Score: " + score + " | High Score: " + highScore);
}


$("#reset-highscore").click(function() {
  highScore = 0;
  score =0;//reset the score
  // Update score display to show reset high score
  $("#score").text("Score: " + score + " | High Score: " + highScore);
});