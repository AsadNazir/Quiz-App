import { timerCounter } from "./timer.js";

const heading = JSON.parse(localStorage.getItem("heading"));
const opt = JSON.parse(localStorage.getItem("option"));
const quizHeadEle = document.querySelector(".mainHeadingQuizApp");
const Qb = JSON.parse(localStorage.getItem("question"));

const next = document.querySelector("#nextQ");
const prev = document.querySelector("#prevQ");
let insideTheQuizFlag = true;

//Removing local storage items
localStorage.removeItem("question");
localStorage.removeItem("option");


//setting heading value 
quizHeadEle.innerHTML = `<span><i class="fa-brands fa-bilibili"></i></span> ${heading}`;
let cont = document.querySelector(".Quiz")
let count = 0;


//Create Quiz over here
creatQuiz();


// Function over here

function creatQuiz() {

    // Reload detection

    if (Qb != undefined && insideTheQuizFlag != false) {
        cont.innerHTML = `<h1>Questions ${count+1} of ${Qb.length}</h1>
    <div class="quizQuestionsStatement"></div>
    <div class="options">
        <div class="quizOptionsDiv">
            <span class="optionNO">1.</span>
            <div class="quizOptionsText"></div>
        </div>
        <div class="quizOptionsDiv">
            <span class="optionNO">2.</span>
            <div class="quizOptionsText"></div>
        </div>`

        for (let i = 2; i < opt; i++) {

            cont.innerHTML += `<div class="quizOptionsDiv">
        <span class="optionNO">${i+1}</span>
        <div class="quizOptionsText"></div>
    </div>`
        }

        // Adding the heading over here
        let qTemp = document.querySelector(".quizQuestionsStatement");
        qTemp.textContent = Qb[count].statement;

        let optTemp = document.querySelectorAll(".quizOptionsText");

        //Filling in the options
        for (let i = 0; i < optTemp.length; i++) {
            optTemp[i].textContent = Qb[count].optArr[i];

        }
    } else {
        cont.classList.add("over");
        cont.innerHTML = `The Quiz is over because page was reloaded.`;
        next.style.display = "none";
        prev.style.display = "none";
    }
}

if (count == Qb.length - 1) { next.textContent = "Finish" }

// Checking if user has left the Quiz or not 

document.addEventListener("visibilitychange", handler)

function handler() {
    if (document.hidden && insideTheQuizFlag) {
        cont.classList.add("over");
        cont.innerHTML = `You left the Quiz App the Quiz is Over`;
        next.style.display = "none";
        prev.style.display = "none";

    }
}

next.addEventListener("click", () => {
    count++;
    if (count < Qb.length - 1) {
        creatQuiz();

    } else if (count == Qb.length - 1) {
        next.textContent = "Finish"
        creatQuiz();
    } else if (count >= Qb.length) {
        count--;
        if (confirm("Do u want to sumbmit the quiz ?")) {
            quizOver("Submitted")
        }
    } else {
        next.textContent = "Next"
    }
})


prev.addEventListener("click", () => {
    count--;
    if (count >= 0) {
        creatQuiz();
        next.textContent = "Next";
    }
    //else
    else {
        count++;
    }
})

export function quizOver(message) {
    insideTheQuizFlag = false;
    cont.style.display = "grid";
    cont.style.placeContent = "center";
    cont.innerHTML = `<h1>${message}<br>Quiz is Over !</h1> 
    <button>Results</button>`;
}

timerCounter();