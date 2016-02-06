/**
 * @file
 * The main scene.
 */

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
    container,
    rotationPoint;
var light2,
    light3,
    light4;
var clock = new THREE.Clock();

/**
 * Initializer function.
 */
function init() {

  // Build the container
  container = document.getElementById('container');

  // Create the scene.
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.003 );

  // Create the point of rotation for the lights.
  rotationPoint = new THREE.Object3D();
  scene.add( rotationPoint );

  // Create the camera.
  camera = new THREE.PerspectiveCamera(
    45, // Angle
    window.innerWidth / window.innerHeight, // Aspect Ratio.
    1, // Near view.
    700 // Far view.
  );
  camera.position.set(-50, 170, 200);
  rotationPoint.add(camera);

  // Build the renderer.
  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(element);

  // Add the VR screen effect.
  effect = new THREE.StereoEffect(renderer);

  // Build the controls.
  controls = new THREE.OrbitControls(camera, element);
  /*controls.target.set(
    camera.position.x,
    camera.position.y,
    camera.position.z
  );*/
  controls.enablePan = false;
  controls.enableZoom = false;

  function setOrientationControls(e) {
    if (!e.alpha) {
     return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    element.addEventListener('click', fullscreen, false);

    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }
  window.addEventListener('deviceorientation', setOrientationControls, true);

  // Create a sphere.
  var filePath = './images/textures/brick/brick.jpg';
  var loader = new THREE.TextureLoader();
  loader.load( filePath, function( texture ) {
    texture.anisotropy = renderer.getMaxAnisotropy();
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);

    var bump = loader.load( "./images/textures/brick/brick_bump.jpg");
    bump.anisotropy = renderer.getMaxAnisotropy();
    bump.wrapS = bump.wrapT = THREE.ReapeatWrapping;
    bump.repeat.set(8, 8);

    var displace = loader.load( "./images/textures/brick/brick_disp.jpg");
    displace.anisotropy = renderer.getMaxAnisotropy();
    displace.wrapS = displace.wrapT = THREE.ReapeatWrapping;
    displace.repeat.set(8, 8);

    // Create the floor object.
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x333333,
      map: texture,
      displacementMap: displace,
      bumpMap: bump
    });
    var geometry = new THREE.SphereGeometry(45, 32, 32);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 15, 0);
    cube.rotation.z = Math.PI / 2;
    scene.add(cube);

  }, function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },
  function (xhr) {
    console.log( 'An error has occured loading ' + filePath );
  });

  // Lights
  var light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  scene.add(light);

  light2 = new THREE.PointLight(0xff0000, 2, 100);
  light2.position.set(50, 50, 50);
  light2.rotation.y = 0;
  //rotationPoint.add(light2);
  scene.add(light2)

  light3 = new THREE.PointLight(0x00ff00, 2, 100);
  light3.position.set(-50, 50, 50);
  light3.rotation.y = 2 * Math.PI / 3;
  //rotationPoint.add(light3);
  scene.add(light3)

  light4 = new THREE.PointLight(0xffffff, 2, 100);
  light4.position.set(0, 50, -50);
  light2.rotation.y = 4 * Math.PI/ 3;
  //rotationPoint.add(light4);
  scene.add(light4)

  // Create a floor texture.
  filePath = './images/textures/wood/wood.jpg';
  loader = new THREE.TextureLoader();
  loader.load( filePath, function( texture ) {
    texture.anisotropy = renderer.getMaxAnisotropy();
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(64, 64);

    var bump = loader.load( "./images/textures/wood/wood_bump.jpg");
    bump.anisotropy = renderer.getMaxAnisotropy();
    bump.wrapS = bump.wrapT = THREE.ReapeatWrapping;
    bump.repeat.set(8, 8);

    var displace = loader.load( "./images/textures/wood/wood_disp.jpg");
    displace.anisotropy = renderer.getMaxAnisotropy();
    displace.wrapS = displace.wrapT = THREE.ReapeatWrapping;
    displace.repeat.set(4, 4);

    // Create the floor object.
    var geometry = new THREE.PlaneGeometry(1000, 1000);
    var material = new THREE.MeshPhongMaterial({
      shininess: 50,
      specular: 0x666666,
      map: texture,
      displacementMap: displace,
      bumpMap: bump
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

  }, function ( xhr ) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },
  function (xhr) {
    console.log( 'An error has occured loading ' + filePath );
  });


  window.addEventListener('resize', onWindowResize, false);
  setTimeout(onWindowResize, 1);
}

/**
 * Events to fire upon window resizing.
 */
function onWindowResize() {
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

/**
 * Updates to apply to the scene while running.
 */
function update(dt) {
  camera.updateProjectionMatrix();
  controls.update(dt);
  if (camera.position.y < 10) {
    camera.position.y = 10;
  }
}

/**
 * Render the scene.
 */
function render(dt) {
  rotationPoint.rotation.y += 0.01;
  effect.render(scene, camera);
}

/**
 * Animate the scene.
 */
function animate(t) {
  requestAnimationFrame(animate);

  update(clock.getDelta());
  render(clock.getDelta());
}

/**
 * Fullscreen manipulation per browser.
 */
function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

init();
animate();
