(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
localStorage.setItem("wasdKeys", true);
localStorage.setItem("arrowKeys", false);
localStorage.setItem("clickTap", false);
$(".pause-buttons").css("cursor", "default");
$(".pause-buttons").attr("disabled", "true");
var w = window.innerWidth,
    h = window.innerHeight;
window.onresize = function(e) {
    w = window.innerWidth;
    h = window.innerHeight;
}
var dotX = 125;
    dotY = 125;
var left;
var right;
var up;
var down;

var velX = 0,
	velY = 0,
	key = {
		left: false,
		right: false,
		up: false,
		down: false
	},
	maxSpeed = 5;



function setKeys(){
	if(localStorage.getItem("wasdKeys")){
		var left = 65,
			right = 68,
			up = 87,
			down = 83;
	} else if(localStorage.getItem("arrowKeys")){
		var left = 37,
			right = 39,
			up = 38,
			down = 40;
	}
}

var pauseActive = false;
var renderer = PIXI.autoDetectRenderer(w, h, {
    backgroundColor: 0x607D8B
});
renderer.view.id = "game";
document.getElementById("content").appendChild(renderer.view);
var stage = new PIXI.Container();
var texture = PIXI.Texture.fromImage('http://i.imgur.com/ndOOZq4.png');
var dot = new PIXI.Sprite(texture);
dot.anchor.x = 0.5;
dot.anchor.y = 0.5;
dot.position.x = dotX;
dot.position.y = dotY;
stage.addChild(dot);

window.onkeydown = function(e) {
    if (e.keyCode == 27) {
        pause();
    }
    key[e.keyCode] = true;
}
window.onkeyup = function(e) {
    key[e.keyCode] = false;
}
window.onload = function init() {
    renderer.render(stage);
}

function settingsPrompt(){
	var asdf = prompt("wasdKeys or arrowKeys");
	if(asdf === "arrowKeys"){
		localStorage.setItem("wasdKeys", false);
		localStorage.setItem("arrowKeys", true);
		localStorage.setItem("clickTap", false);
	}
	setKeys();
}

function gameLoop() {
    checkKey();
    dotX += velX;
    dotY += velY;
    velX *= 0.99;
	setKeys();
    velY *= 0.99;
    dot.position.x = dotX;
    dot.position.y = dotY;
    renderer.render(stage);
    requestAnimationFrame(gameLoop);
}

function pause() {
    if (!$("#start-button").length) {
        if (pauseActive) {
            $(".pause-buttons").css("cursor", "default");
            $(".pause-buttons").attr("disabled", "true");
            $("#pause").css("opacity", "0");
            $("#pause-wrapper").css("background-color", "rgba(0, 0, 0, 0)");
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