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
  camera.position.set( 0, 35, 0 );
  camera.translateZ( 1 );
  camera.position.x = 70;
  camera.position.z = -140;
  camera.position.y = 35;
  scene.add( camera );

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
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.target.copy( new THREE.Vector3( 70, 50, -140));

  function setOrientationControls(e) {
    if (!e.alpha) {
     return;
    }

    controls = new THREE.DeviceOrientationControls(camera);
    controls.connect();

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);

  document.addEventListener( 'mousedown', magnetDetected, false );

  // Lights
  var light = new THREE.HemisphereLight(0xffffff, 0x333333, 1);
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

  // Create a level.
  var level = new Level(1);
  level.build();

  // Show FPS
  stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

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

function magnetDetected(e) {
  // Get the current camera position and add 20 to the z axis.
  if (camera.position.z < 0 ) {
    controls.target.copy( new THREE.Vector3( 70, 50, camera.position.z + 20));
    camera.position.z += 20;
  }
}
