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
const TEXTURE_PATH = './assets/textures/';
const LEVEL_PATH = './assets/levels/';
const MODEL_PATH = './assets/models/';

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
  //camera.position.set( 0, 50, 0 );
  camera.translateZ( 1 );
  camera.position.x = 70;
  camera.position.z = -140;
  camera.position.y = 50;
  scene.add( camera );

  // Build the renderer.
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled;
  container.appendChild(element);

  // Add the VR screen effect.
  effect = new THREE.StereoEffect( renderer );
  effect.setSize( window.innerWidth, window.innerHeight );
  effect.separation = 0;

  // Build the controls.
  controls = new THREE.OrbitControls( camera, element );
  // controls.enablePan = false;
  // controls.enableZoom = false;
  //controls.target.copy( new THREE.Vector3( 70, 50, -140 ));

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
  var light = new THREE.HemisphereLight(0xaaaaaa, 0x333333, 1);
  scene.add(light);

  var ambient = new THREE.AmbientLight( 0x888888 ); // soft white light
  scene.add( ambient );

  // Add a box.
  var plant = new VrObject( -15, 0, -60, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var plant = new VrObject( 160, 0, -60, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var plant = new VrObject( -15, 0, -290, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var plant = new VrObject( 160, 0, -290, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var desk1 = new VrObject ( -4, 1.5, -18, 0, -Math.PI/2, 0, 'wood', 'desk' );
  desk1.build();

  var desk2 = new VrObject ( 120, 1.5, -18, 0, -Math.PI/2, 0, 'wood', 'desk' );
  desk2.build();

  var desk3 = new VrObject ( 130, 1.5, -255, 0, 0, 0, 'wood', 'desk' );
  desk3.build();

  var desk4 = new VrObject ( 60, 1.5, -265, 0, Math.PI/2, 0, 'wood', 'desk' );
  desk4.build();

  var keyboard = new VrObject (2, 24, -19, 0, Math.PI/2, 0, '#555555', 'keyboard', 'color' );
  keyboard.build();

  var keyboard = new VrObject (120, 24, -19, 0, 5 * Math.PI/3, 0, '#555555', 'keyboard', 'color' );
  keyboard.build();

  var keyboard = new VrObject (53, 24, -265, 0, -Math.PI/2, 0, '#dddddd', 'keyboard', 'color' );
  keyboard.build();

  var keyboard = new VrObject (128, 24, -265, 0, 0, 0, '#555555', 'keyboard', 'color' );
  keyboard.build();

  var computerScreen = new VrObject (2, 24, -27, 0, -Math.PI/2, 0, '#555555', 'computerScreen', 'color' );
  computerScreen.build();

  var computerScreen = new VrObject (120, 24, -30, 0, 5 * Math.PI/3, 0, '#555555', 'computerScreen', 'color' );
  computerScreen.build();

  var computerScreen = new VrObject (53, 24, -255, 0, Math.PI/2, 0, '#dddddd', 'computerScreen', 'color' );
  computerScreen.build();

  var computerScreen = new VrObject (118, 24, -265, 0, 0, 0, '#555555', 'computerScreen', 'color' );
  computerScreen.build();

  var paper = new VrObject (20, 24.3, -19, 0, Math.PI/4, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (50, 0.2, -27, 0, Math.PI/4, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (50, 0.2, -24, 0, Math.PI/2, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (145, 24.3, -28, 0, Math.PI/6, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  var paperStack = new VrObject (145, 24.3, -28, 0, Math.PI/2, 0, '#dddddd', 'paperStack', 'color' );
  paperStack.build();

  paper = new VrObject (124, 24.3, -250, 0, Math.PI/2, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (118, 24.3, -240, 0, Math.PI/4, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  var trashCan = new VrObject( 60, 0, 25, 0, 0, 0, '#666666', 'trashCan', 'color' );
  trashCan.build();

  var lights = new VrObject( 17.5, 69, -35, 0, Math.PI/2, 0, 'lights', 'lights' );
  lights.build();

  lights = new VrObject( 122.5, 69, -35, 0, Math.PI/2, 0, 'lights', 'lights' );
  lights.build();

  lights = new VrObject( 17.5, 69, -245, 0, Math.PI/2, 0, 'lights', 'lights' );
  lights.build();

  lights = new VrObject( 122.5, 69, -245, 0, Math.PI/2, 0, 'lights', 'lights' );
  lights.build();


  // Create window wall surroundings.

  var geometry = new THREE.PlaneGeometry( 70, 13 );
  loader = new THREE.TextureLoader();
  var inBottom = loader.load( './assets/images/blueDryWallBottom.jpg' );
  inBottom.anisotropy = renderer.getMaxAnisotropy();
  var bottomMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: inBottom,
  });
  var mesh = new THREE.Mesh( geometry, bottomMaterial );
  mesh.position.set( 70, 6, 35 );
  mesh.rotateY(Math.PI);
  scene.add( mesh );

  var inTop = loader.load( './assets/images/blueDryWallTop.jpg' );
  inTop.anisotropy = renderer.getMaxAnisotropy();
  var material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: inTop,
  });
  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 70, 63.5, 35 );
  mesh.rotateY(Math.PI);
  scene.add( mesh );

  // Right Wall Bottom
  mesh = new THREE.Mesh ( geometry, bottomMaterial );
  mesh.position.set( 175, 6, -70 );
  mesh.rotateY(-Math.PI/2);
  scene.add( mesh );
  mesh = new THREE.Mesh ( geometry, bottomMaterial );
  mesh.position.set( 175, 6, -140 );
  mesh.rotateY(-Math.PI/2);
  scene.add( mesh );
  mesh = new THREE.Mesh ( geometry, bottomMaterial );
  mesh.position.set( 175, 6, -210 );
  mesh.rotateY(-Math.PI/2);
  scene.add( mesh );

  // Right Wall Top
  mesh = new THREE.Mesh ( geometry, bottomMaterial );
  mesh.position.set( 175, 63.5, -70 );
  mesh.rotateY(-Math.PI/2);
  scene.add( mesh );
  mesh = new THREE.Mesh ( geometry, bottomMaterial );
  mesh.position.set( 175, 63.5, -140 );
  mesh.rotateY(-Math.PI/2);
  scene.add( mesh );
  mesh = new THREE.Mesh ( geometry, bottomMaterial );
  mesh.position.set( 175, 63.5, -210 );
  mesh.rotateY(-Math.PI/2);
  scene.add( mesh );

  /*var spotlight1 = new THREE.SpotLight( 0x00ff00, 1, 0 );
  spotlight1.position.set( 15, 69, -40 );
  spotlight1.rotateX = Math.PI/4;
  spotlight1.castShadow = true;
  scene.add( spotlight1 );
  var lightTarget1 = new THREE.Object3D();
  scene.add( lightTarget1 );
  lightTarget1.position.set( spotlight1.position.x, 0, spotlight1.position.z );
  spotlight1.target = lightTarget1;*/

  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 15, 69, -40 );
  scene.add( light );
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 120, 69, -40 );
  scene.add( light );
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 0, 69, -260 );
  scene.add( light );
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 120, 69, -240 );
  scene.add( light );

  // Create a level.
  var level = new Level(1);
  level.build();

  // Show FPS
  stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

  // Add a cubemap.
  Cubemap();

  // align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';

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
