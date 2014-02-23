var nrow = 9;
var ncol = 6;
var turn = 1;
var clicks = 0;
var numberOfPlayers = 3;
var board = new Array(nrow);
var player = new Array(nrow);
var updated = new Array(nrow);
var laststate = new Array(nrow);

for (var i = 0; i < nrow; i++) 
{
	board[i] = new Array(ncol);
	player[i] = new Array(ncol);
	updated[i] = new Array(ncol);
	laststate[i] = new Array(ncol);
}

for (var i = 0; i < nrow; i++)
{
	for (var j = 0; j < ncol; j++)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		updated[i][j] = 0;
		laststate[i][j] = 0;
	}
}

function didWin()
{
var found = new Array();
for(var i = 0; i <= numberOfPlayers ; i ++) found[i] = false;

	for (var i = 0; i < nrow; i++)
	{
		for (var j = 0; j < ncol; j++)
		{
			found[player[i][j]] = true;
		}
	}

var win = 0, count = 0;
for(var i = 1; i <= numberOfPlayers ; i ++) {
	if(found[i]) {
		count++;
		win = i;
	}
}
	if(count == 1) winner(win);
	else return 0;
}

function incrementor (i,j){
	for (var a = 0; a < nrow; a++){
		for (var b = 0; b < ncol; b++){
			updated[a][b] = 0;
			laststate[a][b] = board[a][b];
		}
	}

	if ((player[i][j] == turn) || (player[i][j] == 0)){
		increment(i,j);
		changeTurn();
		clicks++;
		if (clicks >= 2) didWin();
	}
	else return;
}

function activateRotate(){
	for (var i = 0; i < nrow; i++){
		for (var j = 0; j < ncol; j++){
			if(updated[i][j] == 1 && laststate[i][j] != 0)
				$('#svg-' + cellId(i,j) + '-' + laststate[i][j]).remove();

			if(updated[i][j] == 1 && player[i][j] != 0){
				updateCell(i, j, board[i][j]);
				if(laststate[i][j] != board[i][j])
					rotateAround('svg-' + cellId(i,j) + '-' + board[i][j],0,3,1);
	}}}
}

function changeTurn(){
	activateRotate();
	if (turn != numberOfPlayers) turn++;
	else if (turn == numberOfPlayers) turn = 1;
	updateTurnColor();
}

function getTurn(){
	return turn;
}

function increment (i, j) {
	updated[i][j] = 1;
	player[i][j] = turn;
	if ((i == 0 && j == 0) || (i == 0 && j == (ncol - 1)) || (i == (nrow - 1) && j == 0) || (i == (nrow - 1) && j == (ncol - 1)))
	{
		if (board[i][j] == 1) 
			{
				sleep(100);
				blast(i,j);
			}
		else board[i][j] = 1;
	}
	else if (j == 0 || i == 0 || j == (ncol - 1) || i == (nrow - 1))  
	{
		if (board[i][j] == 2)
		{
			sleep(100); 
			blast(i,j);
		}
		else board[i][j]++;
	}
	else
	{
		if (board[i][j] == 3)
		{
			sleep(100);
			blast(i,j);
		}
		else board[i][j]++;	
	}
	
}

function sleep(ms) {
    var time = new Date();
    time.setTime(time.getTime() + ms);
    while (new Date().getTime() < time.getTime()) {}
}

function getPlayer (i, j) {
	return player[i][j]
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

function blast (i,j) {

	// setTimeout(function(){
	document.getElementById(cellId(i,j)).style.backgroundColor='rgb(30,30,30)';
	document.getElementById(cellId(i+1,j)).style.backgroundColor='rgb(60,60,60)';
	document.getElementById(cellId(i,j+1)).style.backgroundColor='rgb(60,60,60)';
	document.getElementById(cellId(i-1,j)).style.backgroundColor='rgb(60,60,60)';
	document.getElementById(cellId(i,j-1)).style.backgroundColor='rgb(60,60,60)';
	
	if (i == 0 && j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment(0,1);
		increment(1,0);
	}
	else if (i == 0 && j == (ncol - 1))
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment(0,(ncol - 2));
		increment(1,(ncol - 1));
	}
	else if (i == (nrow - 1) && j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((nrow - 1),1);
		increment((nrow - 2),0);
	}
	else if (i == (nrow - 1) && j == (ncol - 1))
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((nrow - 1), (ncol - 2));
		increment((nrow - 2), (ncol - 1));
	}
	//Side elements
	else if (i == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i + 1), j);
		increment(i, (j + 1));
		increment(i, (j - 1));
	}
	else if (i == (nrow - 1))
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i - 1), j);
		increment(i, (j + 1));
		increment(i, (j - 1));
	}
	else if (j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i + 1), j);
		increment(i, (j + 1));
		increment((i - 1), j);
	}
	else if (j == 0)
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment((i + 1), j);
		increment(i, (j - 1));
		increment((i - 1), j);
	}
	//All others
	else
	{
		board[i][j] = 0;
		player[i][j] = 0;
		increment(i, (j - 1));
		increment((i + 1), j);
		increment(i, (j + 1));
		increment((i - 1), j);
	}
}