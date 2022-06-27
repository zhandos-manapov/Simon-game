var buttons = $(".btn");

var gamePattern = []
var userClickedPattern = []

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var userPatternLen = 0;

nextSequence = () => {
    randomNumber = Math.round(Math.random() * 3);
    randomChooseColor = buttonColours[randomNumber];
    gamePattern.push(randomChooseColor);
    playSound(randomChooseColor);
    buttonAnimate(randomChooseColor);
    level++;
    $("h1").html("Level " + level);
    userClickedPattern = []
}

buttons.on("click", function () {
    userChoosenColor = this.id;
    playSound(userChoosenColor);
    buttonAnimate(userChoosenColor);
    userClickedPattern.push(userChoosenColor);
    checkAnswer(userPatternLen);
    userPatternLen++;
})

checkAnswer = (key) => {
    if (gamePattern[key] === userClickedPattern[key]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                userPatternLen = 0;
                nextSequence();
            }, 1000);
        }
    } else {
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart");
        startOver();
    }
}


buttonAnimate = (key) => {
    var targetButton = $('#' + key);
    targetButton.addClass('pressed');
    setTimeout(() => {
        targetButton.removeClass('pressed');
    }, 80);
}

playSound = (key) => {
    var sound = new Audio("sounds/" + key + ".mp3");
    sound.play();
}

var isGameStarted = false;

$(document).on("keydown", () => {
    if (!isGameStarted) {
        mainGameLoop();
    }
    isGameStarted = true;
})

startOver = () => {
    gamePattern = []
    userClickedPattern = []
    isGameStarted = false;
    level = 0;
    userPatternLen = 0;
}

mainGameLoop = () => {
    setTimeout(() => {
        nextSequence();
    }, 1000);
    $("h1").html("Level " + level);
}