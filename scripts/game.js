var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 15;
var ypos = 15;

window.onresize = function(e){
	var w = window.innerWidth;
	var h = window.innerHeight;
}

var stage = new PIXI.Container(0xff5722);
var renderer = new PIXI.autoDetectRenderer(w, h);
document.getElementById("content").appendChild(renderer.view);

requestAnimFrame(animate);

function animate() {
	requestAnimFrame(animate);  
	renderer.render(stage);
}

window.onkeydown = function(e){
	if(e.keyCode == 65){
		xpos+=5;
	}
}