var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var last;
var livesCounter;
var last='./assets/img/pacright.png';

$(document).ready(function() {
	context = canvas.getContext("2d");

	$('#restart').click(function(){
		Start();
	})
	//Prevent scrolling

});

function Start() {
	livesCounter=5;

	window.addEventListener("keydown", function(e) {
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}, false);
	console.log(moveKeys)
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 150;
	var food_remain = ballsMatch;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 16; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)||
				(i == 7 && j == 2)||
				(i == 8 && j == 2)||
				(i == 9 && j == 2)||

				(i == 9 && j == 3)||
				(i == 9 && j == 4)||
				(i == 9 && j == 5)||
				(i == 9 && j == 6)||

				(i == 14 && j ==9)||
				(i == 13 && j ==9)||
				(i == 12 && j ==9)||
				(i == 11 && j ==9)||

				(i == 14 && j ==8)||
				(i == 14 && j ==7)||
				(i == 14 && j ==6)||
				(i == 14 && j ==5)||
				(i == 15 && j ==5)||

				(i == 15 && j ==1)||
				(i == 14 && j ==1)||
				(i == 13 && j ==1)||
				(i == 12 && j ==1)||

				(i == 1 && j ==9)||
				(i == 2 && j ==9)||
				(i == 3 && j ==9)||
				(i == 4 && j ==9)||
				(i == 1 && j ==8)||

				(i == 5 && j ==5)||
				(i == 6 && j ==5)||
				(i == 7 && j ==5)||
				(i == 1 && j ==0)||
				(i == 0 && j ==0)||
				(i == 0 && j ==1)||
				(i == 0 && j ==2)||

				(i == 12 && j ==2)||
				(i == 12 && j ==3)||
				(i == 12 && j ==4)||
				(i == 12 && j ==5)


			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				console.log(i);
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
			console.log(keysDown);
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 15 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 15 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[moveKeys.up]) {
		return 1;
	}
	if (keysDown[moveKeys.down]) {
		return 2;
	}
	if (keysDown[moveKeys.left]) {
		return 3;
	}
	if (keysDown[moveKeys.right]) {
		return 4;
	}
}

function Draw(x) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 30; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			
			if (board[i][j] == 2) {
				if(x==1){
				make_base(center.x,center.y,'./assets/img/pacup.png')
				}
				else if(x==2){
				make_base(center.x,center.y,'./assets/img/pacdown.png')
				}
				else if(x==3){
				make_base(center.x,center.y,'./assets/img/pacleft.png')
				}
				else if(x==4){
				make_base(center.x,center.y,'./assets/img/pacright.png')
				}
				else
				make_base(center.x,center.y,last)

	
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.strokeStyle = "#fff";
				context.strokeRect(center.x - 30, center.y - 30, 60, 60);
				context.fill();
			
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 30 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if("")
	{
		//TODO: IF YOU EAT BY MONSTER
		$("#live" +livesCounter).remove();
		livesCounter--;
	}

	if(livesCounter==0)
	{
		//TODO: GAME OVER
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(GetKeyPressed());
	}
}

function make_base(centerx,centery,url){
base_image = new Image();
base_image.src = url;
base_image.onload = function(){
context.drawImage(base_image, centerx-30, centery-30,60,60);
last=url
}
}