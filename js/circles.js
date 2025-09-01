//import * as THREE from "../node_modules/three/build/three.module.js"

//const THREE=require('three')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


let x=document.getElementById('x')
document.getElementById('xvalue').innerHTML=x.value;

let y=document.getElementById('y')
document.getElementById('yvalue').innerHTML=y.value;

let z=document.getElementById('z')
document.getElementById('zvalue').innerHTML=z.value;

let d=document.getElementById('d')
document.getElementById('dvalue').innerHTML=d.value;

let speed=document.getElementById('speed')
let spinrate=1
speed.addEventListener('input', function () {
    document.getElementById('svalue').innerHTML = speed.value;
    spinrate=speed.value;
    console.log(typeof(speed.value))
    
  }, false);



x.addEventListener('input', function () {
    document.getElementById('xvalue').innerHTML = x.value;
    camera.position.set(x.value,y.value,z.value)
  }, false);

y.addEventListener('input', function () {
    document.getElementById('yvalue').innerHTML = y.value;
    camera.position.set(x.value,y.value,z.value)
  }, false);

z.addEventListener('input', function () {
    document.getElementById('zvalue').innerHTML = z.value;
    camera.position.set(x.value,y.value,z.value)
  }, false);



camera.position.set(x.value,y.value,z.value)


let fractalpoints=[]
let fractalpoints2=[]

function drawBranch(x,y,angle,depth,length){
  if (depth==0) return
  const x2= x+Math.cos(angle*Math.PI/180)*length;
  const y2=y +Math.sin(angle*Math.PI/180)*length;
  fractalpoints.push(new THREE.Vector3(x,y,0) )
  fractalpoints.push(new THREE.Vector3(x2,y2,0) )
  drawBranch(x2,y2,angle-90,depth-1,length*0.7)
  drawBranch(x2,y2,angle+90,depth-1,length*0.7)

}

function drawBranch2(x,y,angle,depth,length){
  if (depth==0) return
  const x2= x+Math.cos(angle*Math.PI/180)*length;
  const y2=y +Math.sin(angle*Math.PI/180)*length;
  fractalpoints2.push(new THREE.Vector3(x,-y,0) )
  fractalpoints2.push(new THREE.Vector3(x2,-y2,0) )
  drawBranch2(x2,y2,angle-90,depth-1,length*0.7)
  drawBranch2(x2,y2,angle+90,depth-1,length*0.7)

}





let line=null
let line2=null;

function timedFractal(){
  scene.remove(line)
  document.getElementById('dvalue').innerHTML = d.value;
  //fractalpoints=[]
  drawBranch2(0,0,90,d.value,50)
  let g = new THREE.BufferGeometry().setFromPoints( fractalpoints2 );
  line = new THREE.Line( g, material );
 
  scene.add(line);
}

d.addEventListener('input', ()=> timedFractal(), false);

      

const material = new THREE.LineBasicMaterial({
	color: 0x00eeff
});



const geometry = new THREE.BufferGeometry().setFromPoints( fractalpoints );

line = new THREE.Line( geometry, material );
scene.add( line );



const tunnel = new THREE.EllipseCurve(
    0,  0,            // ax, aY
    2, 2,           // xRadius, yRadius
    0,  2*Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    Math.PI*3                 // aRotation
);

const curvePoints = tunnel.getPoints( 50 );
const curveGeo = new THREE.BufferGeometry().setFromPoints( curvePoints );

const red = new THREE.LineBasicMaterial( { color: 0xff0000 ,linewidth: 5} );
const mat3 = new THREE.LineBasicMaterial( { color: 0xff0ff ,linewidth: 5} );
const blue = new THREE.LineBasicMaterial( { color: 0x0000ff ,linewidth: 5} );
const green = new THREE.LineBasicMaterial( { color: 0x00ff00 ,linewidth: 5} );

const zoomedellipse = new THREE.Line( curveGeo, blue );
//zoomedellipse.position.z=-10
scene.add(zoomedellipse)



function animate() {
  line.rotation.z+=Number(spinrate)

    
    
    

    renderer.render( scene, camera );

}