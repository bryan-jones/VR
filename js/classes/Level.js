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
var Level = function(level) {
  this.level = level;
};

Level.prototype.build = function(scene) {
  // Load the level json file.
  loadJSON(LEVEL_PATH + "level_" + this.level + ".json", this, function(level, response) {
    var levelJSON = JSON.parse(response);

    var i = 0;
    var object;
    while ( levelJSON[i] ) {
      var j = 0;
      while ( levelJSON[i][j] ) {
        // Build the walls.
        if ( levelJSON[i][j].walls.front !== null ) {
          object = new Wall('front', levelJSON[i][j].walls.front, j, i);
          object.build(scene);
        }
        if ( levelJSON[i][j].walls.back !== null ) {
          object = new Wall('back', levelJSON[i][j].walls.back, j, i);
          object.build(scene);
        }
        if ( levelJSON[i][j].walls.top !== null ) {
          object = new Wall('top', levelJSON[i][j].walls.top, j, i);
          object.build(scene);
        }
        if ( levelJSON[i][j].walls.bottom !== null ) {
          object = new Wall('bottom', levelJSON[i][j].walls.bottom, j, i);
          object.build(scene);
        }
        if ( levelJSON[i][j].walls.left !== null ) {
          object = new Wall('left', levelJSON[i][j].walls.left, j, i);
          object.build(scene);
        }
        if ( levelJSON[i][j].walls.right !== null ) {
          object = new Wall('right', levelJSON[i][j].walls.right, j, i);
          object.build(scene);
        }
        j++
      }
      i++;
    }
  });
};
