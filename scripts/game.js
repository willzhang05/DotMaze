"use strict";
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var w = window.innerWidth,
    h = window.innerHeight;
var left = 65,
    right = 68,
    up = 87,
    down = 83,
	esc = 27;
var dotX = 0,
    dotY = 10,
	dotW = $("#game").attr("width")/30,
	dotH = $("#game").attr("width")/30,
    velX = 0,
    velY = 0,
    key = {
        left: false,
        right: false,
        up: false,
        down: false,
		esc: false
    },
    maxSpeed = 5;
var pauseActive = false;
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var dot = new Image();

window.onresize = function(e) {
    var w = window.innerWidth;
    var h = window.innerHeight;
}
window.onkeydown = function(e) {
    key[e.keyCode] = true;
	if (key[esc]) {
		pause();
	}
}
window.onkeyup = function(e) {
	key[e.keyCode] = false;
}
window.onload = function init() {
    
}

function start(){
	dot.onload = function(){
		context.drawImage(dot, dotX, dotY, dotW, dotH);
	}
	dot.src = "../images/sprite-fullsize.png"
	gameLoop();
}

function resume(){
	$(".pause-buttons").css("cursor", "default");
	$(".pause-buttons").attr("disabled", "true");
	$("#pause").css("opacity", "0");
	$("#pause-wrapper").css("background-color", "rgba(0, 0, 0, 0)");
}

function gameLoop() {
    checkKey();
    dotX += velX;
    dotY += velY;
    velX *= 0.99;
    velY *= 0.99;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(dot, dotX, dotY, dotW, dotH);
    requestAnimationFrame(gameLoop);
}

function pause() {
    if (!$("#start-button").length) {
        if (pauseActive) {
            resume();
        } else if (!pauseActive) {
            $(".pause-buttons").css("cursor", "pointer");
            $(".pause-buttons").removeAttr("disabled");
            $("#pause").css("opacity", "1");
            $("#pause-wrapper").css("background-color", "rgba(0, 0, 0, 0.5)");
        }
		pauseActive = !pauseActive;
    }
}

function checkKey() {
    if (key[left]) {
        if (velX > -maxSpeed) {
            velX -= 0.5;
        }
    }
    if (key[right]) {
        //velX = 10;
        if (velX < maxSpeed) {
            velX += 0.5;
        }
    }
    if (key[up]) {
        //velY = -10;
        if (velY > -maxSpeed) {
            velY -= 0.5;
        }
    }
    if (key[down]) {
        //velY = 10;
        if (velY < maxSpeed) {
            velY += 0.5;
        }
    }
}

function renderMaze() {

}