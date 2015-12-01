var w = window.innerWidth;
var h = window.innerHeight;
var xpos = 15;
var ypos = 15;
var canvas = document.getElementById("game");
gl = initWebGL(canvas);      // Initialize the GL context
var gl; // A global variable for the WebGL context
function initWebGL(canvas) {
	gl = null; 
	try {
		// Try to grab the standard context. If it fails, fallback to experimental.
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e) {}
		// If we don't have a GL context, give up now
	if (!gl) {
		alert("Unable to initialize Webgl. Your browser may not support it.");
		gl = null;
	}
	return gl;
}
  var shader_vertex_source="\n\
attribute vec2 position; //the position of the point\n\
void main(void) { //pre-built function\n\
gl_Position = vec4(position, 0., 1.); //0. is the z, and 1 is w\n\
}";


  var shader_fragment_source="\n\
precision mediump float;\n\
\n\
\n\
\n\
void main(void) {\n\
gl_FragColor = vec4(0.,0.,0., 1.); //black color\n\
}";
var get_shader=function(source, type, typeString) {
var shader = gl.createShader(type);
gl.shaderSource(shader, source);
gl.compileShader(shader);
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  alert("ERROR IN "+typeString+ " SHADER : " + gl.getShaderInfoLog(shader));
  return false;
}
return shader;
};

var shader_vertex=get_shader(shader_vertex_source, gl.VERTEX_SHADER, "VERTEX");

var shader_fragment=get_shader(shader_fragment_source, gl.FRAGMENT_SHADER, "FRAGMENT");

var SHADER_PROGRAM=gl.createProgram();
gl.attachShader(SHADER_PROGRAM, shader_vertex);
gl.attachShader(SHADER_PROGRAM, shader_fragment);

gl.linkProgram(SHADER_PROGRAM);

var _position = gl.getAttribLocation(SHADER_PROGRAM, "position");

gl.enableVertexAttribArray(_position);

gl.useProgram(SHADER_PROGRAM);

var triangle_vertex=[
    -1,-1, //first summit -> bottom left of the viewport
    1,-1, //bottom right of the viewport
    1,1  //top right of the viewport
  ];

    var TRIANGLE_VERTEX= gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
    gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(triangle_vertex),
    gl.STATIC_DRAW);

 var triangle_faces = [0,1,2];
  var TRIANGLE_FACES= gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(triangle_faces),
    gl.STATIC_DRAW);
	
gl.clearColor(0.0, 0.0, 0.0, 0.0);

var animate=function() {

	gl.viewport(0.0, 0.0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);

    gl.vertexAttribPointer(_position, 2, gl.FLOAT, false,4*2,0) ;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);

	gl.flush();

	window.requestAnimationFrame(animate);
};
animate();	

window.onresize = function(e){
	var w = window.innerWidth;
	var h = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
}
	
window.onkeydown = function(e){
	if(e.keyCode == 65){
		xpos+=5;
	}
}