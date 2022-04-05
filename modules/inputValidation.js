let quizHeading = document.querySelector("#quizName");
let noOfQuestions = document.querySelector("#noOfQuestions");
let timer = document.querySelector("#timerMins");

// Export elements over here
export let timerCount;
export let noOfOptions;
export let noOfQuestionsCount;
export let quizHeadingValue;


//Checking the main form for the input 
export function startingFormValidation() {

    timerCount = timer.value;
    noOfOptions = document.querySelector("#options").value;
    noOfQuestionsCount = noOfQuestions.value;
    quizHeadingValue = quizHeading.value;

    let flag1 = true;
    let flag2 = true;
    let flag3 = true;

    if (quizHeading.value == '') {
        quizHeading.style.border = `2px solid red`;
        flag1 = false;
    } else {
        quizHeading.style.border = `2px solid grey`;
        flag1 = true;
    }
    if (noOfQuestions.value > 10 || noOfQuestions.value <= 0) {
        flag2 = false;
        noOfQuestions.style.border = `2px solid red`;
    }
    //
    else {
        flag2 = true;
        noOfQuestions.style.border = `2px solid grey`;
    }
    if (timerCount > 100 || timerCount < 0) {
        timer.style.border = `2px solid red`;
        flag3 = false;
    } else {
        flag3 = true;
        timer.style.border = `2px solid grey`;
    }

    return flag1 && flag2 && flag3;
}


//Checking Question Form Vaidation Over here
export function questionFormValidation(statement, opt, radio) {
    let flag1 = true;
    let flag2 = true;
    let flag3 = true;

    //statement
    if (statement.value == "") {
        statement.style.border = `2px solid red`;
        flag1 = false;
    } else {
        statement.style.border = `2px solid grey`;
        flag1 = true;
    }

    //radios over here

    if (radio == null) {
        flag2 = false;
    }


    //Options Over here
    for (let i = 0; i < opt.length; i++) {
        if (opt[i].value == "") {
            opt[i].style.border = '2px solid red'
            flag3 = false;
        } else {
            opt[i].style.border = '2px solid grey'
        }

    }

    return flag1 && flag2 && flag3;
}