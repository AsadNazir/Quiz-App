import { noOfOptions, noOfOptions as opt, noOfQuestionsCount as noOfQ, questionFormValidation as qFv, quizHeadingValue as heading, timerCount } from "./inputValidation.js";

//
localStorage.clear();

//Global scope
let count = 0;
let nextQ = document.getElementById("nextBtn");
let backQ = document.getElementById("backBtn");
let cont = document.querySelector("#MainContForQuizApp");
let submitBtn;
let steps = document.querySelectorAll(".steps li")

//Questions Object Array
export let questionsBank = [];

//Expoting Default function
export default function Questions() {

    //Creating form For the first Time
    createQuestionForm();
    //Adding new Event listners to the same previous buttons
    nextQ.addEventListener("click", nextQFunc)
    backQ.addEventListener("click", backQFunc)

}

//Creating the form
export function createQuestionForm() {
    cont.className = 'questionForm';

    //Adding content over here
    cont.innerHTML = ` <h1>Questions ${count+1} of ${noOfQ}</h1>
   <textarea name="" id="" placeholder="Question Statment" class="qStatement"></textarea>
   <div class="options">
       <div class="optionsDiv">
           <input type="radio" value="1"  name="option" id="">
           <textarea name="" placeholder="Type Option 1 here" id=""></textarea>
       </div>
       <div class="optionsDiv">
           <input type="radio" value="2"  name="option" id="">
           <textarea name="" placeholder="Type Option 2 here" id=""></textarea>
       </div>
   </div>`;


    //Adding Options over here
    let option = document.querySelector(".options");
    for (let i = 2; i < opt; i++) {

        option.innerHTML += `<div class="optionsDiv">
       <input type="radio" value=${i+1} name="option" id="">
       <textarea name="" placeholder="Type Option ${i+1} here" id=""></textarea>
       </div>`
    }

}

//Constructor Function
function NewQuestion(statement, optArr, correctOpt) {
    this.statement = statement;
    this.optArr = optArr;
    this.correctOpt = correctOpt;
    this.markedOption=null;
}



//  Next Q Function over here
function nextQFunc() {

    // This will check if the count is within the range
    if (count < noOfQ - 1 && questionsBank[count + 1] == undefined) {
        storingQuestionsInbank();

    } else if (count < noOfQ - 1 && questionsBank[count + 1] != undefined) {
        count++;
        displayingQuestionBank();
    }

    //Submitting the quiz
    else {

        //Taking user consent over here
        if (storingQuestionsInbank()) {
            if (!confirm("Do you want to start the quiz ?")) {
                count--;
                displayingQuestionBank();
            };

            //Disabkling the back and next buttons
            nextQ.style.display = "none";
            backQ.style.display = "none";

            // cont styling over here
            cont.classList.add("submitDiv");
            cont.style.display = "flex";
            cont.style.justifyContent = "center";
            cont.style.textAlign = 'center'

            // Adding a start Quiz Button over here
            cont.innerHTML = `<span>The Quiz consists of ${noOfQ} question/s, each having ${noOfOptions} option/s. The Time limit is of ${timerCount} minute/s.<br>If the page is reloaded Quiz will be over.<br>If the you leave the tab the Quiz will be over.<br>Click to start</span>
            <div class="btnDiv">
            <button class="btn" id="submit"><a href="../quiz.html" target="_blank" >Start</a></button>
            <button class="btn" ><a href="../index.html" >Home</a></button>
            </div>`

            //Fillimg the 3rd step over here 
            submitBtn = document.querySelector("#submit");
            submitBtn.addEventListener("click", submit);
            steps[2].classList.remove("stepsUnfill");

        }


    }
}

//Back button function
function backQFunc() {

    count--;
    if (count >= 0 && count < noOfQ - 1) {
        displayingQuestionBank();

    } else {
        count++;
    }
}

//This is use to actually store the qusrtions in question bank return bool for success and failure
function storingQuestionsInbank() {
    let radio = document.querySelector(`input[name="option"]:checked`);
    let option = document.querySelectorAll(".optionsDiv textarea");
    let qStatement = document.querySelector(".qStatement");

    //Entering the data into the array
    if (qFv(qStatement, option, radio)) {
        let optionText = [];
        for (let i = 0; i < option.length; i++) {
            optionText[i] = (option[i].value);
        }

        //Pushing the questions into the quesion array
        questionsBank[count] = new NewQuestion(qStatement.value, optionText, Number(radio.value));

        //Preparing The Question Form for Next Questions
        count++;
        createQuestionForm()
        return true;

    } else {
        return false;
    }
}

// This func willl display the question bank at specific count value
// Can be called in both Prev and Next btn

function displayingQuestionBank() {
    
    let radio = document.querySelectorAll(`input[name="option"]`);
    let option = document.querySelectorAll(".optionsDiv textarea");
    let qStatement = document.querySelector(".qStatement");
    let h1 = document.querySelector("#MainContForQuizApp h1").textContent = `Questions ${count+1} of ${noOfQ}`;

    qStatement.value = questionsBank[count].statement;

    for (let i = 0; i < option.length; i++) {
        option[i].value = questionsBank[count].optArr[i];

    }
    radio[questionsBank[count].correctOpt - 1].setAttribute("checked", "");


}

//Submit Quiz over here
function submit() {
    localStorage.setItem('question', JSON.stringify(questionsBank));
    localStorage.setItem('option', JSON.stringify(noOfOptions));
    localStorage.setItem('heading', JSON.stringify(heading));
    localStorage.setItem('timer', JSON.stringify(timerCount));
}