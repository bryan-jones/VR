/**
 * @file
 * Defines a material complete with texture, bump maps, sizes, and shine.
 */

/**
 * Define the vrObject class.
 */
var VrBasicObject = function( posX, posY, posZ, rotX, rotY, rotZ, geometry, texture, sizeX, sizeY, sizeZ ) {
  this.sizeZ = typeof model !== 'undefined' ? model : 0;
  this.posX = posX;
  this.posY = posY;
  this.posZ = posZ;
  this.rotX = rotX;
  this.rotY = rotY;
  this.rotZ = rotZ;
  this.geometry = geometry;
  this.texture = texture;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
};

VrBasicObject.prototype.build = function() {
  // Load the class to build the model. The final models may actually be many
  // individual models in one.
  var geometry;
  if (this.geometry == 'plane') {
    geometry = new THREE.PlaneGeometry( this.sizeX, this.sizeY );
  }
  else if (this.geometry == 'cube') {
    geometry = new THREE.BoxGeometry( this.sizeX, this.sizeY, this.sizeZ );
  }
  else if (this.geometry == 'sphere') {
    geometry = new THREE.SphereGeometry( this.sizeX, this.sizeY, this.sizeZ );
  }
  buildObject( this.texture, this, geometry );
}
