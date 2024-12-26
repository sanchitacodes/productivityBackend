let stopwatchtimer = document.querySelector(".stopwatchtimer");
let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let reset = document.querySelector(".reset");
let hr = 0;
let min = 0;
let sec = 0;
let timer = null;

function startTimer() {
  if (sec < 59) {
    sec++;
  }  if (sec == 59) {
    min++;
    sec = 0;
  }
  if (min == 60) {
    hr++;
    min = 0;
  }

 let secValue = sec < 10 ? "0" + sec : sec;
 let minValue = min < 10 ? "0" + min : min;
 let hrValue = hr < 10 ? "0" + hr : hr;

  stopwatchtimer.innerHTML = hrValue + ":" + minValue + ":" + secValue;
}

start.addEventListener("click", function () {
    if (timer !== null) {
        clearInterval(timer);
    }
  timer = setInterval(startTimer, 1000);
});

stop.addEventListener("click", function () {
  clearInterval(timer);
});

reset.addEventListener("click", function () {
  clearInterval(timer);
  hr = 0;
  min = 0;
  sec = 0;
  stopwatchtimer.innerHTML = "00:00:00";
});
