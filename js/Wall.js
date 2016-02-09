/**
 * @file
 * Defines a material complete with texture, bump maps, sizes, and shine.
 */

/**
 * Define the Material class.
 *
 * @param string position
 *   The position to use when placing the wall.
 * @param string texture
 *   The texture to be used.
 */
var Wall = function(position, texture) {
  this.height = 3000;
  this.width = 3000;
  this.position = position;
  this.texture = typeof texture !== 'undefined' ? texture : undefined;

  var posX = 0;
  var posY = 0;
  var posZ = 0;
  var rotateX = 0;
  var rotateY = 0;
  var rotateZ = 0;

  if (position == 'front') {
    var posZ = -1500;
  } else if (position == 'back') {
    var posZ = 1500;
    var rotateY = Math.PI;
  } else if (position == 'left') {
    var posX = -1500;
    var rotateY = Math.PI/2;
  } else if (position == 'right') {
    var posX = 1500;
    var rotateY = -Math.PI/2;
  } else if (position == 'top') {
    var posY = 1500;
    var rotateX = Math.PI/2;
  } else if (position == 'bottom') {
    var posY = -1500;
    var rotateX = -Math.PI/2;
  }

  this.posX = posX;
  this.posY = posY;
  this.posZ = posZ;
  this.rotateX = rotateX;
  this.rotateY = rotateY;
  this.rotateZ = rotateZ;
};

Wall.prototype.build = function(scene) {
  // Build the wall object.
  var geometry = new THREE.PlaneGeometry( this.height, this.width );
  var material;

  if (typeof this.texture !== 'undefined') {
    // Load texture information.
    var materialJSON;
    var texture = this.texture;

    loadJSON("./materials/" + this.texture + ".json", this, function(wall, response) {
      var material;
      materialJSON = JSON.parse(response);

      loader = new THREE.TextureLoader();
      var inTexture = loader.load( TEXTURE_PATH + wall.texture + '/' + wall.texture + '.jpg');
      inTexture.anisotropy = renderer.getMaxAnisotropy();
      inTexture.wrapS = inTexture.wrapT = THREE.RepeatWrapping;
      inTexture.repeat.set(materialJSON.sizeX, materialJSON.sizeY);

      var bump = loader.load( TEXTURE_PATH + wall.texture + '/' + wall.texture + '_bump.jpg' );
      bump.anisotropy = renderer.getMaxAnisotropy();
      bump.wrapS = bump.wrapT = THREE.ReapeatWrapping;
      bump.repeat.set(materialJSON.sizeX, materialJSON.sizeY);

      var displace = loader.load( TEXTURE_PATH + wall.texture + '/' + wall.texture + '_disp.jpg' );
      displace.anisotropy = renderer.getMaxAnisotropy();
      displace.wrapS = displace.wrapT = THREE.ReapeatWrapping;
      displace.repeat.set(materialJSON.sizeX, materialJSON.sizeY);

      material = new THREE.MeshPhongMaterial({
        color: materialJSON.color,
        shininess: materialJSON.shininess,
        specular: materialJSON.specular,
        map: inTexture,
        displacementMap: displace,
        bumpMap: bump
      });

      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( wall.posX, wall.posY, wall.posZ );
      mesh.rotation.set( wall.rotateX, wall.rotateY, wall.rotateZ );
      scene.add(mesh);
    });
  } else {
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( this.posX, this.posY, this.posZ );
    mesh.rotation.set( this.rotateX, this.rotateY, this.rotateZ );
    scene.add(mesh);
  }
};
