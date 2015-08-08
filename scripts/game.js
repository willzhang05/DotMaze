(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var w = window.innerWidth,
    h = window.innerHeight;
var left = 65,
    right = 68,
    up = 83,
    down = 87;
var dotX = 125,
    dotY = 125,
    velX = 0,
    velY = 0,
    key = {
        left: false,
        right: false,
        up: false,
        down: false
    },
    maxSpeed = 5;
var renderer = PIXI.autoDetectRenderer(w, h, {
    backgroundColor: 0x607D8B
});
renderer.view.id = "game";
document.getElementById("content").appendChild(renderer.view);
var stage = new PIXI.Container();
var texture = PIXI.Texture.fromImage('http://i.imgur.com/J8xP8Ok.png');
var dot = new PIXI.Sprite(texture);
dot.anchor.x = 0.5;
dot.anchor.y = 0.5;
dot.position.x = dotX;
dot.position.y = dotY;
stage.addChild(dot);
window.onresize = function(e) {
    var w = window.innerWidth;
    var h = window.innerHeight;
}
window.onkeydown = function(e) {
    key[e.keyCode] = true;
}
window.onkeyup = function(e) {
    key[e.keyCode] = false;
}
window.onload = function init() {
    renderer.render(stage);
    gameLoop();
}
function gameLoop() {
    checkKey();
    dotX += velX;
    dotY += velY;
    dot.position.x = dotX;
    dot.position.y = dotY;
    renderer.render(stage);
    requestAnimationFrame(gameLoop);
}
function checkKey() {
    if (key[left]) {
        if (velX > -maxSpeed) {
            velX -= 0.5;
        }
    } else if (key[right]) {
        //velX = 10;
        if (velX < maxSpeed) {
            velX += 0.5;
        }
    } else if (key[up]) {
        //velY = 10;
        if (velY < maxSpeed) {
            velY += 0.5;
        }
    } else if (key[down]) {
        //velY = -10;
        if (velY > -maxSpeed) {
            velY -= 0.5;
        }
    }
}