import { timerClass } from "./timer.js";

//Adding Event listener over here to prev next btn
const next = document.querySelector("#nextQ");
const prev = document.querySelector("#prevQ");

// getting the timer and clearing the local storage
let timer = JSON.parse(localStorage.getItem("timer"));
localStorage.removeItem("timer");


// getting the Qusetion and clearing the local storage
let Qb = JSON.parse(localStorage.getItem("question"));
localStorage.removeItem("question");

//Flag for reloading
let insideTheQuizFlag = true;

//Getting container
let cont = document.querySelector(".Quiz");

//Shared Function by timer module and Quix CLass
export function quizOver(message) {

    //Changing the flag value to false
    insideTheQuizFlag = false;

    // applying the styling to the cont/ Quiz Contianer
    cont.style.display = "grid";
    cont.style.placeContent = "center";
    cont.innerHTML = `<h1 class="over2">${message}<br>Quiz is Over !</h1> 
    <a href="../results.html" class="btn" >Results</a>`;

    // Removing the next and prev buttons
    next.style.display='none';
    prev.style.display='none';

    // setting local storage
    localStorage.setItem("status",JSON.stringify(message));
    localStorage.setItem("results",JSON.stringify(Qb));
}


// Quiz Class OOP way
class Quiz {
    
    //Private Members
    #count;
    #opt
    timerObj

    //Constructor Funcion
    constructor() 
    {
        // getting the heading and setting
        const heading = JSON.parse(localStorage.getItem("heading"));
        let quizHeadEle=document.querySelector(".mainHeadingQuizApp");

        // getting the option
        this.#opt = JSON.parse(localStorage.getItem("option"));

        //assignment of values
        quizHeadEle.innerHTML = `<span><i class="fa-brands fa-bilibili"></i></span> ${heading}`;
        this.#count=0;

        
        //Timer Object Over here and detecting if the page was Reloaded or not
        if(Qb != undefined && insideTheQuizFlag != false)
        {     
        this.timerObj=new timerClass(timer);
        this.timerObj.timerCounter();
        }

        // Handling Page Leaving over here
        document.addEventListener("visibilitychange",this.handler);
      
    }

    //This is the main function that will create the Quiz's Each Question

    creatQuiz=()=> {

        //Filling up the Quiz with empty HTML
        if (Qb != undefined && insideTheQuizFlag != false) {
            cont.innerHTML = `<h1>Questions ${this.#count + 1} of ${Qb.length}</h1>
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

            // Adding the statemnt over here
            let qTemp = document.querySelector(".quizQuestionsStatement");
            qTemp.textContent = Qb[this.#count].statement;

            //Adding Options over here
            let optTemp = document.querySelectorAll(".quizOptionsText");

            //Filling in the options
            for (let i = 0; i < optTemp.length; i++) {
                optTemp[i].textContent = Qb[this.#count].optArr[i];
            }

            
        } 
        //Else If the page was reloaded that local storage would be empty
        // Displayin Page Reload Message

        else {
            cont.classList.add("over");
            cont.innerHTML = `The Quiz is over because page was reloaded.`;
            next.style.display = "none";
            prev.style.display = "none";
        }
      
        // Getting the marked optins
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
        // Calling the stop timer to submit the time taken to solve
                this.timerObj.stop();
               
            }
        } else {
            next.textContent = "Next";
        }
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
       
    };
    
    //Adding event listners to the options and storing the marked options
    getTheOtion=()=>
    {
        let optTemp = document.querySelectorAll(".quizOptionsDiv");
        
        // Already marked Options displayed here
        if(Qb[this.#count].markedOption!=null)
        {
          optTemp[Qb[this.#count].markedOption].classList.add("marked");
        }

      
        for (let i = 0; i < optTemp.length; i++) {

            // Adding Event Listeners
            optTemp[i].addEventListener("click",()=>
            {
            // Adding Marked Class over here
                optTemp[i].classList.toggle("marked");
                // Updating our Data type Qb over here to get the marked option
                if(optTemp[i].classList.contains("marked"))
                {
                    Qb[this.#count].markedOption=i;
                   
                }
                else{
                    Qb[this.#count].markedOption=null;
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

    //Handler for page leaving detection
    handler=()=>
    {
        if(document.visibilityState==="hidden" && insideTheQuizFlag!=false)
        {
        quizOver("You left the App !");
        this.timerObj.stop();

        }
    }
}

// Main Driver Code For Above Class

// creating a new Quiz Over here 
let newQuiz=new Quiz();
newQuiz.creatQuiz();


// next button functionality 
prev.addEventListener("click",()=>{
    newQuiz.prevQuestion();
});

// prev button functionality 
next.addEventListener("click",()=>{
    newQuiz.nextQuestion();
});