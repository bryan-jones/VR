/**
 * @file
 * Create a cubemap.
 */

/**
 * Define a Cubemap function and build a cubemap.
 */
var Cubemap = function() {
  var urlPrefix = "./assets/images/";
  var urls = [
    urlPrefix + 'right.jpg', // right
    urlPrefix + 'left.jpg', // left
    urlPrefix + 'top.jpg', // top
    urlPrefix + 'bottom.jpg', // bottom
    urlPrefix + 'front.jpg', // front
    urlPrefix + 'back.jpg', // back
  ];

  var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
  cubemap.format = THREE.RGBFormat;

  var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
  shader.uniforms['tCube'].value = cubemap; // apply textures to shader

  // create shader material
  var skyBoxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  // create skybox mesh
  var skybox = new THREE.Mesh(
    new THREE.CubeGeometry(2000, 1000, 1000),
    skyBoxMaterial
  );

  scene.add(skybox);
};
