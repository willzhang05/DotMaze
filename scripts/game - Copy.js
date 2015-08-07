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

function handleKeyDown(event)
    {
        if (event.keyCode == 65) 
                key_left = true;
        else if (event.keyCode == 68)
            key_right = true;
    }

function handleKeyUp(event){
   if (event.keyCode == 65)  [
		key_left = false;
	} else if (event.keyCode == 68){
	   key_right = false;
   } 
}

window.addEventListener('keydown', handleKeyDown, true)
window.addEventListener('keyup', handleKeyUp, true)

var maxspeed = 6;
var xforce = 0;
var pixelx = 0;
var direction = 1;
var key_left = false;
var key_right = false;

var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 125;
var ypos = 125;
var dir = 0;

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

function animate(e) {
    requestAnimationFrame(animate);
    if(e.keyCode == 65){
		xforce--;
		direction = -1;
	} else if (e.keyCode == 68){
		xforce++;
		direction = 1;
		dot.position.x += 10;
		if (xforce > maxspeed){
			xforce = maxspeed;
		} else if (xforce < -maxspeed){
			xforce = -maxspeed;
		}
        
	} else if (e.keyCode != 65 && e.keyCode !=68){
		pixelx = 0;
		xforce = 0;
	} else if (e.keyCode == 83){
		dot.position.y += 10;
	} else if (e.keyCode == 87){
		dot.position.y -= 10;
	} else {
		pixelx + xforce;
	}
	xpos = xpos + pixelx;
	dir = direction;
    renderer.render(stage);
}

