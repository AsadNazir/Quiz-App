import { timerClass } from "./timer.js";

//Adding Event listener over here to prev next btn
const next = document.querySelector("#nextQ");
const prev = document.querySelector("#prevQ");

// getting the timer and clearing the local storage
let timer = JSON.parse(localStorage.getItem("timer"));
localStorage.removeItem("timer");


// getting the Qusetion and clearing the local storage
const Qb = JSON.parse(localStorage.getItem("question"));
localStorage.removeItem("question");

//Flag for reloading
let insideTheQuizFlag = true;

//Getting container
let cont = document.querySelector(".Quiz");

//Shared Function by timer module and Quix CLass
export function quizOver(message) {
    insideTheQuizFlag = false;
    cont.style.display = "grid";
    cont.style.placeContent = "center";
    cont.innerHTML = `<h1>${message}<br>Quiz is Over !</h1> 
    <button>Results</button>`;
}

document.addEventListener("visibilitychange",handler);

function handler()

{
    if(document.visibilityState==="hidden")
    {
        quizOver("You left the App !")
    }
}
// Quiz Class OOP way
class Quiz {
    
    //Private Members
    #Qb;
    #count;
    #opt
    timerObj

    constructor(quizObj) 
    {
        // getting the heading and setting
        const heading = JSON.parse(localStorage.getItem("heading"));
        let quizHeadEle=document.querySelector(".mainHeadingQuizApp");
        // getting the option
        this.#opt = JSON.parse(localStorage.getItem("option"));

        //assignment of values
        quizHeadEle.innerHTML = `<span><i class="fa-brands fa-bilibili"></i></span> ${heading}`;
        this.#Qb = quizObj;
        this.#count=0;

        
        //Timer Object Over here
        if(this.#Qb != undefined && insideTheQuizFlag != false)
        {     
        this.timerObj=new timerClass(timer);
        this.timerObj.timerCounter();
        }

      
    }

    creatQuiz=()=> {
        // Reload detection

        if (this.#Qb != undefined && insideTheQuizFlag != false) {
            cont.innerHTML = `<h1>Questions ${this.#count + 1} of ${this.#Qb.length}</h1>
    <div class="quizQuestionsStatement"></div>
    <div class="options">
        <div class="quizOptionsDiv">
            <span class="optionNO">1.</span>
            <div class="quizOptionsText"></div>
        </div>
        <div class="quizOptionsDiv">
            <span class="optionNO">2.</span>
            <div class="quizOptionsText"></div>
        </div>`;

            for (let i = 2; i < this.#opt; i++) {
                cont.innerHTML += `<div class="quizOptionsDiv">
        <span class="optionNO">${i + 1}</span>
        <div class="quizOptionsText"></div>
    </div>`;
            }

            // Adding the heading over here
            let qTemp = document.querySelector(".quizQuestionsStatement");
            qTemp.textContent = this.#Qb[this.#count].statement;

            let optTemp = document.querySelectorAll(".quizOptionsText");

            //Filling in the options
            for (let i = 0; i < optTemp.length; i++) {
                optTemp[i].textContent = this.#Qb[this.#count].optArr[i];
            }
        } else {
            cont.classList.add("over");
            cont.innerHTML = `The Quiz is over because page was reloaded.`;
            next.style.display = "none";
            prev.style.display = "none";
            delete this.timerObj.timerCounter();
        }

        this.getTheOtion();
    }


    //Next and prev Button function
    nextQuestion=() => {
        this.#count++;
        if (this.#count < Qb.length - 1) {
            this.creatQuiz();
        } else if (this.#count == Qb.length - 1) {
            next.textContent = "Finish";
            this.creatQuiz();
        } else if (this.#count >= Qb.length) {
            this.#count--;
            if (confirm("Do u want to sumbmit the quiz ?")) {
                quizOver("Submitted");
            }
        } else {
            next.textContent = "Next";
        }

        this.getTheOtion();
    };
    
    //Prev Button fucntion
    prevQuestion=() => {
        this.#count--;
        if (this.#count >= 0) {
            this.creatQuiz();
            next.textContent = "Next";
        }
        //else
        else {
            this.#count++;
        }
        this.getTheOtion();
    };
    
    getTheOtion=()=>
    {
        let optTemp = document.querySelectorAll(".quizOptionsDiv");
        
      
        for (let i = 0; i < optTemp.length; i++) {

            // Adding Event Listeners
            optTemp[i].addEventListener("click",()=>
            {
            // Adding Marked Class over here
                optTemp[i].classList.toggle("marked");
                // Updating our Data type Qb over here to get the marked option
                if(optTemp[i].classList.contains("marked"))
                {
                    this.#Qb[this.#count].markedOption=i;
                    console.log(this.#Qb);
                }
                else{
                    this.#Qb[this.#count].markedOption=null;
                    console.log(this.#Qb);;
                }
            // Removing the marked CLass from here 
            for (let j = 0; j < optTemp.length; j++) 
            {
                if(j==i)
                {
                    continue;
                }
                optTemp[j].classList.remove("marked");
            }
            
           })      
        }

    }

    storingTheOption=(index)=>
    {
        
    }
   
}

// creating a new Quiz Over here 
let newQuiz=new Quiz(Qb);
newQuiz.creatQuiz();


// next button functionality 
prev.addEventListener("click",()=>{
    newQuiz.prevQuestion();
});

// prev button functionality 
next.addEventListener("click",()=>{
    newQuiz.nextQuestion();
});