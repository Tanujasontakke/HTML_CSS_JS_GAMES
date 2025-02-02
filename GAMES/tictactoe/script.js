// unbeatable AI using the mimmax algorithm
/*
1.Basic setup
2.Determine Winner
3.Basic AI and winner notification
4.Minmax Algo 
*/ 
var origBoard;
const huPlayer = '0';
const aiPlayer = 'x';
const winCombos = [
    [0,1,2],//every array here could create a win //it's a win combo 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function turnClick(square){
    //console.log(square.target.id);
    if(typeof origBoard[square.target.id] == 'number'){
    turn(square.target.id,huPlayer);
    if(!checkTie()) turn(bestSpot(),aiPlayer);
    }
}

function startGame(){
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    //console.log(origBoard);
    for(var i=0;i < cells.length;i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    }
}
function turn(squareId,player){
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon)
}

function checkWin(board, player)
{
    let plays = board.reduce((a,e,i)=>(e === player)? a.concat(i):a,[]);
    let gameWon = null;
    for(let[index,win] of winCombos.entries()){//get the index and win through winCombos.entries
        if(win.every(elem => plays.indexOf(elem) > -1)){//to check if the player has played in every spot for a win
            gameWon = {index:index,player:player};
            break;

        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){//every index of the wincombo
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == huPlayer ? "#90EE90" : "#DC143C";//if human will background color will be blue if AI wins it will be red
    }
    for(var i=0;i<cells.length;i++)
    {
        cells[i].removeEventListener('click',turnClick,false);
    }
    declareWinner(gameWon.player == huPlayer ? "You Win!" : "You Lose!");
}

function declareWinner(who){
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return minimax(origBoard, aiPlayer).index;
}

function checkTie(){
    if(emptySquares().length == 0){
        for(var i=0;i<cells.length;i++){
            cells[i].style.backgroundColor = "#87CEFA";
            cells[i].removeEventListener('click',turnClick,false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

/*
A Minimax algorithm can be best defined as a recursive function that does the following things:
1. return a value if a terminal state is found(+10,0,-10)
2.go through available spots on the board
3.call the minimax function on each available spot(recursion)
4.evaluate returning values from function calls
5.and return the best value
positive score (+10) for a win, a negative score (-10) for a loss, or a neutral score (0) for a tie.
*/
function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}