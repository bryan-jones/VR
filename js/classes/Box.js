/**
 * @file
 * Defines a material complete with texture, bump maps, sizes, and shine.
 */

/**
 * Define the Box class.
 *
 * @param string position
 *   The position to use when placing the wall.
 * @param string texture
 *   The texture to be used.
 */
var Box = function( length, width, height, posX, posY, posZ, texture, rotateX, rotateY, rotateZ ) {
  this.length = length;
  this.height = height;
  this.width = width;
  this.texture = typeof texture !== 'undefined' ? texture : undefined;
  this.posX = typeof posX !== 'undefined' ? posX : 0;
  this.posY = typeof posY !== 'undefined' ? posY : 0;
  this.posZ = typeof posZ !== 'undefined' ? posZ : 0;
  this.rotateX = typeof rotateX !== 'undefined' ? rotateX : 0;
  this.rotateY = typeof rotateY !== 'undefined' ? rotateY : 0;
  this.rotateZ = typeof rotateZ !== 'undefined' ? rotateZ : 0;
};

Box.prototype.build = function(scene) {
  // Build the wall object.
  var geometry = new THREE.BoxGeometry( this.length, this.width, this.height );
  var material;

  if (typeof this.texture !== 'undefined') {
    // Load texture information.
    var materialJSON;
    var texture = this.texture;

    loadJSON(MATERIAL_PATH + this.texture + ".json", this, function(wall, response) {
      var material;
      materialJSON = JSON.parse(response);

      loader = new THREE.TextureLoader();
      var inTexture = loader.load( materialJSON.image );
      inTexture.anisotropy = renderer.getMaxAnisotropy();
      inTexture.wrapS = inTexture.wrapT = THREE.RepeatWrapping;
      inTexture.repeat.set(materialJSON.sizeX, materialJSON.sizeY);

      var bump = loader.load( materialJSON.bump );
      bump.anisotropy = renderer.getMaxAnisotropy();
      bump.wrapS = bump.wrapT = THREE.ReapeatWrapping;
      bump.repeat.set(materialJSON.sizeX, materialJSON.sizeY);

      var displace = loader.load( materialJSON.disp );
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
