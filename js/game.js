
//import * as THREE from "../node_modules/three/build/three.module.js"
import {
    OrbitControls
} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'

// Create the scene and a camera to view it
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
var scene = new THREE.Scene();

/**
* Camera
**/

// Specify the portion of the scene visiable at any time (in degrees)
var fieldOfView = 75;

// Specify the camera's aspect ratio
var aspectRatio = window.innerWidth / window.innerHeight;

// Specify the near and far clipping planes. Only objects
// between those planes will be rendered in the scene
// (these values help control the number of items rendered
// at any given time)
var nearPlane = 0.1;
var farPlane = 1000;

// Use the values specified above to create a camera
var camera = new THREE.PerspectiveCamera(
  fieldOfView, aspectRatio, nearPlane, farPlane
);

// Finally, set the camera's position in the z-dimension
camera.position.z = 3




//var vidMaterial =  new THREE.MeshBasicMaterial({color: 'blue',side: THREE.DoubleSide});
var vidMaterial= new THREE.MeshBasicMaterial({color: 'blue'});
const plane = new THREE.BoxGeometry(10, 10,10);
const blueRec=new THREE.Mesh( plane, vidMaterial);
blueRec.position.set(0,0,-80)

blueRec.geometry.computeBoundingBox();

const bluerecBB = new THREE.Box3();

scene.add(blueRec)

const size = 100000;
const divisions = 10000;
const colorCenterLine='blue'
const colorGrid='blue'

const gridHelper = new THREE.GridHelper( size, divisions,colorCenterLine,colorGrid );
const gridHelper2 = new THREE.GridHelper( size, divisions,colorCenterLine,colorGrid );
gridHelper.position.y=-8
gridHelper2.position.y=20
scene.add( gridHelper ,gridHelper2);

const texture5 = new THREE.TextureLoader().load( "./img/star.png" );
texture5.wrapS = THREE.RepeatWrapping;
texture5.wrapT = THREE.RepeatWrapping;
texture5.repeat.set( 4, 4 )

const sun = new THREE.SphereGeometry(2,30,30)


const material3 = new THREE.MeshBasicMaterial({map: texture5} );
const sphere2 = new THREE.Mesh( sun, material3);
sphere2.position.set(0,-5,-5)

sphere2.geometry.computeBoundingBox();

const sphere2BB = new THREE.Box3();
scene.add(sphere2)





const light =new THREE.DirectionalLight(0xffffff,5)
light.position.set(0,2,5)
scene.add(light)
camera.position.z = 8;

var controls;
controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', renderer.render); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
//controls.target.set(0, 0, -0.2);






let sprite = new THREE.TextureLoader().load('./img/star.png')

const material2 = new THREE.MeshBasicMaterial({map:sprite, color:0x11ddff} )
const lb= new THREE.SphereGeometry( 0.8, 30, 30 ); 
const laser = new THREE.Mesh(lb,material2)
laser.position.y=-2

laser.geometry.computeBoundingBox();

const laserBB = new THREE.Box3();

scene.add(laser)


var vector = {x: 0, y: 0, z: 0};
var vector2= {x:0, y:0, z:0}
var spinvector={x:0, y:0, z:0}

// key handler
document.onkeydown = function(e) {
    console.log(e.keyCode)
  e.preventDefault();
  if (e.keyCode === 37) {       // left
    vector.x -= 0.2;
    spinvector.z+=0.1
  }
  else if (e.keyCode === 39) {  // right
    vector.x += 0.2;
    spinvector.z-=0.1
  }
  
  else if (e.keyCode == 38){ //  Up Arrow
    //vector.z+=.5
    vector2.z-=.2
    spinvector.x-=0.1
  }
  else if (e.keyCode == 40){ //  Down Arrow
    //vector.z+=.5
    vector2.z+=.2
  }

  else if (e.keyCode == 32){  //Spacebar
    vector.z>-10?vector.z-=.5:vector.z=vector2.z
    
  }

};

document.onkeyup = function(e) {
    e.preventDefault();
    if(e.keyCode ==37){
      if(spinvector.z!==0) spinvector.z-=0.05
    }

    else if (e.keyCode === 39) {  // right
      if(spinvector.z!=0) spinvector.z+=0.05
    }

    else if (e.keyCode == 32){  //Spacebar
    
      laser.position.z = sphere2.position.z-3
      laser.position.y=-2
      vector.z+=vector2.z-3
      
    }
    else if (e.keyCode == 38){ //  Up Arrow
      if(spinvector.x!==0) spinvector.x-=0.05
      
    }
  };



  function checkCollision() {
    if (bluerecBB.intersectsBox(sphere2BB)) {
         blueRec.material.transparent = true;
         blueRec.material.opacity = 0.7;
        
         console.log(true)
    } 

    else if(laserBB.intersectsBox(bluerecBB)){
         blueRec.material.transparent = true;
         blueRec.material.opacity = 0.1;
         //blueRec.rotation.x-=Math.random()*100
         
         blueRec.position.z=sphere2.position.z-50
         
         console.log('TARGET HIT!')

    }
    
    
    else {
         blueRec.material.opacity = 1;
         
       }
  }
    
   


(function loop() {
  requestAnimationFrame(loop);
  
  sphere2BB.copy(sphere2.geometry.boundingBox ).applyMatrix4( sphere2.matrixWorld );
  bluerecBB.copy(blueRec.geometry.boundingBox ).applyMatrix4( blueRec.matrixWorld );
  laserBB.copy(laser.geometry.boundingBox ).applyMatrix4( laser.matrixWorld );
  checkCollision()
  renderer.render(scene,camera);
  sphere2.position.x += vector.x;
  sphere2.position.y += vector.y;
  sphere2.position.z+=vector2.z;
  
  sphere2.rotation.x+=spinvector.x
  sphere2.rotation.z+=spinvector.z

  scene.position.z-=vector2.z
  scene.position.x-=vector.x

  laser.position.x += vector.x;
  laser.position.y += vector.y;
  laser.position.z += vector.z-vector2.z;
  
})();
  

function animate() {
    
    renderer.render( scene,camera );
    
}