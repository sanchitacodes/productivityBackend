
function startCountdown() {

    let input = document.getElementById('timeInput').value;
    let countdownTime = parseInt(input) * 60; // assuming input in minutes

    function updateTimer() {
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;
        document.getElementById('timer').innerHTML = `${minutes}m ${seconds}s`;

        if (countdownTime > 0) {
            countdownTime--;
            setTimeout(updateTimer, 1000);
        }

        if (countdownTime === 0) {
            document.getElementById('timer').innerHTML = "Time's up!";
        }

    }

    updateTimer();
}
