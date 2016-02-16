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
  camera.translateZ( 1 );
  camera.position.x = 490;
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
  var plant = new VrObject( 405, 0, -60, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var plant = new VrObject( 580, 0, -60, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var plant = new VrObject( 405, 0, -290, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var plant = new VrObject( 480, 0, -290, 0, 0, 0, '#55bb55', 'tallPlant', 'color' );
  plant.build();

  var desk1 = new VrObject ( 416, 1.5, -18, 0, -Math.PI/2, 0, 'wood', 'desk' );
  desk1.build();

  var desk2 = new VrObject ( 540, 1.5, -18, 0, -Math.PI/2, 0, 'wood', 'desk' );
  desk2.build();

  var desk3 = new VrObject ( 550, 1.5, -255, 0, 0, 0, 'wood', 'desk' );
  desk3.build();

  var desk4 = new VrObject ( 480, 1.5, -265, 0, Math.PI/2, 0, 'wood', 'desk' );
  desk4.build();

  var keyboard = new VrObject (422, 24, -19, 0, Math.PI/2, 0, '#555555', 'keyboard', 'color' );
  keyboard.build();

  var keyboard = new VrObject (540, 24, -19, 0, 5 * Math.PI/3, 0, '#555555', 'keyboard', 'color' );
  keyboard.build();

  var keyboard = new VrObject (473, 24, -265, 0, -Math.PI/2, 0, '#dddddd', 'keyboard', 'color' );
  keyboard.build();

  var keyboard = new VrObject (548, 24, -265, 0, 0, 0, '#555555', 'keyboard', 'color' );
  keyboard.build();

  var computerScreen = new VrObject (422, 24, -27, 0, -Math.PI/2, 0, '#555555', 'computerScreen', 'color' );
  computerScreen.build();

  var computerScreen = new VrObject (540, 24, -30, 0, 5 * Math.PI/3, 0, '#555555', 'computerScreen', 'color' );
  computerScreen.build();

  var computerScreen = new VrObject (473, 24, -255, 0, Math.PI/2, 0, '#dddddd', 'computerScreen', 'color' );
  computerScreen.build();

  var computerScreen = new VrObject (538, 24, -265, 0, 0, 0, '#555555', 'computerScreen', 'color' );
  computerScreen.build();

  var paper = new VrObject (440, 24.3, -19, 0, Math.PI/4, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (470, 0.2, -27, 0, Math.PI/4, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (470, 0.2, -24, 0, Math.PI/2, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (565, 24.3, -28, 0, Math.PI/6, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  var paperStack = new VrObject (565, 24.3, -28, 0, Math.PI/2, 0, '#dddddd', 'paperStack', 'color' );
  paperStack.build();

  paper = new VrObject (544, 24.3, -250, 0, Math.PI/2, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  paper = new VrObject (538, 24.3, -240, 0, Math.PI/4, 0, '#dddddd', 'paper', 'color' );
  paper.build();

  var trashCan = new VrObject( 480, 0, 25, 0, 0, 0, '#666666', 'trashCan', 'color' );
  trashCan.build();

  var lightSwitch = new VrObject( 386, 32, -185, 0, 0, 0, '#eeeeee', 'lightSwitch', 'color' );
  lightSwitch.build();

  var backLeftLights = new VrObject( 437.5, 69, -35, 0, Math.PI/2, 0, 'lights', 'lights' );
  backLeftLights.build();

  backRightLights = new VrObject( 542.5, 69, -35, 0, Math.PI/2, 0, 'lights', 'lights' );
  backRightLights.build();

  frontLeftLights = new VrObject( 437.5, 69, -245, 0, Math.PI/2, 0, 'lights', 'lights' );
  frontLeftLights.build();

  frontRightLights = new VrObject( 542.5, 69, -245, 0, Math.PI/2, 0, 'lights', 'lights' );
  frontRightLights.build();

  // Create window wall surroundings.

  // Back bottom wall.
  object = new VrBasicObject( 490, 6, 35, 0, Math.PI, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();

  // Back top wall.
  object = new VrBasicObject( 490, 63.5, 35, 0, Math.PI, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();

  // Right bottom walls.
  object = new VrBasicObject( 595, 6, -70, 0, -Math.PI/2, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();
  object = new VrBasicObject( 595, 6, -140, 0, -Math.PI/2, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();
  object = new VrBasicObject( 595, 6, -210, 0, -Math.PI/2, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();

  // Right top walls.
  object = new VrBasicObject( 595, 63.5, -70, 0, -Math.PI/2, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();
  object = new VrBasicObject( 595, 63.5, -140, 0, -Math.PI/2, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();
  object = new VrBasicObject( 595, 63.5, -210, 0, -Math.PI/2, 0, 'plane', "blueDryWall", 70, 13 );
  object.build();

  // Monarch hall wall.
  object = new VrBasicObject( 381.5, 35, -175, 0, 0, 0, 'plane', 'whiteDryWall', 7.5, 70 )
  object.build();

  // Room Lights.
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 435, 69, -40 );
  scene.add( light );
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 540, 69, -40 );
  scene.add( light );
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 420, 69, -260 );
  scene.add( light );
  var light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 540, 69, -240 );
  scene.add( light );

  // Hall Lights.
  var hallLight1 = new THREE.PointLight( 0xffffcc, 3, 100 );
  hallLight1.position.set( 305, 69, -105 );
  scene.add( hallLight1 );
  var hallLight2 = new THREE.PointLight( 0xffffcc, 3, 100 );
  hallLight2.position.set( 190, 69, -210 );
  scene.add( hallLight2 );
  var hallLight3 = new THREE.PointLight( 0xffffcc, 3, 100 );
  hallLight3.position.set( 55, 69, -210 );
  scene.add( hallLight3 );

  // Create glass.
  var urlPrefix = "./assets/images/";
  var urls = [
    urlPrefix + 'right.jpg', // right
    urlPrefix + 'left.jpg', // left
    urlPrefix + 'top.jpg', // top
    urlPrefix + 'bottom.jpg', // bottom
    urlPrefix + 'front.jpg', // front
    urlPrefix + 'back.jpg', // back
  ];
  var reflectionCube = new THREE.CubeTextureLoader().load( urls );
      reflectionCube.format = THREE.RGBFormat;
  var geometry = new THREE.PlaneGeometry(70, 44);
  var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.95 } );
  var mesh = new THREE.Mesh( geometry, cubeMaterial3 );
  mesh.position.set( 490, 35, 35 );
  mesh.rotation.set ( 0, Math.PI, 0 );
  scene.add(mesh);

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
