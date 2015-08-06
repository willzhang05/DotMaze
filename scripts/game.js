var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 150;
var ypos = 150;

window.onresize = function(e){
	var w = window.innerWidth;
	var h = window.innerHeight;
}

var renderer = PIXI.autoDetectRenderer(w, h,{backgroundColor : 0x607D8B});
renderer.view.id = "game";
document.getElementById("content").appendChild(renderer.view);
// create the root of the scene graph
var stage = new PIXI.Container();
// create a texture from an image path
var texture = PIXI.Texture.fromImage('http://i.imgur.com/pIXbZy2.png');
// create a new Sprite using the texture
var dot = new PIXI.Sprite(texture);
// center the sprite's anchor point
dot.anchor.x = 0.5;
dot.anchor.y = 0.5;
// move the sprite to the center of the screen
dot.position.x = xpos;
dot.position.y = ypos;
stage.addChild(dot);
// start animating
animate();

function animate() {
    requestAnimationFrame(animate);
    // just for fun, let's rotate mr rabbit a little
    // render the container
    renderer.render(stage);
}

window.onkeydown = function(e){
	if(e.keyCode == 65){
		xpos-=10;
	} else if (e.keyCode == 68){
		xpos+=10;
	} else if (e.keyCode == 83){
		ypos+=10;
	} else if (e.keyCode == 87){
		ypos-=10;
	}
	dot.position.x = xpos;
	dot.position.y = ypos;
}