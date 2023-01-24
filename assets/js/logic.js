//>>>>>>>>>>>>>>>>>>>>>>>> Stage 1: referencing HTML elements >>>>>>>>>>>>>>>>>>>>>>>>>
//vars for index.html
var timer = document.querySelector("#time");
var startButton = document.querySelector("#start");
var hide = document.querySelector(".hide");
var playerInitials = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");
var submitButton = document.querySelector("#submit");

//vars for highscores.html
var clearButton = document.querySelector("#clear");
var highscores = document.querySelector("highscores");

//vars for questions div
var questionsDiv = document.querySelector("#questions");
var choicesDiv = document.querySelector("#choices");
var currentQuestionIndex = 0;

//timer vars
var time;
var timeLeft = allQuestions.length * 15;


//>>>>>>>>>>>>>>>>>>>>>>>> Stage 2: functions >>>>>>>>>>>>>>>>>>>>>>>>>

//-------------------------------------------------------
// START GAME
//-------------------------------------------------------
function startGame() { //when click on start button countdown begins and question appears, replacing start screen

    let startScreen = document.getElementById("start-screen");
    
    startScreen.setAttribute("class", "hide"); //adds class 'hide' to #start-screen element so start screen hidden
    questionsDiv.removeAttribute("class"); //removes class (which is 'hide') so questions visible
    
    time = setInterval(startTimer, 1000); //calls timer function
    getQuestion(); //calls question function
};

//-------------------------------------------------------
// TIMER
//-------------------------------------------------------
function startTimer() { //quiz timer function
    timeLeft--; //countdown by one at interval set

    if (timeLeft <= 0){
        timeLeft = 0;
        clearInterval(time); //stops timer
        alert("Sorry - you ran out of time!");
        endGame();
    };

    timer.textContent = timeLeft; //#time HTML element shows timeLeft value
};

//-------------------------------------------------------
// QUESTIONS & ANSWERS
//-------------------------------------------------------
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
    feedback.setAttribute("class", "feedback"); //feedback for whether question answered correctly or not
    
    if (this.value !== allQuestions[currentQuestionIndex].answer){
        timeLeft -= 10; //time penalty for incorrect answer
        feedback.textContent = "Try again!";
        if (timeLeft <= 0){
            timeLeft = 0;
        };
    } else {
        feedback.textContent = "Correct!";
        currentQuestionIndex++;
    };

    setTimeout(function(){ //feedback disappears after 1000ms
        feedback.setAttribute("class", "feedback hide");
    }, 1000);

    if (currentQuestionIndex === allQuestions.length) { //game ends and timer tops when all questions in array gone through. Otherwise next quesstion in array displayed.
        clearInterval(time); 
        endGame();
    } else {
        getQuestion();
    }

    timer.textContent = timeLeft; // displays timerLeft in html element based on above parameters
};

//-------------------------------------------------------
// ENDS GAME
//-------------------------------------------------------
function endGame() { //game ends. Clears timer and takes user to end screen with high scores
    
    let endScreen = document.querySelector("#end-screen"); 
    endScreen.removeAttribute("class", "hide"); //removes 'class: hide' so end screen visible)

    let finalScore = document.querySelector("#final-score");
    finalScore.textContent = timeLeft; //equates final score to time remaining

    questionsDiv.setAttribute("class", "hide"); //enables 'class: hide' to be applied to questions div so not visible
};

function saveHighScore(){
    let initials = playerInitials.value.trim(); //sets input value excluding spaces as initials in newScore object

    if(initials !== "") {
        let highscores = JSON.parse(localStorage.getItem("highscores")) || []; // creates var from local storage key highscores
        let newScore = { //creates object for score and initials
            score: timeLeft,
            initials: initials
        };

        highscores.push(newScore); //pushes new score to highscores array
        localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html"; //saves to highscores.html
    } else {
        alert("Please enter your initials so we can store your score."); // alert prompting user to fill in initails in order to save score
    };
};

// >>>>>>>>>>>>>>>>>>>>>>>>> Stage 3: Event listeners for start and submit buttons >>>>>>>>>>>>>>>>>>>>>
startButton.addEventListener("click", startGame); // event listener so startGame function runs on clicking the start button
submitButton.addEventListener("click", saveHighScore); // event listener so saveHighScore function runs on clicking submit button