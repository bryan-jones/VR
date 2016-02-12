/**
 * @file
 * Defines a material complete with texture, bump maps, sizes, and shine.
 */

/**
 * Define the vrObject class.
 */
var VrObject = function( posX, posY, posZ, rotX, rotY, rotZ, texture, model, type ) {
  this.texture = texture;
  this.posX = posX;
  this.posY = posY;
  this.posZ = posZ;
  this.rotX = rotX;
  this.rotY = rotY;
  this.rotZ = rotZ;
  this.model = typeof model !== 'undefined' ? model : undefined;
  this.type = typeof type !== 'undefined' ? type : undefined;
};

/**
 * Build the object.
 */
VrObject.prototype.build = function() {

  // Check if a model is set.
  if ( typeof this.model !== 'undefined' ) {
    // Load the class to build the model. The final models may actually be many
    // individual models in one.
    var mesh = null;
    var loader = new THREE.JSONLoader();
    var object = this;
    loader.load(MODEL_PATH + this.model + '/' + this.model + '.json', function( geometry ) {
      buildObject( object.texture, object, geometry, object.type );
    });
  }
}
