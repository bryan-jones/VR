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
  camera.position.z = 50;
  camera.rotation.y = Math.PI;
  scene.add(camera);

  // Create the point of rotation for the lights.
  rotationPoint = new THREE.Object3D();
  scene.add( rotationPoint );

  // Build the renderer.
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(element);

  // Add the VR screen effect.
  effect = new THREE.StereoEffect(renderer);
  effect.eyeSeparation = 10;
  effect.setSize( window.innerWidth, window.innerHeight );

  // Build the controls.
  controls = new THREE.OrbitControls(camera, element);
  controls.enablePan = false;
  controls.enableZoom = false;

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
  var light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  scene.add(light);

  var light2 = new THREE.PointLight( 0xffffff, 2, 6000);
  light2.position.set( 0, 3000, -6000 );
  rotationPoint.add( light2 );

  var light3 = new THREE.PointLight( 0xffffee, 3, 4000, 1);
  light3.position.set( 0, 3000, -4000 );
  scene.add( light3 );

  /*var spotLight = new THREE.SpotLight( 0xffffff, 1);
  spotLight.position.set( -1200, -1480, 0 );

  spotLight.castShadow = true;

  spotLight.shadowMapWidth = 1024;
  spotLight.shadowMapHeight = 1024;

  spotLight.shadowCameraNear = 500;
  spotLight.shadowCameraFar = 4000;
  spotLight.shadowCameraFov = 30;

  scene.add( spotLight );
  */

  // Create a floor texture.
  /*createWall('front', 'wood');
  createWall('back', 'wood');
  createWall('bottom', 'stone');
  createWall('left', 'wood');
  createWall('right', 'wood');*/

  // Add a box.
  createBox(500, 500, 500, 1000, -1000, -1000, 'brick');

  // Create a level.
  var level = new Level(1);
  level.build();

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
  update();
  render();
}

function createWall(position, inTexture, inLocation) {
  inLocation = typeof inLocation !== 'undefined' ? inLocation : 0;
  var object = new Wall(position, inTexture, inLocation);
  object.build(scene);
}

function createBox( length, width, height, posX, posY, posZ, inTexture, rotateX, rotateY, rotateZ ) {
  rotateX = typeof rotateX !== 'undefined' ? rotateX : 0;
  rotateY = typeof rotateY !== 'undefined' ? rotateY : 0;
  rotateZ = typeof rotateZ !== 'undefined' ? rotateZ : 0;

  var object = new Box( length, width, height, posX, posY, posZ, inTexture, rotateX, rotateY, rotateZ );
  object.build(scene);
}
