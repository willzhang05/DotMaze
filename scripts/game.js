window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.onkeydown = function(e){
	animate(e);
}

var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 125;
var ypos = 125;

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
var texture = PIXI.Texture.fromImage('http://i.imgur.com/7Z7rEev.png');
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
function animate(e) {
    requestAnimationFrame(animate);
    if(e.keyCode == 65){
		dot.position.x -= 10;
	} else if (e.keyCode == 68){
		dot.position.x += 10;
	} else if (e.keyCode == 83){
		dot.position.y += 10;
	} else if (e.keyCode == 87){
		dot.position.y -= 10;
	}
    renderer.render(stage);
}

