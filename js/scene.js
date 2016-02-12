/**
 * @file
 * The main scene.
 */

/**
 * @file
 * The main scene.
 */

/**
 * Define constants.
 */
const IMAGE_PATH = './images/';
const TEXTURE_PATH = './assets/textures/';
const MATERIAL_PATH = './assets/materials/';
const LEVEL_PATH = './assets/levels/';

/**
 * Create the animation request.
 */
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback, element) {
      // 60 FPS
      window.setTimeout(callback, 1000 / 60);
    };
  })();
}

/**
 * Set our global variables.
 */
var camera,
    scene,
    renderer,
    effect,
    controls,
    element,
    container;
var light2,
    light3,
    light4;
var stats = new Stats();

init();
animate();

/**
 * Initializer function.
 */
function init() {
  // Build the container
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  // Create the scene.
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.00015 );

  // Create the camera.
  camera = new THREE.PerspectiveCamera(
   60, // Angle
    window.innerWidth / window.innerHeight, // Aspect Ratio.
    1, // Near view.
    10000 // Far view.
  );
  camera.position.set( 0, 35, 0 );
  camera.translateZ( 1 );
  camera.position.x = 70;
  camera.position.z = -140;
  camera.position.y = 35;
  // camera.lookAt( 140, 35, -1000 );
  scene.add( camera );

  // Create the point of rotation for the lights.
  rotationPoint = new THREE.Object3D();
  scene.add( rotationPoint );

  // Build the renderer.
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild(element);

  // Add the VR screen effect.
  effect = new THREE.StereoEffect( renderer );
  effect.setSize( window.innerWidth, window.innerHeight );
  effect.separation = 0;

  // Build the controls.
  controls = new THREE.OrbitControls( camera, element );
  //controls.enablePan = false;
  //controls.enableZoom = false;
  controls.target.copy( new THREE.Vector3( 70, 30, -140));
  // controls.set = new THREE.Vector3( 70, 30, -400 );

  function setOrientationControls(e) {
    if (!e.alpha) {
     return;
    }

    controls = new THREE.DeviceOrientationControls(camera);
    controls.connect();

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);

  // Lights
  var light = new THREE.HemisphereLight(0xffffff, 0x333333, 1);
  scene.add(light);

  var ambient = new THREE.AmbientLight( 0x888888 ); // soft white light
  scene.add( ambient );

  var light2 = new THREE.PointLight( 0xffffff, 0.5, 300);
  light2.position.set( 170, 65, -200 );
  rotationPoint.add( light2 );

  var light3 = new THREE.PointLight( 0xffffee, 0.25, 30);
  light3.position.set( 145, 60, -200 );
  scene.add( light3 );
  var light4 = new THREE.PointLight( 0xffffee, 0.25, 30);
  light4.position.set( 0, 60, 0 );
  scene.add( light4 );
  var light5 = new THREE.PointLight( 0xffffee, 0.25, 30);
  light5.position.set( 145, 60, 0 );
  scene.add( light5 );
  var light6 = new THREE.PointLight( 0xffffee, 0.25, 30);
  light6.position.set( 0, 60, -200 );
  scene.add( light6 );

  // Add a box.
  //createBox(500, 500, 500, 1000, -1000, -1000, 'brick');
  //createBox(500, 500, 500, -200, -1000, -4000, 'brick', 0, Math.PI/4);

    var mesh = null;
    var loader = new THREE.JSONLoader();
    loader.load('./assets/models/desk/desk.json', function(geometry) {

      loader2 = new THREE.TextureLoader();
      var inTexture = loader2.load( './assets/textures/wood/wood.jpg' );
      inTexture.anisotropy = renderer.getMaxAnisotropy();
      inTexture.wrapS = inTexture.wrapT = THREE.RepeatWrapping;
      inTexture.repeat.set(1, 1);

      var bump = loader2.load( './assets/textures/wood/wood_bump.jpg' );
      bump.anisotropy = renderer.getMaxAnisotropy();
      bump.wrapS = bump.wrapT = THREE.ReapeatWrapping;
      bump.repeat.set(4, 4);

      var displace = loader2.load( './assets/textures/wood/wood_disp.jpg' );
      displace.anisotropy = renderer.getMaxAnisotropy();
      displace.wrapS = displace.wrapT = THREE.ReapeatWrapping;
      displace.repeat.set(4, 4);

      material = new THREE.MeshLambertMaterial({
        color: '#ffffff',
        shininess: '20',
        specular: '#666666',
        map: inTexture,
        //displacementMap: displace,
        //bumpMap: bump
      });

      mesh = new THREE.Mesh(geometry, material);
      mesh2 = new THREE.Mesh(geometry, material);
      mesh3 = new THREE.Mesh(geometry, material);
      mesh4 = new THREE.Mesh(geometry, material);

      mesh.rotation.y = -Math.PI/2;
      mesh.position.set( -4, 1.5, -18 );
      scene.add(mesh);

      mesh2.rotation.y = -Math.PI/2;
      mesh2.position.set( 120, 1.5, -18 );
      scene.add(mesh2);

      mesh3.rotation.y = -2 *Math.PI;
      mesh3.position.set( 130, 1.5, -255 );
      scene.add(mesh3);

      mesh4.rotation.y = Math.PI/2;
      mesh4.position.set( 60, 1.5, -265 );
      scene.add(mesh4);
    });

  // Create a level.
  var level = new Level(1);
  level.build();

  // Show FPS
  stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

  // align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );

  window.addEventListener('resize', onWindowResize, false);
}

/**
 * Events to fire upon window resizing.
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Updates to apply to the scene while running.
 */
function update() {
  camera.updateProjectionMatrix();
  controls.update();
  rotationPoint.rotation.y += 0.01;
}

/**
 * Render the scene.
 */
function render() {
  effect.render(scene, camera);
}

/**
 * Animate the scene.
 */
function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  update();
  render();
  stats.end();
}

function createWall(position, inTexture, inMoveZ, inMoveX) {
  inMoveZ = typeof inMoveZ !== 'undefined' ? inMoveZ : 0;
  inMoveX = typeof inMoveX !== 'undefined' ? inMoveX : 0;
  var object = new Wall(position, inTexture, inMoveZ, inMoveX);
  object.build(scene);
}

function createBox( length, width, height, posX, posY, posZ, inTexture, rotateX, rotateY, rotateZ ) {
  rotateX = typeof rotateX !== 'undefined' ? rotateX : 0;
  rotateY = typeof rotateY !== 'undefined' ? rotateY : 0;
  rotateZ = typeof rotateZ !== 'undefined' ? rotateZ : 0;

  var object = new Box( length, width, height, posX, posY, posZ, inTexture, rotateX, rotateY, rotateZ );
  object.build(scene);
}
