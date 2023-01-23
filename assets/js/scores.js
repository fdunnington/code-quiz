function displayHighScores(){
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

   highscores.sort(function(a, b) { //sorts scores (time taken) from highest (least time) to lowest (most time)
        return b.score - a.score;
    });

    highscores.forEach(function(score){
        let li = document.createElement("li");
        li.textContent = `${score.initials} - ${score.score}`;
        
        let ol = document.getElementById("highscores");
        ol.appendChild(li);
    });

    console.log(highscores);
}


function clearHighScores() {
    localStorage.removeItem("highscores");
    window.location.reload();
}


let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighScores);

displayHighScores();