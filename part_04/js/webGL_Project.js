var gl;
var program;
var positionLocation;
var texCoordLocation;
var vertices;
var position_buffer;
var texCoords;
var textCoord_buffer;
var texture;
var uniformModelMatrixLocation;
var modelMatrix;
var modelRotationY;
 
function Init()
{
    // Get A WebGL context
    gl = getContext("context");
    // กำหนดค่าสีตอน Clear Screen (r, g, b, a)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // ใช้งาน Depth Testing ตอน Clear Screen
    gl.enable(gl.DEPTH_TEST);
    // กำหนดการ Clear Depth ให้สิ่งที่อยู่ใกล้บังสิ่งที่อยู่ไกล
    gl.depthFunc(gl.LEQUAL);
 
    LoadData();
}
 
function LoadData()
{
    // setup a GLSL program
    program = createProgramFromScripts(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    // look up where the vertex data needs to go.
    positionLocation = gl.getAttribLocation(program, "in_position");
    texCoordLocation = gl.getAttribLocation(program, "in_texcoord");
    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(texCoordLocation);
 
    vertices = new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.0, 0.5, 0.0
    ]);
    position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    texCoords = new Float32Array([
        0, 1,
        1, 1,
        0.5, 0
    ]);
    textCoord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textCoord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, textCoord_buffer);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
 
    texture = gl.createTexture();
 
    // Asynchronously load an image
    var image = new Image();
    image.src = "resources/logo.png";
    image.onload = function() {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    };

    // look up where model matrix data needs to go.
    uniformModelMatrixLocation = gl.getUniformLocation(program, "modelMatrix");
    // Init matrix for model
    modelMatrix = mat4.create();
    modelRotationY = 0;
}

function Update()
{
    Draw();
    // ต้องเรียกซ้ำเพื่อให้เกิดการ Loop ไปเรื่อยๆ
    requestAnimationFrame(Update);
}
 
function Draw()
{
    // Clear ภาพในเฟรมเก่าก่อนวาดใหม่
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // Loop rotation
    modelRotationY += .1;
    mat4.fromYRotation(modelMatrix, modelRotationY);
    gl.uniformMatrix4fv(uniformModelMatrixLocation, false, modelMatrix);
}
 
Init();
Update();