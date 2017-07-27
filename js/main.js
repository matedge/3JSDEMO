
var app = app || {};

app.init = function(){
  console.log('Hello My World');

  app.scene = new THREE.Scene();

  app.width  = window.innerWidth;
  app.height = window.innerHeight;

  // 4 params:
  // field of view (FOV)
  // screen ratio
  // near field: how close to render things
  // far field:  how far to render thiings
  app.camera = new THREE.PerspectiveCamera(
    60, // FOV
    app.width / app.height, // screen ratio
    0.1, // near field
    1000 // far field
  );

  // Position our camera somewhere in the scene; it has a perspective
  app.camera.position.x = -30;
  app.camera.position.y = 40;
  app.camera.position.z = 30;
  // Tell the camera where its looking - at the center of the scene, the origin (0, 0, 0)
  app.camera.lookAt( app.scene.position );

  // The renderer calculates how the canvas/browser will see these elements, based on the camera position.
  // It also defines how it will do the rendering calculation under the hood, i.e. WebGL
  // hardware acceleration or fallback to a software renderer
  app.renderer = new THREE.WebGLRenderer();
  // set the size
  app.renderer.setSize( app.width, app.height );
  app.renderer.setClearColor( 0x000000 ); // background colour
  app.renderer.shadowMap.enabled = true; // shadows are computationally expensive, so disabled by default
  app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  app.axes = new THREE.AxisHelper( 40 );
  app.scene.add( app.axes );

  app.plane = app.createPlane()
  app.scene.add( app.plane )

  app.spotlight = app.createSpotLight();
  app.scene.add( app.spotlight)








  // Attach the canvas element created by the renderer onto the page
  document.getElementById("output").appendChild( app.renderer.domElement );

  // Actually draw something
  app.renderer.render( app.scene, app.camera );

}; // app.init

app.createSpotLight = function(){

  var spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( -10, 60, 10);
  spotlight.castShadow = true
  spotlight.shadow.mapSize.width = 2048
  spotlight.shadow.mapSize.height = 2048

  return spotlight

}

app.createPlane = function(){
  var planeGeometry = new THREE.PlaneGeometry( 120, 20)
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xCFD8DB
  });

  //combine
  var plane = new THREE.Mesh( planeGeometry, planeMaterial)
  plane.position.x = 15
  plane.position.y = 0
  plane.position.z = 0
  plane.rotation.x = -0.5 * Math.PI; // don't ask
  plane.recieveShadow = true;

  return plane;

};

window.onload = app.init;  // no jQuery today, but this is basically $(document).ready(function(){ ... })
