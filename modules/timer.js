import { quizOver } from "./quiz.js";
let timer = JSON.parse(localStorage.getItem("timer"));
localStorage.removeItem("timer");
let sec = document.querySelector(".seconds");
let min = document.querySelector(".minutes");
let stopInterval;
let interval = 0;
let minCount = timer;
let secCount = 0;
let currTime = new Date().getTime();
addZero(min, timer);

export function timerCounter() {
    //setting Interval Over here
    interval = currTime;
    interval += (minCount * 60000) + (secCount * 1000);


    interval -= 1000;
    show();
    stopInterval = setInterval(function() {

        minCount = Math.floor((interval - currTime) / 60000);
        secCount = Math.floor(((interval - currTime) % 60000) / 1000);

        if (interval - currTime == 0) {

            clearInterval(stopInterval);
            quizOver("Times Up");
        }
        interval -= 1000;
        show();
    }, 1000);
}

function show() {
    addZero(min, minCount);
    addZero(sec, secCount);
    console.log(secCount);
}

function addZero(ele, no) {
    if (no < 10) {
        ele.textContent = `0${no}`;
    } else {
        ele.textContent = no;
    }
}