//import * as THREE from 'three';

import * as THREE from "../node_modules/three/build/three.module.js"

//const THREE=require('three')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


let sprite = new THREE.TextureLoader().load('./img/frames.jpg')


camera.position.z = 2;


//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const material2 = new THREE.MeshBasicMaterial({ map: sprite} );

const points = [];
points.push( new THREE.Vector3( - 1, 0, 0 ) );
points.push( new THREE.Vector3( 0, 1, 0 ) );
points.push( new THREE.Vector3( 1, 0, 0 ) );

const square =[];
square.push( new THREE.Vector3( 0, 0, 0 ) );
square.push( new THREE.Vector3( 0, 1, 0 ) );
square.push( new THREE.Vector3( 1, 1, 0 ) );
square.push( new THREE.Vector3( 1, 0, 0 ) );
square.push( new THREE.Vector3( 0, 0, 0 ) );

square.push( new THREE.Vector3( 0, 0, 0 ) );
square.push( new THREE.Vector3( 0, 1, 0 ) );
square.push( new THREE.Vector3( -1, 1, 0 ) );
square.push( new THREE.Vector3( -1, 0, 0 ) );
square.push( new THREE.Vector3( 0, 0, 0 ) );

square.push( new THREE.Vector3( 0, 0, 0 ) );
square.push( new THREE.Vector3( 0, -1, 0 ) );
square.push( new THREE.Vector3( -1, -1, 0 ) );
square.push( new THREE.Vector3( -1, 0, 0 ) );
square.push( new THREE.Vector3( 0, 0, 0 ) );
square.push( new THREE.Vector3( 0, 0, 0 ) );
square.push( new THREE.Vector3( 0, -1, 0 ) );
square.push( new THREE.Vector3( 1, -1, 0 ) );
square.push( new THREE.Vector3( 1, 0, 0 ) );
square.push( new THREE.Vector3( 0, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( square );

const line = new THREE.Line( geometry, material2 );
scene.add( line );
renderer.render( scene, camera );



function animate() {
	//line.rotation.y+=0.1
	

	renderer.render( scene, camera );

}