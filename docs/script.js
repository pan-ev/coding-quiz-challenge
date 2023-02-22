var countdownEl = document.getElementById("countdown");

var countdownTime = 75;

function countdown() {
    var setTime = setInterval(function() {
        countdownTime--;
        countdownEl.textContent = countdownTime;
    }, 1000)
}

var quizStartEl = document.getElementById("quizStart");
var quizEl = document.getElementById("quiz");
var quizFinishedEl = document.getElementById("quizFinished");
var showHighScoresEl = document.getElementById("showHighScores");

// Functions to clear Page Sections
function clearQuizStart() {
    quizStartEl.style.display = "none";
}

function clearQuiz() {
    quizEl.style.display = "none";
}

function clearQuizFinished() {
    quizFinishedEl.style.display = "none";
}

function clearShowHighScores() {
    showHighScoresEl.style.display = "none";
}

var currentQuestion = 0;

var quizQuestions = {
    "Commonly used data types DO Not Include: ": ["1. strings","2. booleans","3. alerts","4. numbers",2],
    "Arrays in JavaScript can be used to store _____.": ["1. numbers and strings","2. other arrays","3. booleans","4. all of the above",3],
    "String values must be enclosed within ______ when being assigned to variables": ["1. commas","2. curly brackets", "3. quotes", "4. parenthesis",2]
}

var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");

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
        createButton.addEventListener("click",function() {

        })
        answersEl.appendChild(createButton);

    };
}

loadQuestion(currentQuestion);
loadAnswers(currentQuestion);

countdown();

