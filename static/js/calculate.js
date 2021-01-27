let level = document.getElementById("level");
let countDown = document.getElementById("countDown");
let count = document.getElementById("count");
let nBack = document.getElementById("nBack");
let remain = document.getElementById("remain");
let levelNums = document.querySelectorAll('button[name="level-button"]');
let calculate = document.getElementById("calculate");
let number1 = document.getElementById("number1");
let number2 = document.getElementById("number2");
let question = document.getElementById("question");
let judge = document.getElementById("judge");
let button = document.getElementById("button");
let buttonList = document.querySelectorAll('button[name="num-button"]');


let answerList = [];
let firstNum1 =  Math.floor(Math.random() * 10);;
let firstNum2 =  Math.floor(Math.random() * 10);;
let levelNum = 0;
let firstCheck = 0;
let correct = 0;
let remainTimeBar = 100;
let startTime;
let finishTime;
let firstTimer;
let timer;
let reduce;

  

function setNum(){
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    return [num1,num2]
}
function setValue(){
    let [int1,int2] = setNum();
    number1.innerHTML = int1;
    number2.innerHTML = int2;
    if(int1 + int2 >=10){
        answerList.push(int1 + int2 -10);
    }
    else{
        answerList.push(int1 + int2);
    }
}

function firstCheckValue(int){
    
    if(firstCheck < int){
        setValue();
        firstCheck ++;
        if(firstCheck === int){
            countDown.classList.remove("hidden");
            stopFirstSet();
        }
        console.log(firstCheck);
    }

}

function limitTime(level){
    let length = answerList.length -level;
    remainTimeBar = 100;
    console.log(answerList);
    remain.setAttribute("style","width: 100%;height: 10px;background-color: #000;")
    if(length < 10 - level){
        setValue();
    }
    else if(length >= 10-level && length < 10){
        setValue();
        number1.innerHTML = '<span class="damy">0</span>';
        number2.innerHTML = '<span class="damy">0</span>';    
    }
    else{
        button.classList.add("damy");
        stopTimer();
        finishTime = new Date();
        let timeStanp = finishTime.getTime() - startTime.getTime();
        let form = document.createElement("form");
        let time = document.createElement("input")
        let score = document.createElement("input");
        form.method = "POST"
        form.action = "/result";
        form.class = "hidden";

        time.name = "time";
        time.type = "text";
        time.value = timeStanp;
        score.name = "score";
        score.type = "text";
        score.value = correct*levelNum;

        form.appendChild(time);
        form.appendChild(score);

        document.body.appendChild(form);
        form.submit();  
    }
}


function firstSetTimer(int){
    firstTimer = setInterval(function(){firstCheckValue(int)},2000);
    
}
function stopFirstSet(){
    clearInterval(firstTimer);
}


function reduceTime(){
    remainTimeBar -= 0.1;
    let style = "width:" + remainTimeBar + "%;height: 10px;background-color: #000;"
    remain.setAttribute("style",style);
}

function startTimer(level){
    countDown.classList.add("hidden");
    remain.classList.remove("damy");
    timer = setInterval(function(){limitTime(level)},10000);
    reduce = setInterval(reduceTime,10)
}
function stopTimer(){
    clearInterval(timer);
    clearInterval(reduce);
}


number1.innerHTML = firstNum1;
number2.innerHTML = firstNum2;

if(firstNum1 + firstNum2 >= 10){
    answerList.push(firstNum1 + firstNum2 -10);
}
else{
    answerList.push(firstNum1 + firstNum2);
}




levelNums.forEach(function(clickButton){
    clickButton.addEventListener("click",function(){
        levelNum = Number(clickButton.value);
        question.innerHTML = levelNum.toString() + "つ前の回答の一桁目の数字は？";
        level.classList.add("hidden");
        calculate.classList.remove("hidden");
        firstSetTimer(levelNum);
        
        setTimeout(function(){count.innerHTML = 2;},1000+levelNum*2000)
        setTimeout(function(){count.innerHTML = 1;button.classList.remove("damy");},2000+levelNum*2000)
        setTimeout(function(){startTimer(levelNum);startTime=new Date();},3000+levelNum*2000);
        
        
    })
})


buttonList.forEach(function(htmlTag){
    htmlTag.addEventListener("click",function(){
        let length = answerList.length -levelNum;
        if(Number(htmlTag.value) === Number(answerList[length-1])){
            if(length < 10 - levelNum){
                stopTimer();
                judge.innerHTML = "正解";
                remain.setAttribute("style","width: 100%;height: 10px;background-color: #000;");
                setValue();
                remainTimeBar = 100;
                correct ++;
                setTimeout(function(){judge.innerHTML = ""},1000);
                startTimer(levelNum)
            }
            else if(length >= 10 - levelNum && length < 10){
                stopTimer();
                setValue();
                judge.innerHTML = "正解";
                number1.innerHTML = '<span class="damy">0</span>';
                number2.innerHTML = '<span class="damy">0</span>'; 
                remain.setAttribute("style","width: 100%;height: 10px;background-color: #000;"); 
                remainTimeBar = 100;
                correct ++;
                setTimeout(function(){judge.innerHTML = ""},1000);
                startTimer(levelNum);  
            }
            else{
                button.classList.add("damy");
                stopTimer();
                correct ++;
                finishTime = new Date();
                let timeStanp = finishTime.getTime() - startTime.getTime()
                let form = document.createElement("form");
                let time = document.createElement("input")
                let score = document.createElement("input");
                form.method = "POST"
                form.action = "/result";
                form.class = "hidden"

                time.name = "time";
                time.type = "text";
                time.value = timeStanp;
                score.name = "score";
                score.type = "text";
                score.value = correct*levelNum;

                form.appendChild(time);
                form.appendChild(score);

                document.body.appendChild(form);
                form.submit();
                
            }
        }
        else{
            if(length < 10 - levelNum){
                stopTimer();
                judge.innerHTML = "不正解";
                remain.setAttribute("style","width: 100%;height: 10px;background-color: #000;");
                setValue();
                remainTimeBar = 100;
                setTimeout(function(){judge.innerHTML = ""},1000);
                startTimer(levelNum)
            }
            else if(length >= 10 - levelNum && length < 10){
                stopTimer();
                setValue();
                judge.innerHTML = "不正解";
                number1.innerHTML = '<span class="damy">0</span>';
                number2.innerHTML = '<span class="damy">0</span>'; 
                remain.setAttribute("style","width: 100%;height: 10px;background-color: #000;"); 
                remainTimeBar = 100;
                setTimeout(function(){judge.innerHTML = ""},1000);
                startTimer(levelNum);  
            }
            else{
                button.classList.add("damy");
                stopTimer();
                correct ++;
                finishTime = new Date();
                let timeStanp = finishTime.getTime() - startTime.getTime()
                let form = document.createElement("form");
                let time = document.createElement("input")
                let score = document.createElement("input");
                form.method = "POST"
                form.action = "/result";
                form.class = "hidden"

                time.name = "time";
                time.type = "text";
                time.value = timeStanp;
                score.name = "score";
                score.type = "text";
                score.value = correct*levelNum;

                form.appendChild(time);
                form.appendChild(score);

                document.body.appendChild(form);
                form.submit();
                
            }
        }
    })
})