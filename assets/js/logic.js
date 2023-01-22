// Stage 1: referencing all interactive HTML elements
//main structure from index.html
var timer = document.querySelector("#time");
var startButton = document.querySelector("#start");
var hide = document.querySelector(".hide");
var playerInitials = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");
var submitButton = document.querySelector("#submit");

//questions div
var questionsDiv = document.querySelector("#questions");
var choicesDiv = document.querySelector("#choices");
var currentQuestionIndex = 0;

//highscores.html
var clearButton = document.querySelector("#clear");
var highscores = document.querySelector("highscores");

//misc vars
var initialTime;
var time = allQuestions.length * 20;
/*var current = 0;*/


//Stage 2: functions

function startGame() { //when click on start button countdown begins and question appears
//CONDITIONS: so long as quiz not already in progress (timer not 0 and questions hidden)
    timerCount = 60;
    startButton.disabled = true;

    let startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class", "hide");

    questionsDiv.removeAttribute("class");
    
    startTimer();
    
    getQuestion();
    

    //countdown begins
    //question appears

};

function startTimer() { //sets the timer
    time = setInterval(function() {
        timerCount--;
        timer.textContent = timerCount;

        if (timerCount <= 0){
            clearInterval(time);
            endGame();
        };

    }, 1000);
  
};

function getQuestion(){
    let currentQuestion = allQuestions[currentQuestionIndex];
    let questionTitle = document.querySelector("#question-title");

    questionTitle.textContent = currentQuestion.title;
    choicesDiv.innerHTML = "";

    currentQuestion.choice.forEach(function(choice, i) {
        let choiceButton = document.createElement("button");

        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = ((i+1) + ". " + choice);

        choiceButton.addEventListener("click", questionAnswered);

        choicesDiv.appendChild(choiceButton);
    });
};

function questionAnswered(){
    if (this.value !== allQuestions[currentQuestionIndex].answer){
        timerCount -= 15;
        
        /*if (timerCount <= 0) {
            timer.textContent = "0";
        }

        timer.textContent = timerCount;*/
        feedback.textContent = "Try again!";
    } else {
        feedback.textContent = "That's the correct answer!";
        currentQuestionIndex++;
    };

    feedback.setAttribute("class", "feedback");

    setTimeout(function(){
        feedback.setAttribute("class", "feedback hide");
    }, 1000);


    if (currentQuestionIndex === allQuestions.length) {
        endGame();
    } else {
        getQuestion();
    }
};

function endGame() {
    let endScreen = document.querySelector("#end-screen");
    endScreen.removeAttribute("class");

    let finalScore = document.querySelector("#final-score");
    finalScore.textContent = timerCount;

    questionsDiv.setAttribute("class", "hide");

};

function saveHighScore(){
    let initials = playerInitials.value.trim();

    if(initials !== "") {
        let highscores = JSON.parse(localStorage.getItem("highscores")) || [""];
        let newScore = {
            score: time,
            initials: initials
        };
    

        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    };
};

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighScore();
    }
}


startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", saveHighScore);
