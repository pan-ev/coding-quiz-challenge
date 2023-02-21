var countdownEl = document.getElementById("countdown");

var countdownTime = 75;

function countdown() {
    var setTime = setInterval(function() {
        countdownTime--;
        countdownEl.textContent = countdownTime;
    }, 1000)
}

countdown();