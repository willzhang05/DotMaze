(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
$(".pause-buttons").css("cursor", "default");
$(".pause-buttons").attr("disabled", "true");
var w = window.innerWidth,
    h = window.innerHeight;
window.onresize = function(e) {
    var w = window.innerWidth;
    var h = window.innerHeight;
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
dot.position.x = 125;
dot.position.y = 125;
stage.addChild(dot);

var target = {x: 0, y: 0};

function getClickPosition(e) {
    var xPosition = e.clientX;
    var yPosition = e.clientY;
    
	target.x = xPosition;
    target.y = yPosition;
}
 
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
	
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

document.onclick = function(e){
	target = new PIXI.Point();
	getClickPosition(e)
}

window.onload = function init() {
    renderer.render(stage);
}

function gameLoop() {
    dot.position.x += (target.x - dot.x) * 0.1;
    dot.position.y += (target.y - dot.y) * 0.1;
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


function renderMaze() {

}