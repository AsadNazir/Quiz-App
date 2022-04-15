
class Results{

constructor()
{
    this.Qb=JSON.parse(localStorage.getItem("results"));
    this.correct=0;
    this.unattempted=0;
    this.wrong=0;
    this.status=JSON.parse(localStorage.getItem("status"));
    this.timeLeft=JSON.parse(localStorage.getItem("TimeLeft"));
}

show=()=>
{
    for (let i = 0; i < this.Qb.length; i++) {

        if(this.Qb[i].correctOpt-1==this.Qb[i].markedOption)
        {
            this.correct++;
        }
        else if(this.Qb[i].markedOption==null)
        {
            this.unattempted++;
        }
        else
        {
            this.wrong++;
        }
        
    }

    let wrong=document.querySelector(".wrong");
    wrong.innerHTML=`<span>Wrong</span>
    <span>${this.wrong}/${this.Qb.length}</span>`;

    let correct=document.querySelector(".correct");
    correct.innerHTML=`<span>Correct</span>
    <span>${this.correct}/${this.Qb.length}</span>`
    
    let unattempted=document.querySelector(".unattempted");
    unattempted.innerHTML=`<span>Unattempted</span>
    <span>${this.unattempted}/${this.Qb.length}</span>`;

    let status=document.querySelector("#status");
    status.textContent=`${this.status}`;

    let time=document.querySelector("#time");
    time.textContent=`Time: ${this.timeLeft.FinishdMinutes}:`;

    if(this.timeLeft.FinishdSeconds<10) time.textContent+=`0${this.timeLeft.FinishdSeconds}`;
    else time.textContent+=`${this.timeLeft.FinishdSeconds}`;
}

}

let res=new Results();
res.show();