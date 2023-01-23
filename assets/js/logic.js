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
var time = 0;
var timeLeft = allQuestions.length * 15;



//Stage 2: functions
function startGame() { //when click on start button countdown begins and question appears, replacing start screen

    let startScreen = document.getElementById("start-screen");
    
    startScreen.setAttribute("class", "hide"); //adds class 'hide' to #start-screen element so start screen hidden
    questionsDiv.removeAttribute("class"); //removes class (which is 'hide') so questions visible
    
    startTimer(); //calls timer function
    getQuestion(); //calls question function
};

function startTimer() { //sets the timer
    time = setInterval(function() {
        timeLeft--; //countdown by one at interval set
        timer.textContent = timeLeft; //#time HTML element shows timeLeft value
        
        if (timeLeft <= 0){ //if time <= 0 then game ends - out of time
            endGame();
            alert("You ran out of time!");
        };
    }, 1000);
};

function getQuestion(){ // pulls a question & goes through questions array until all questions asked || time runs out
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

function questionAnswered(){ // checks whether answer correct. If yes, new question, if no then time penalty and 'try again' message
    if (this.value !== allQuestions[currentQuestionIndex].answer){
        feedback.textContent = "Try again!";

        if (timeLeft <= 0) {
            timer.textContent = "0";
            endGame();
        } else {
            timeLeft -= 15;
            timer.textContent = timeLeft;
        }

    } else {
        feedback.textContent = "Correct!";
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

function endGame() { //game ends. Clears timer and takes user to end screen with high scores
    clearInterval(time);

    let endScreen = document.querySelector("#end-screen");
    endScreen.removeAttribute("class");

    let finalScore = document.querySelector("#final-score");
    finalScore.textContent = timeLeft;

    questionsDiv.setAttribute("class", "hide");

};

function saveHighScore(){
    let initials = playerInitials.value.trim();

    if(initials !== "") {
        let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore = {
            score: timeLeft,
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
