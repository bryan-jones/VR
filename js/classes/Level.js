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
    while ( levelJSON[i] ) {
      var j = 0;
      while ( levelJSON[i][j] ) {
        // Build the walls.
        if ( levelJSON[i][j].walls.front !== null ) {
          createWall('front', levelJSON[i][j].walls.front, j, i);
        }
        if ( levelJSON[i][j].walls.back !== null ) {
          createWall('back', levelJSON[i][j].walls.back, j, i);
        }
        if ( levelJSON[i][j].walls.top !== null ) {
          createWall('top', levelJSON[i][j].walls.top, j, i);
        }
        if ( levelJSON[i][j].walls.bottom !== null ) {
          createWall('bottom', levelJSON[i][j].walls.bottom, j, i);
        }
        if ( levelJSON[i][j].walls.left !== null ) {
          createWall('left', levelJSON[i][j].walls.left, j, i);
        }
        if ( levelJSON[i][j].walls.right !== null ) {
          createWall('right', levelJSON[i][j].walls.right, j, i);
        }
        j++
      }
      i++;
    }
  });
};
