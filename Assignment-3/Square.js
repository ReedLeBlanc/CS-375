/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        // Front face
        -1.0, -1.0,  1.0,  // Vertex 0
         1.0, -1.0,  1.0,  // Vertex 1
         1.0,  1.0,  1.0,  // Vertex 2
        -1.0,  1.0,  1.0,  // Vertex 3

        // Back face
        -1.0, -1.0, -1.0,  // Vertex 4
         1.0, -1.0, -1.0,  // Vertex 5
         1.0,  1.0, -1.0,  // Vertex 6
        -1.0,  1.0, -1.0,  // Vertex 7

        // Top face
        -1.0,  1.0,  1.0,  // Vertex 8
         1.0,  1.0,  1.0,  // Vertex 9
         1.0,  1.0, -1.0,  // Vertex 10
        -1.0,  1.0, -1.0,  // Vertex 11

        // Bottom face
        -1.0, -1.0,  1.0,  // Vertex 12
         1.0, -1.0,  1.0,  // Vertex 13
         1.0, -1.0, -1.0,  // Vertex 14
        -1.0, -1.0, -1.0,  // Vertex 15

        // Right face
         1.0, -1.0,  1.0,  // Vertex 16
         1.0, -1.0, -1.0,  // Vertex 17
         1.0,  1.0, -1.0,  // Vertex 18
         1.0,  1.0,  1.0,  // Vertex 19

        // Left face
        -1.0, -1.0,  1.0,  // Vertex 20
        -1.0,  1.0,  1.0,  // Vertex 21
        -1.0,  1.0, -1.0,  // Vertex 22
        -1.0, -1.0, -1.0   // Vertex 23
    ];

    let indices = [
        0,  1,  2,      0,  2,  3,    // Front face
        4,  5,  6,      4,  6,  7,    // Back face
        8,  9,  10,     8,  10, 11,   // Top face
        12, 13, 14,     12, 14, 15,   // Bottom face
        16, 17, 18,     16, 18, 19,   // Right face
        20, 21, 22,     20, 22, 23    // Left face
    ];

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
	    "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");
	

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    
    };
};
