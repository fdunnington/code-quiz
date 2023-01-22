// Stage 1: referencing all interactive elements
//main structure from index.html
var timer = document.querySelector("#time");
var startButton = document.querySelector("#start");
var endScreen = document.querySelector("#end-screen");
var hide = document.querySelector(".hide");
var finalScore = document.querySelector("#final-score");
var playerInitials = document.querySelector("#initials");

//questions
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesDiv = document.querySelector("#choices");
var currentQuestionIndex = 0;

//highscores.html
var clearButton = document.querySelector("#clear");
var highscores = document.querySelector("#highscores");

//misc vars
var initialTime;
var time = allQuestions.length * 20;
var current = 0;


//Stage 2: functions


function startGame() { //when click on start button countdown begins and question appears
//CONDITIONS: so long as quiz not already in progress (timer not 0 and questions hidden)
    timerCount = 60;
    startButton.disabled = true;
    
    startTimer();
    showQuestion();
    //countdown begins
    //question appears

};

function startTimer() { //sets the timer
    time = setInterval(function() {
        timerCount--;
        timer.textContent = timerCount;

        if (timerCount === 0){
            clearInterval(time);
            //endGame function
        };

    }, 1000);
  
};

function getQuestion(){

};

function questionAnswered(){

};

function saveHighScore(){

};

startButton.addEventListener("click", startGame);




startGame();