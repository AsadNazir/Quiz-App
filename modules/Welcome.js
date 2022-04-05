// Impoting input Validation over here
import * as inputValidation from './inputValidation.js';
import * as Questions from './Questions.js'

// Global Vraibales Declaration

let nextBtn = document.getElementById("nextBtn");
let backBtn = document.getElementById("backBtn");
let startingApp = document.querySelector(".startingApp");
let mainMenuContainer = document.querySelector(".mainMenuContainer");
let btnDiv = document.querySelector(".btnDiv");
let steps = document.querySelectorAll(".steps li");
let welcomeHeight;

// Main Page Functionallity For Welcome Screen and menu


//Btn div over here
btnDiv.style.justifyContent = "center";


nextBtn.addEventListener("click", function nextBtnFunc() {
    if (this.id == "nextBtn") {
        let mainMenuHeight = mainMenuContainer.clientHeight;

        // Moving Welcome
        let welcome = document.querySelector(".welcome");
        welcomeHeight = welcome.clientHeight;
        welcome.style.transform = `translateX(100%)`;

        //Entering the form
        let mainMenu = document.querySelector(".mainMenuContainer");
        mainMenu.style.transform = `translateX(0)`;

        //Changing Attribute and name of button
        this.textContent = "Start";
        this.id = "startBtn";

        //Changing the height
        startingApp.style.minHeight = `${mainMenuHeight}px`;

        //Back Btn Over Here
        backBtn.style.display = "block";

        //Btn div over here
        btnDiv.style.justifyContent = "space-between";

        // Steps handled over here
        steps[0].classList.remove("stepsUnfill");

        backBtn.addEventListener("click", backBtnFunc)
    }
    // -------Else
    else {
        // Steps handled over here
        steps[1].classList.remove("stepsUnfill");

        if (inputValidation.startingFormValidation()) {

            nextBtn.removeEventListener("click", nextBtnFunc);
            backBtn.removeEventListener("click", backBtnFunc);

            //  Changing ID's and Text Content
            nextBtn.id = "nextQ";
            backBtn.id = "backQ";
            nextBtn.textContent = 'Next'
            backBtn.textContent = 'Prev'

            //Calling the default functionality of 
            Questions.default();
        }
    }
})

// backBtn Function
function backBtnFunc() {

    //exiting the form
    let mainMenu = document.querySelector(".mainMenuContainer");
    mainMenu.style.transform = `translateX(-1000%)`;

    // Moving Welcome
    let welcome = document.querySelector(".welcome");
    welcome.style.transform = `translateX(0%)`;

    //Changing Attribute and name of button
    nextBtn.textContent = "Next";
    nextBtn.id = "nextBtn";

    //Changing the height
    startingApp.style.minHeight = `${welcomeHeight}px`;

    //Back Btn Over Here
    backBtn.style.display = "none";

    //Btn div over here
    btnDiv.style.justifyContent = "center";

    // Steps handled over here
    steps[0].classList.add("stepsUnfill");

}