// Countdown Code
var countdownEl = document.getElementById("countdown");

var countdownTime = 75;

function countdown() {
    var setTime = setInterval(function() {
        countdownTime--;
        countdownEl.textContent = countdownTime;
        if (countdownTime == 0) {
            clearQuizStart();
            clearResults();
            clearQuiz();
            displayQuizFinished();
            clearInterval(setTime);
            finalScoreEl.innerText = "Your final score is " + scoreCounter;
        }
    }, 1000)
}

//------------------------------------------------------------

var quizStartEl = document.getElementById("quizStart");
var quizStartButton = document.getElementById("startQuizButton");
var quizEl = document.getElementById("quiz");
var quizFinishedEl = document.getElementById("quizFinished");
var showHighScoresEl = document.getElementById("showHighScores");
var viewHighScoresEl = document.getElementById("highscore");
var goBackButton = document.getElementById("returnToStart");
var clearScoresButton = document.getElementById("clearScores");
var results = document.getElementById("results");
var correctAnswerEl = document.getElementById("correctAnswer");
var wrongAnswerEl = document.getElementById("wrongAnswer");
var submitScoreEl = document.getElementById("submitScore");
var finalScoreEl = document.getElementById("finalScore");
var highScoreListDisplayEl = document.getElementById("highScoreListDisplay");

var storedHighScores = [];

storedHighScores = JSON.parse(localStorage.getItem("highScoreList"));

// Starting Screen
function init() {
    clearQuiz();
    clearShowHighScores();
    clearQuizFinished();
    clearResults();
}
init();
// ---------------------

// Functions to Clear Sections
function clearQuizStart() {
    quizStartEl.style.display = "none";
}

function clearResults() {
    results.style.display = "none";
}

function clearQuizFinished() {
    quizFinishedEl.style.display = "none";
}

function clearQuiz() {
    quizEl.style.display = "none";
}

function clearShowHighScores() {
    showHighScoresEl.style.display = "none";
}

// Functions to Display Sections
function displayQuiz() {
    quizEl.style.display = "flex";

}
function displayQuizStart() {
    quizStartEl.style.display = "flex";
}

function displayResult() {
    results.style.display = "block";
}

function displayQuizFinished() {
    quizFinishedEl.style.display = "flex";
}

function displayShowHighScores() {
    showHighScoresEl.style.display = "block";

    for (var i = storedHighScores.length-1; i >= 0; i--) {
        var highScoreListItem = document.createElement("li");
        var highScoreListItemText = document.createTextNode(storedHighScores[i]);
        highScoreListItem.appendChild(highScoreListItemText);
        highScoreListDisplayEl.appendChild(highScoreListItem);
    };
}



var currentQuestion = 0;
var scoreCounter = 0;


var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");

var quizQuestions = {
    "Commonly used data types DO Not Include: ": ["1. strings","2. booleans","3. alerts","4. numbers",2],
    "Arrays in JavaScript can be used to store _____.": ["1. numbers and strings","2. other arrays","3. booleans","4. all of the above",3],
    "String values must be enclosed within ______ when being assigned to variables": ["1. commas","2. curly brackets", "3. quotes", "4. parenthesis",2]
}

function loadQuestion(currentQuestion) {
    var displayQuestion = Object.keys(quizQuestions)[currentQuestion];
    questionsEl.innerText = displayQuestion;
}

function loadAnswers(currentQuestion) {
    var choices = quizQuestions[Object.keys(quizQuestions)[currentQuestion]];
    answersEl.innerHTML = "";
    for (var i = 0; i < choices.length - 1; i++) {
        var createButton = document.createElement("button");
        var buttonText = document.createTextNode(choices[i]);
        createButton.appendChild(buttonText);
        createButton.addEventListener("click",checkAnswer(i, choices))
        answersEl.appendChild(createButton);
    };
}

function checkAnswer(i, choicesArray) {
    return function() {
        console.log(i);
        var chosenAnswer = i;
        var correctAnswer = choicesArray[choicesArray.length-1];
    
        if (chosenAnswer === correctAnswer) {
            displayResult();
            correctAnswerEl.style.display = "inline";
            wrongAnswerEl.style.display = "none";
            scoreCounter += 1;
        } else {
            displayResult();
            correctAnswerEl.style.display = "none";
            wrongAnswerEl.style.display = "inline";
            countdownTime -= 10;
        }

        if (currentQuestion < Object.keys(quizQuestions).length - 1) {
            currentQuestion += 1;

            loadQuestion(currentQuestion);
            loadAnswers(currentQuestion);
        } else {
            clearQuiz();
            countdownTime = 1;
        }
    }
}

quizStartButton.addEventListener("click",function() {
    clearQuizStart();
    currentQuestion = 0;
    scoreCounter = 0;
    displayQuiz();
    loadQuestion(currentQuestion);
    loadAnswers(currentQuestion);
    countdownTime = 75;
    countdown();
});

submitScoreEl.addEventListener("click",function(event) {
    event.preventDefault();
    var playerInitialsEl = document.getElementById("playerInitials").value;
    storedHighScores.push(scoreCounter + " - " + playerInitialsEl);
    scoreCounter = 0;
    localStorage.setItem("highScoreList", JSON.stringify(storedHighScores.sort()));
    console.log(storedHighScores);
    init();
    displayQuizStart();
});

goBackButton.addEventListener("click",function() {
    displayQuizStart();
    clearShowHighScores();
});

viewHighScoresEl.addEventListener("click",function() {
    highScoreListDisplayEl.innerHTML = "";
    clearQuiz();
    clearQuizFinished();
    clearQuizStart();
    clearResults();
    displayShowHighScores();
});

clearScoresButton.addEventListener("click",function() {
    storedHighScores = [];
    localStorage.setItem("highScoreList", JSON.stringify(storedHighScores));
    highScoreListDisplayEl.innerHTML = "";
});