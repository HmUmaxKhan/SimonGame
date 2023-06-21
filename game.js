var gameStart = false;
let staticVari = 0;
var choosenColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function() {
    if (!gameStart) {
        gameStart = true;
        nextSequence();
    }
});

 
$(".btn").click(function () {

    

        var userChoosenColor = $(this).attr("id");
        playAudio(userChoosenColor);
        userClickedPattern.push(userChoosenColor);
        animate(userChoosenColor);
        if (gameStart) {
            checkAnswer(userClickedPattern.length-1);
        }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");

        $("h1").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function () {
        $("body").removeClass("game-over");
        },200);
        
        starOver();
      }


}

function nextSequence() {

    userClickedPattern = [];
    var randomNumber = Math.random();
    randomNumber = (randomNumber * 4);
    randomNumber = Math.floor(randomNumber);

    var randomChosenColor = choosenColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    
    $("h1").html("Level "+staticVari.toString());
    staticVari++;
}


// $(document).keypress
//   (function (randomChosenColor) {
//     playAudio(randomChosenColor);
//   }

function playAudio(randomSound) {

    var audio1 = new Audio("./sounds/"+randomSound+".mp3");
    audio1.play();
}

function animate(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function () {
      $("#"+currentColor).removeClass("pressed");
    },100);
}

function starOver() {
    gamePattern = [];
    gameStart = false;
    staticVari = 0;
    var sound = "wrong"; 
    playAudio(sound);
}

