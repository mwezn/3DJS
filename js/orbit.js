
import * as THREE from "../node_modules/three/build/three.module.js"
import { FontLoader, TextGeometry } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
// Create the scene and a camera to view it
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
var scene = new THREE.Scene();


const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const text = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
  text.position.x=-100
  text.position.z=50
  scene.add(text)
} )

/**
* Camera
**/

// Specify the portion of the scene visible at any time (in degrees)
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

const texture = new THREE.TextureLoader().load( "img/stars.jpg" );
const texture2 = new THREE.TextureLoader().load( "img/Earth.jpg" );
const texture3 = new THREE.TextureLoader().load( "img/optics.jpg" );
const texture4 = new THREE.TextureLoader().load( "img/light.png" );
const texture5 = new THREE.TextureLoader().load( "img/spin.jpg" );
const sunTexture = new THREE.TextureLoader().load( "img/sun.jpg" );

texture5.wrapS = THREE.RepeatWrapping;
texture5.wrapT = THREE.RepeatWrapping;
texture5.repeat.set( 4, 4 )

let sunRadius =695700
let earthRadius=6378
let distance= 149000000


const earth = new THREE.SphereGeometry( earthRadius/10000, 30, 30 ); 
const sun = new THREE.SphereGeometry(sunRadius/10000,30,30)
const material = new THREE.MeshBasicMaterial({map: texture} ); 
const material2 = new THREE.MeshBasicMaterial({map: texture2} ); 
const material3 = new THREE.MeshBasicMaterial({map: sunTexture} ); 


//const sphere = new THREE.Mesh( geometry, material); 
const sphere2 = new THREE.Mesh( sun, material3);
const sphere3 = new THREE.Mesh( earth, material2);




scene.add(sphere2,sphere3)





const light =new THREE.DirectionalLight(0xffffff,5)
light.position.set(0,0,0)
scene.add(light)
camera.position.z = 220;


let theta=0.0;
let r=9; //radius
let earthSundist= 1490000/10000



function animate() {
    // 
    // 
    //This is called Polar coordinates for circles & rotations!!
    sphere3.position.x=earthSundist*Math.cos(theta)
    sphere3.position.y=earthSundist*Math.sin(theta)  

    //Spin the sun fast
    sphere2.rotation.y+=.01
    sphere2.rotation.x+=.01
    
    theta+=.01
    
    renderer.render( scene,camera );
    
}