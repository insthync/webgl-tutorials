// Get A WebGL context
var gl = getContext("context");
 
// กำหนดค่าสีตอน Clear Screen (r, g, b, a)
gl.clearColor(0.0, 0.0, 0.0, 1.0);
// ใช้งาน Depth Testing ตอน Clear Screen
gl.enable(gl.DEPTH_TEST);
// กำหนดการ Clear Depth ให้สิ่งที่อยู่ใกล้บังสิ่งที่อยู่ไกล
gl.depthFunc(gl.LEQUAL);
// Clear สี และ Depth
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 
// setup a GLSL program
var program = createProgramFromScripts(gl, "vertex-shader", "fragment-shader");
gl.useProgram(program);
 
// look up where the vertex data needs to go.
var positionLocation = gl.getAttribLocation(program, "in_position");
var colorLocation = gl.getAttribLocation(program, "in_color");
gl.enableVertexAttribArray(positionLocation);
gl.enableVertexAttribArray(colorLocation);
 
var vertices = new Float32Array([
	-0.5, -0.5, 0.0,
	0.5, -0.5, 0.0,
	0.0, 0.5, 0.0
]);
var position_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
 
var colors = new Float32Array([
	1, 0, 0, 1,
	0, 1, 0, 1,
	0, 0, 1, 1
]);
var color_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
 
gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
 
gl.drawArrays(gl.TRIANGLES, 0, 3);