/*

---- [03] Create The App Logic
---- [01] Add Levels
---- [02] Show Level And Seconds
---- [03] Add Array Of Words
---- [04] ِAdd Start Game Button
---- [05] Generate Upcoming Words
---- [06] Disable Copy Word And Paste Event + Focus On Input
---- [07] Start Play Function
---- [08] Start The Time And Count Score
---- [09] Add The Error And Success Messages
---- [04] Your Trainings To Add Features
---- [01] Save Score To Local Storage With Date
---- [02] Choose Levels From Select Box
---- [03] Break The Logic To More Functions
---- [04] Choose Array Of Words For Every Level
---- [05] Write Game Instruction With Dynamic Values
---- [06] Add 3 Seconds For The First Word

*/



// Array Of Words
const words = [
"Hello",
"programming",
"Code",
"Javascript",
"Town",
"Country",
"Testing",
"Youtube",
"Linkedin",
"Twitter",
"Github",
"Leetcode",
"Internet",
"Python",
"Scala",
"Destructuring",
"Paradigm",
"Styling",
"Cascade",
"Documentation",
"Coding",
"Funny",
"Working",
"Dependencies",
"Task",
"Runner",
"Roles",
"Test",
"Rust",
"Playing"
];

// catch selectors

let lvl = document.querySelector(".message .lvl");
let seconds = document.querySelector(".message .seconds");
let start = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotale = document.querySelector(".score .total");
let finish = document.querySelector(".finish");
let Scores = document.querySelector(".Score");
let allLeveles = document.querySelector(".Lev");
let inpOne = document.querySelector(".easy .inp-one");
let easyAll = document.querySelectorAll(".Lev input");
let inpTwo = document.querySelector(".normal .inp-two");
let inpThree = document.querySelector(".hard .inp-three");
let names = document.querySelector(".name");
console.log(names);



function btn() {
    let button = document.createElement("button");
    button.classList.add("btn")
    let buttonTxt = document.createTextNode("Again");
    button.style.cssText = "width: 80px;  height: 68px; border: none; border-bottom-right-radius: 20px; background-color: #009688; color: white; position: absolute; left: 0px; top: 0px; font-weight: bold; font-size: 20px; cursor: pointer;"
    button.appendChild(buttonTxt);
    names.appendChild(button);

    button.onclick = () => {
        window.location.reload();
    };
};


let DefaultLevel;
let DefualtSeconds;

function allInputs() {

    easyAll.forEach((inp) => {

        inp.addEventListener("click", (e) => {

            if(e) {

                allLeveles.remove();

            }

            DefaultLevel = inp.name; 

            DefualtSeconds = inp.value;

            lvl.innerHTML = DefaultLevel; // set level defualt in selector ivl

            seconds.innerHTML = DefualtSeconds; // set seconds defualt in selector seconds

            timeSpan.innerHTML = DefualtSeconds; // set seconds defualt in selector timeSpan

            scoreTotale.innerHTML = words.length;  // set score total in selector scoreTotale


        });
    
    });

};

allInputs(); 


// easyAll.forEach((one) => {

//     one.addEventListener("click", (e) => {

//         console.log(e.currentTarget.checked = true);

//     });

// })




// disable past event

input.onpaste = function() {
    return false;
};

input.classList.add("inp");

start.onclick = function() {

    if(DefaultLevel && DefualtSeconds) {

    btn();

    input.classList.remove("inp");

    start.remove();

    input.focus();

    allLeveles.remove();

    // generate Random function

    generateRandom();

};
    
};



function generateRandom() {

    // get random from array

    let wordVar = words[Math.floor(Math.random() * words.length)];

    // get index random element

    let indWork = words.indexOf(wordVar);

    // remove random element from array

    words.splice(indWork, 1);

    // show random element 

    theWord.innerHTML = wordVar;

    // empty upcomingWords

    upcomingWords.innerHTML = "";

    // genarate elements of array

    for(let i = 0; i < words.length; i++) {

        let div = document.createElement("div");
        let divTxt = document.createTextNode(words[i]);
        div.appendChild(divTxt);
        upcomingWords.appendChild(div);
    };

    // start play function
    
    timeCalculation();
};

function timeCalculation() {

    let obj = {

        scoreTotale : scoreGot.innerHTML,
    };
    
    let objArry =  [];

    if(localStorage.getItem("score")) {

        objArry = JSON.parse(localStorage.getItem("score"));

    };

    // getDataFromLocalStorage();
    
    objArry.push(obj);
        
    timeSpan.innerHTML = DefualtSeconds;

    let start = setInterval(() => {

        timeSpan.innerHTML--;

        if(timeSpan.innerHTML == "0") {

            // stop counter time

            clearInterval(start);

            // comapre words

            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {

                // empty input field

                input.value = "";

                // increase score

                scoreGot.innerHTML++;

                if(words.length > 0) {
                    
                    //call generate random function 
                    generateRandom();

                } else {

                    // all words is good + remove input and upcomingWords and theWord elements

                    input.value = "";
                    let spanGood = document.createElement("span");
                    spanGood.className = "spanAllIsGood";
                    let spanGoodTxt = document.createTextNode("Good");
                    spanGood.appendChild(spanGoodTxt);
                    finish.appendChild(spanGood);
                    input.remove();
                    upcomingWords.remove();
                    theWord.remove();
                    addDataToLocalStorage(objArry);

                };

            }else {

                // generate game over
                input.value = "";
                let spanGameOver = document.createElement("span");
                spanGameOver.className = "bad";
                let spanGameOverTxt = document.createTextNode("Game Over");
                spanGameOver.appendChild(spanGameOverTxt);
                finish.appendChild(spanGameOver);
                addDataToLocalStorage(objArry);
            };

        };

    }, 1000);

};

function addDataToLocalStorage(objArry) {

    window.localStorage.setItem("score", JSON.stringify(objArry));

};

// function getDataFromLocalStorage() {

//     let data = window.localStorage.getItem("score");

//     if(data) {

//         let myWords = JSON.parse(data);

//     };

// };




