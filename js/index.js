
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

let vids=document.querySelectorAll('video')

var varNames = ["plane0","plane1","plane2"];
for (var i=0;i<varNames.length;i+=1){
    window[varNames[i]] = i*2

  
}

console.log(window["plane0"])




for (let i=0;i<vids.length;i++){

    const vidTexture = new THREE.VideoTexture(vids[i]);
    console.log(vids[i].videoHeight)
    console.log(vids[i].videoWidth)
    var videoMaterial =  new THREE.MeshBasicMaterial( {map: vidTexture} );
    const twoPlane = new THREE.PlaneGeometry( vids[i].videoWidth/100, vids[i].videoHeight/100 );

   
   //const curvedSur= new THREE.SphereGeometry(10,10);
    //var plane = new THREE.Mesh( twoPlane, videoMaterial);
    window[varNames[i]]=new THREE.Mesh( twoPlane, videoMaterial);
    window[varNames[i]].position.set(-20*(i-1),10*(i-1),-8)
    scene.add(window[varNames[i]]);
    
}


let star;
let points = [];
let points2=[];
let points3=[];

for (let j=0;j<80000;j++){
    star= new THREE.Vector3(
        Math.random()*1600- 1300,
        Math.random()*1600- 1300,
        Math.random()*-5000- 300,
    );
    points.push(star)
}

console.log(points,points[10])

for (let j=0;j<80000;j++){
    star= new THREE.Vector3(
        Math.random()*1600- 1300,
        Math.random()*1600- 1300,
        Math.random()*-5000- 300,
    );
    points2.push(star)
    
}

for (let j=0;j<80000;j++){
    star= new THREE.Vector3(
        Math.random()*1600- 1300,
        Math.random()*1600- 1300,
        Math.random()*-5000- 300,
    );
    points3.push(star)
    
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  console.log(rgbToHex(255,255,11))



let sprite = new THREE.TextureLoader().load('../img/light.png')

let bluestarMaterial= new THREE.PointsMaterial({
    color: 0xaa55ff,
    size: 2,
    map: sprite
})

let redstarMaterial= new THREE.PointsMaterial({
    color: 0x11ff55,
    size: 4.5,
    map: sprite
})

let greenstarMaterial= new THREE.PointsMaterial({
    color: 0x55ffee,
    size: 3.85,
    map: sprite
})

const geo = new THREE.BufferGeometry().setFromPoints( points );
const geo2 = new THREE.BufferGeometry().setFromPoints( points2 );
const geo3 = new THREE.BufferGeometry().setFromPoints( points3 );

console.log(geo)
let stars= new THREE.Points(geo,bluestarMaterial)
let rstars= new THREE.Points(geo2,redstarMaterial)
let gstars= new THREE.Points(geo3,greenstarMaterial)
scene.add(stars,rstars,gstars)

/*var obj, i;
for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
    obj = scene.children[ i ];
    if ( obj !== plane0 && obj !== camera) {
        scene.remove(obj);
    }
}*/
var controls;
controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', renderer.render); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
//controls.target.set(0, 0, -0.2);




const light =new THREE.DirectionalLight(0xffffff,5)
light.position.set(0,2,5)
scene.add(light)
camera.position.z = 30;
controls.update()


plane0.position.z=-20
plane0.position.x=0
    



function animate() {
    
    stars.position.z+=10
    rstars.position.z+=9
    gstars.position.z+=10

    if(stars.position.z==1000) stars.position.z=0;
     if(gstars.position.z==1000) gstars.position.z=-500;
    

    

    //controls.update();



    
    renderer.render( scene,camera );
    
}
