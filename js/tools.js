/**
 * @file
 * Helper function to make things a little easier.
 */

function loadJSON(file, object, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value
      // but simply returns undefined in asynchronous mode.
      callback(object, xobj.responseText);
    }
  };
  xobj.send(null);
}

/**
 * Load a material based off of the texture name given.
 */
function buildObject( texture, object, geometry, type ) {
  if ( typeof type === "undefined" ) {
    // Load texture information.
    var materialJSON;
    loadJSON(TEXTURE_PATH + texture + "/" + texture + ".json", object, function( object, response ) {

      materialJSON = JSON.parse( response );

      loader = new THREE.TextureLoader();
      var inTexture = loader.load( materialJSON.image );
      inTexture.anisotropy = renderer.getMaxAnisotropy();
      inTexture.wrapS = inTexture.wrapT = THREE.RepeatWrapping;
      inTexture.repeat.set( materialJSON.sizeX, materialJSON.sizeY );

      var bump = null;
      if ( typeof materialJSON.bump !== 'undefined' ) {
        bump = loader.load( materialJSON.bump );
        bump.anisotropy = renderer.getMaxAnisotropy();
        bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
        bump.repeat.set( materialJSON.sizeX, materialJSON.sizeY );
      }

      var displace = null;
      if ( typeof materialJSON.disp !== 'undefined' ) {
        displace = loader.load( materialJSON.disp );
        displace.anisotropy = renderer.getMaxAnisotropy();
        displace.wrapS = displace.wrapT = THREE.RepeatWrapping;
        displace.repeat.set( materialJSON.sizeX, materialJSON.sizeY );
      }

      var material = new THREE.MeshLambertMaterial({
        color: materialJSON.color,
        //shininess: parseInt(materialJSON.shininess),
        //specular: materialJSON.specular,
        map: inTexture,
        //displacementMap: displace,
        //bumpMap: bump,
        //bumpScale: typeof materialJSON.bumpScale !== 'undefined' ? materialJSON.bumpScale : 0.10,
        //shading: typeof materialJSON.shading !== 'undefined' ? materialJSON.shading : THREE.SmoothShading
        emissive: typeof materialJSON.emissive !== 'undefined' ? materialJSON.emissive : '#000000'
      });

      var mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( object.posX, object.posY, object.posZ );
      mesh.rotation.set( object.rotX, object.rotY, object.rotZ );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add(mesh);
    });
  }
  else {
    // Treat the texture as a color.
    var material = new THREE.MeshLambertMaterial({
      color: texture,
    });

    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( object.posX, object.posY, object.posZ );
    mesh.rotation.set( object.rotX, object.rotY, object.rotZ );
    scene.add(mesh);
  }
}
