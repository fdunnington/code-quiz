function displayHighScores(){
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

   highscores.sort(function(a, b) { //sorts scores (time taken) from highest (least time) to lowest (most time)
        return b.score - a.score;
    });

    highscores.forEach(function(score){ //displays each new high score as new li item
        let li = document.createElement("li");
        li.textContent = `${score.initials}: ${score.score}`;
        
        let ol = document.getElementById("highscores");
        ol.appendChild(li);
    });
}

function clearHighScores() { //clears high scores from local storage and page
    localStorage.removeItem("highscores");
    window.location.reload();
}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearHighScores);

displayHighScores();