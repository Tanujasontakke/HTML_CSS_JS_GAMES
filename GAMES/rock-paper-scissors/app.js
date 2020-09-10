let userScore = 0;
let computerScore =0;
//caching DOM elements for further use 
const userScore_span = document.getElementById("user-score");//DOM variables that hold element 
const computerScore_span = document.getElementById("computer-score");//_span because these variables are in span tag
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice(){
    const choices = ['r','p','s'];
   // console.log(Math.random());//Math built in object in js --- to get random choices defined
    //random number between 0 and 1 (never reach 1 though) so ..
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter){
     if(letter === "r") return "Rock";
     if(letter === "p") return "Paper";
     if(letter === "s") return "Scissors";

}

function win(userChoice, computerChoice){
    const smallUserWord = " user".fontsize(3).sub();
    const smallCompWord = " comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML= userScore;
    computerScore_span.innerHTML = computerScore;
    
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord}  beats  ${convertToWord(computerChoice)}${smallCompWord} You win!🔥`; //these coats used to get rid of the +(concat) and ""
    
    //if the user wins it should give that perticular div a green glow
    userChoice_div.classList.add('green-glow');//classList is a method in DOM which returns array of all the classes on that specific element
    //setTimeout() use to set time for perticular thing (appears like animation)
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 500);//500 milisec
}

function lose(userChoice, computerChoice){
    const smallUserWord = " user".fontsize(3).sub();
    const smallCompWord = " comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML= userScore;
    computerScore_span.innerHTML = computerScore;
    
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord}  loses to  ${convertToWord(computerChoice)}${smallCompWord} You lost...🤦`; //these coats used to get rid of the +(concat) and ""
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);//500 milisec

}
function draw(userChoice, computerChoice){
    
    const smallUserWord = " user".fontsize(3).sub();
    const smallCompWord = " comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord}  equals  ${convertToWord(computerChoice)}${smallCompWord} It's a draw ➖`; //these coats used to get rid of the +(concat) and ""
    userChoice_div.classList.add('blue-glow');
    setTimeout(() => userChoice_div.classList.remove('blue-glow'), 500);//single line functions can be return like this

}

function game(userChoice){ // user choice passed to game
    const computerChoice = getComputerChoice();
   switch(userChoice + computerChoice){
    case "rs":
    case "pr":
    case "sp":
        win(userChoice, computerChoice);
        break;
    case "rp":
    case "ps":
    case "sr":
        lose(userChoice, computerChoice);
        break;
    case "rr":
    case "pp":
    case "ss":
        draw(userChoice, computerChoice);
        break;
   }
}

function main(){
    rock_div.addEventListener('click', () => game("r"));
    
    paper_div.addEventListener('click', () => game("p"));
    
    scissors_div.addEventListener('click', () => game("s"));
}

main();