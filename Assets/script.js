//Var declarations
var startButton= document.querySelector('#start')
startButton.addEventListener('click',startQuiz);
const submitButton=document.querySelector(".answer");
submitButton.addEventListener('click',submitAnswer);
var darkMode=document.querySelector('#dark-mode');
darkMode.addEventListener('click',darkTheme);
const questionBox=document.getElementById("question-box");
const answerButtons=[a1,a2,a3,a0];
let questionNumber= 0;
let subInitials= document.querySelector('#subIt');
subInitials.addEventListener("click", subInitialsFunction);
let highScoreButton = document.querySelector("#show-highscore");
highScoreButton.addEventListener("click", highScoreFunction );
let homeButton=document.querySelector('#home');
homeButton.addEventListener('click', returnHome);
const timeEl =document.querySelector('.timer')
 let timeLeft= 120

 //Array of all the Questions
const questions= ["What HTML Tag do you use to write Javascript?","What character is used to seperate Javascript statements?", "What does 'var' do?", "Whats the difference betweem Alert() and prompt?", "What is a Boolean?", "What is a Function?"
,"What is an Array?", "What is the correct format of a For Loop","what can a switch statement be used for?","What are the character(s) for the logical operators OR, AND, NOT ?(in that order)"];


//Array of all the answers
const answerOptions=[["<script>","<style>","<div>","<link>"],["}",";",":","]"],["Stores strings","Stores integers", "Stores functions","All of the above"],["alert() allows the user to input text","Prompts allows the user to input text","There is no difference","alert() can only be use in functions"],["Text value","Integer value","True/False value","Event trigger"],
 ["Event Listener","code block designed to perform a task", "True/false value", "A varible to be called apon later"],["code block designed to perform a task","list of variables","storage of multipule values","list of functions"],["for {code block}(condition)","For (code block){condition}","for (condition){code block}", "for condition {code block" ],
 ["multiple if() statements","multiple arrays[]","multiple functions()","multiple vars"],["|| && !","! && ||", "&& || !", "&& ! ||"] ];
 
 //Array of the correct Answers
 const correctAnswer=["<script>",";","All of the above","Prompts allows the user to input text", "True/False value", "code block designed to perform a task", "storage of multipule values", "for (condition){code block}", "multiple if() statements", "|| && !"];
 let userScore= 0; //Sets score value to 0 at the start of the quiz
 setQuestion(questionNumber); //Gets the current number of questionNumber, which determains what question is currently on screen.

function darkTheme(){   //Dark theme toggle
var dark = document.body;
dark.classList.toggle("dark-theme")
}

function startQuiz(){ //hides opener objects and display's question objects
    document.getElementById("opener").style.display = "none";
    document.getElementById("info").style.display= "none";
    document.getElementById("question").style.display="block";
    document.getElementById('timer').style.display="block"
    timerFun() //runs the timer function
}
function setQuestion(){ //determains what question object's value's are
    document.getElementById("a0").textContent=answerOptions[questionNumber][0];
    document.getElementById("a1").textContent=answerOptions[questionNumber][1];
    document.getElementById("a2").textContent=answerOptions[questionNumber][2];
    document.getElementById("a3").textContent=answerOptions[questionNumber][3];
    document.getElementById("question-box").textContent=questions[questionNumber];
}
function submitAnswer(x){ //pushes next question to the user and determains if the user got the correct answer
    const valueClick=x.srcElement.textContent; //sees what value the user picked
    if(valueClick===correctAnswer[questionNumber]){ //increases score
        console.log("correct");
        userScore++;
        console.log (userScore);
        document.querySelector('#score').textContent= "Score" +userScore + "/10";
    }
    else { //takes 10 secs away for getting the wrong answer
        console.log("wrong")
         timeLeft-= 10
    }
    questionNumber++; //increases questionNumber by 1 which pushed the next question/answers
    if (questionNumber===10){ //ends quiz when done
        stopTimer=true
        endQuiz()
        return
    }

    
setQuestion()
}
function endQuiz(){ //hides all objects that are not endScreen objects
    console.log("endQuiz")
    document.getElementById("opener").style.display = "none";
    document.getElementById("info").style.display= "none";
    document.getElementById('endScreen').style.display= "block"
    document.getElementById("question").style.display="none";
    document.getElementById('timer').style.display="none"
}

function subInitialsFunction(){ //saves Initials into LocalStorage
let input = document.getElementById('userInput').value;
if (input===""){
    alert("Please insert Initials")
}
else{
let savedScore = input+userScore;
console.log(savedScore.textContent)
localStorage.setItem("highScore",JSON.stringify(savedScore))
let storage=localStorage.getItem('highScore')
let newScore= document.createTextNode(storage)
var li = document.createElement("li");
li.appendChild(newScore); 
let listScore =document.getElementById('scoreList')
listScore.appendChild(li)
highScoreFunction()}
}
function highScoreFunction(){//displays highscore page
    document.getElementById("opener").style.display = "none";
    document.getElementById("info").style.display= "none";
    document.getElementById('endScreen').style.display= "none";
    document.getElementById("highscorePage").style.display="block";
}
function returnHome(){ //returns back to opner view
    document.getElementById("opener").style.display = "block";
    document.getElementById("info").style.display= "block";
    document.getElementById("highscorePage").style.display="none";
    document.getElementById("question").style.display="none";
    document.getElementById('endScreen').style.display= "none";
    userScore=0
    document.querySelector('#score').textContent="Score"
}
function timerFun(){ //timer that the quiz uses 
    let timeLeft= 120
    let stopTimer=false;
    let timer= setInterval(function(){
        timeLeft--;
        timeEl.textContent= timeLeft +"seconds left!"
        console.log(timeLeft)
        if(timeLeft <= 0){
            clearInterval(timer);
            alert("Out of Time")
            endQuiz()
            return
        }
        if(stopTimer===true){
            return
        }
    },1000);
}
