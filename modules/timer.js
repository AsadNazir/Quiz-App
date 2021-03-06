import { quizOver } from "./quiz.js";

export class timerClass
{
    #minCount;
    #sec;
    #min;
    #currTime 
    #secCount;
    #interval;
    #stopInterval;
    #TimerMiutes
    constructor(time)
    {
        // The min assigned
        this.#minCount=time;
        this.#TimerMiutes=time;
        this.#sec= document.querySelector(".seconds");
        this.#min= document.querySelector(".minutes");
        this.#currTime = new Date().getTime();
        this.#secCount=0;
        this.#addZero(this.#min,this.#minCount)
        this.#interval=0;
        this.#addZero(this.#min,this.#minCount)
    }

    //Main Function that is going to be called Outside
    timerCounter() {
        
        //setting Interval Over here
        this.#interval = this.#currTime;
        this.#interval += (this.#minCount * 60000) + (this.#secCount * 1000);
    
        //interval
        this.#interval -= 1000;   
        this.#show();
        this.#stopInterval = setInterval(this.#countDown, 1000);
    }

  

    // Add zero
    #addZero(ele, no) {
        if (no < 10) {
            ele.textContent = `0${no}`;
        } else {
            ele.textContent = no;
        }
    }

    //Count Down Function
   #countDown =()=> {
    
        this.#minCount = Math.floor((this.#interval - this.#currTime) / 60000);
        this.#secCount = Math.floor(((this.#interval - this.#currTime) % 60000) / 1000);

        if (this.#interval - this.#currTime == 0) {

            clearInterval(this.#stopInterval);
            quizOver("Times Up");
            // Calling stop
            this.stop();
    
        }
        this.#interval -= 1000;
        this.#show();

    }

      // Show fucntion over here
    #show() {
        this.#addZero(this.#min, this.#minCount);
        this.#addZero(this.#sec, this.#secCount);   
    }
    
    //Stop the clock and send back the recorded time
    stop()
    {
        clearInterval(this.#stopInterval);
        let timeLeft={
            FinishdMinutes:this.#TimerMiutes-this.#minCount-1,
            FinishdSeconds:60-this.#secCount
        }
        if(timeLeft.FinishdMinutes==-1)
        {
            timeLeft.FinishdMinutes=this.#TimerMiutes;
            timeLeft.FinishdSeconds=0;
        }
     
        localStorage.setItem("TimeLeft",JSON.stringify(timeLeft));
    }
}