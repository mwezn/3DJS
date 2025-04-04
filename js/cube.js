//import { element } from "three/tsl";
import * as THREE from "../node_modules/three/build/three.module.js"

//const THREE=require('three')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

let x=document.getElementById('x')
document.getElementById('xvalue').innerHTML=x.value;


let y=document.getElementById('y')
document.getElementById('yvalue').innerHTML=y.value;

let z=document.getElementById('z')
document.getElementById('zvalue').innerHTML=z.value;
z.value=camera.position.z

const slidein=document.querySelectorAll('input')

for (let i=0;i<slidein.length;i++){
	console.log(slidein[i])
	slidein[i].addEventListener('input', ()=> {
		console.log(`You moved id ${slidein[i].id} value: ${slidein[i].value}`)
		document.getElementById(`${slidein[i].id}value`).innerHTML=slidein[i].value;
		camera.position.set(x.value,y.value,z.value)
	})
}


const geometry = new THREE.BoxGeometry( 1, 1, 1);
var purple = new THREE.MeshStandardMaterial( { color: 0x1000ff} );
var blue =  new THREE.MeshStandardMaterial( { color: 0x247aff} );
var red=  new THREE.MeshStandardMaterial( { color: 0xff0000} );
var green = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
var yellow = new THREE.MeshStandardMaterial( { color: 0xffff00} );


const edges = new THREE.EdgesGeometry( geometry ); 
const edges2 = new THREE.EdgesGeometry( geometry ); 
const edges3 = new THREE.EdgesGeometry( geometry ); 
const edges4 = new THREE.EdgesGeometry( geometry ); 

const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );
const line2 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );  
const cubelines=new THREE.LineSegments(edges2, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );
const cubelines2=new THREE.LineSegments(edges3, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );
const cubelines3=new THREE.LineSegments(edges4, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );
cubelines.position.set(1,0,0)
cubelines2.position.set(0,1,0)
cubelines3.position.set(1,1,0)

scene.add( line );
scene.add(line2)
scene.add(cubelines,cubelines2,cubelines3)

const cube = new THREE.Mesh( geometry, blue);
const cube2 = new THREE.Mesh( geometry, yellow );
const cube3 = new THREE.Mesh( geometry, red );
const cube4 = new THREE.Mesh( geometry, green );

cube2.position.set(1,0,0)
cube3.position.set(0,1,0)
cube4.position.set(1,1,0)

scene.add( cube ,cube2,cube3,cube4);



const light =new THREE.DirectionalLight(0xffffff,5)
light.position.set(2,0,2)
scene.add(light)
camera.position.z = 5;

function animate() {

	cube.rotation.x += .01;
	cube.rotation.y += .01;
	cube.rotation.z += .01;

    cube2.rotation.x += .01;
	cube2.rotation.y += .01;
	cube2.rotation.z += .01;

  cube3.rotation.x += .01;
	cube3.rotation.y += .01;
	cube3.rotation.z += .01;

  cube4.rotation.x += .01;
	cube4.rotation.y += .01;
	cube4.rotation.z += .01;

	//line.rotation.x += 0.01;
	//line.rotation.y += 0.01;
	//line.rotation.z += 0.01;

	line2.rotation.x +=.1;

	cubelines.rotation.x+=.01
	cubelines2.rotation.x+=.01
	cubelines3.rotation.x+=.01

	line2.rotation.y +=.01;
	//line2.rotation.y+=0.01;

	cubelines.rotation.y+=.01
	cubelines2.rotation.y+=.01
	cubelines3.rotation.y+=.01


  

	renderer.render( scene, camera );

}

renderer.render(scene ,camera)