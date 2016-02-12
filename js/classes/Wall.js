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
var Wall = function(position, texture, moveZ, moveX) {
  this.size = 70;
  this.moveZ = typeof moveZ !== 'undefined' ? moveZ : 0;
  this.moveX = typeof moveX !== 'undefined' ? moveX : 0;
  this.position = position;
  this.texture = typeof texture !== 'undefined' ? texture : undefined;

  var posX = 0;
  var posY = 0;
  var posZ = 0;
  var rotX = 0;
  var rotY = 0;
  var rotZ = 0;

  if (position == 'front') {
    var posZ = -1 * (this.size/2) - this.moveZ * this.size;
    var posX = this.moveX * this.size;
    var posY = this.size/2;
  } else if (position == 'back') {
    var posZ = this.size/2 - this.moveZ * this.size;
    var posX = this.moveX * this.size;
    var posY = this.size/2;
    var rotY = Math.PI;
  } else if (position == 'left') {
    var posX = -1 * (this.size/2) + this.moveX * this.size;
    var posZ = -1 * (this.moveZ * this.size);
    var posY = this.size/2;
    var rotY = Math.PI/2;
  } else if (position == 'right') {
    var posX = this.size/2 + this.moveX * this.size;
    var posZ = -1 * (this.moveZ * this.size);
    var posY = this.size/2;
    var rotY = -Math.PI/2;
  } else if (position == 'top') {
    var posY = this.size;
    var posZ = -1 * (this.moveZ * this.size);
    var posX = this.moveX * this.size;
    var rotX = Math.PI/2;
  } else if (position == 'bottom') {
    var posZ = -1 * (this.moveZ * this.size);
    var posX = this.moveX * this.size;
    var rotX = -Math.PI/2;
  }

  this.posX = posX;
  this.posY = posY;
  this.posZ = posZ;
  this.rotX = rotX;
  this.rotY = rotY;
  this.rotZ = rotZ;
};

Wall.prototype.build = function(scene) {
  // Build the wall object.
  var geometry = new THREE.PlaneGeometry( this.size, this.size );
  var material;

  if (typeof this.texture !== 'undefined') {
    material = buildObject(this.texture, this, geometry);
  } else {
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( this.posX, this.posY, this.posZ );
    mesh.rotation.set( this.rotX, this.rotY, this.rotZ );
    scene.add(mesh);
  }
};
