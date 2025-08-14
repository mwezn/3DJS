
import * as THREE from "../node_modules/three/build/three.module.js"
// Create the scene and a camera to view it
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
var scene = new THREE.Scene();
var scene2 = new THREE.Scene();

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

var varNames = ["plane0","plane1","plane2",
    "plane3","plane4","plane5","plane6",
    "plane7","plane8","plane9","plane10","plane11"];

var varNames2 = ["pl0","pl1","pl2",
        "pl3","pl4","pl5","pl6",
        "pl7","pl8","pl9","pl10","pl11"];
for (var i=0;i<varNames.length;i+=1){
    window[varNames[i]] = i*2
  
}

for (let i=0;i<vids.length;i++){

    const vidTexture = new THREE.VideoTexture(vids[i]);
    console.log(vids[i].videoHeight)
    console.log(vids[i].videoWidth)
    var videoMaterial =  new THREE.MeshBasicMaterial( {map: vidTexture} );
    const underClip = new THREE.BoxGeometry( 2, 2, 2);
    const twoPlane = new THREE.PlaneGeometry( vids[i].videoWidth/100, vids[i].videoHeight/100 );
    //var plane = new THREE.Mesh( twoPlane, videoMaterial);
    window[varNames[i]]=new THREE.Mesh( underClip, videoMaterial);
    window[varNames[i]].position.set(i%5-i+2,-8+i%5+i%5,-5)
    scene.add(window[varNames[i]]);
    
}

for (let i=0;i<vids.length;i++){

    const vidTexture = new THREE.VideoTexture(vids[i]);
    console.log(vids[i].videoHeight)
    console.log(vids[i].videoWidth)
    var videoMaterial =  new THREE.MeshBasicMaterial( {map: vidTexture} );
    const twoPlane = new THREE.PlaneGeometry( vids[i].videoWidth/100, vids[i].videoHeight/100 );
    //var plane = new THREE.Mesh( twoPlane, videoMaterial);
    window[varNames2[i]]=new THREE.Mesh( twoPlane, videoMaterial);
    window[varNames2[i]].position.set(-20+i*8,0,-80)
    scene.add(window[varNames2[i]]);
    
}



let line,line2,cubelines1,cubelines2,cubelines3,cubelines4,cube ,cube2,cube3,cube4

function addCubesToScene(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1);
    const underClip = new THREE.BoxGeometry( 2, 2, 2);
    var blue =  new THREE.MeshStandardMaterial( { color: 0x247aff} );
    var red=  new THREE.MeshStandardMaterial( { color: 0xff0000} );
    var green = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    var yellow = new THREE.MeshStandardMaterial( { color: 0xffff00} );


    const edges = new THREE.EdgesGeometry( geometry ); 
    const edges2 = new THREE.EdgesGeometry( geometry ); 
    const edges3 = new THREE.EdgesGeometry( geometry ); 
    const edges4 = new THREE.EdgesGeometry( geometry ); 

    var underTexture=new THREE.VideoTexture(vids[0]);
    var underworld=new THREE.MeshBasicMaterial({map: underTexture} )
//const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffff00, linewidth:2} ) );
    line = new THREE.Mesh(underClip, underworld);
 
    cubelines1 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );  
    cubelines2=new THREE.LineSegments(edges2, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );
    cubelines3=new THREE.LineSegments(edges3, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );
    cubelines4=new THREE.LineSegments(edges4, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth:3} ) );


    line.position.set(0,2,0)

    cubelines1.position.set(-1,-3,-10)
    cubelines2.position.set(0,-3,-10)
    cubelines3.position.set(-1,-2,-10)
    cubelines4.position.set(0,-2,-10)




    cube = new THREE.Mesh( geometry, blue);
    cube2 = new THREE.Mesh( geometry, yellow );
    cube3 = new THREE.Mesh( geometry, red );
    cube4 = new THREE.Mesh( geometry, green );

    cube.position.set(-1,-3,-10)
    cube2.position.set(0,-3,-10)
    cube3.position.set(-1,-2,-10)
    cube4.position.set(0,-2,-10)

    scene.add(line,line2,cubelines1,cubelines2,cubelines3,cubelines4,cube ,cube2,cube3,cube4);
}

addCubesToScene()

const size = 1000;
const divisions = 1000;
const colorCenterLine='green'
const colorGrid='green'

const gridHelper = new THREE.GridHelper( size, divisions,colorCenterLine,colorGrid );
const gridHelper2 = new THREE.GridHelper( size, divisions,colorCenterLine,colorGrid );
gridHelper.position.y=-8
gridHelper2.position.y=8
scene.add( gridHelper ,gridHelper2);



const light =new THREE.DirectionalLight(0xffffff,5)
light.position.set(0,2,5)
scene.add(light)
camera.position.z = 8;

//scene.position.set(0,0,-1)



function animate() {


    plane0.rotation.y+=0.002
    /*plane1.rotation.y+=0.002
    plane2.rotation.y+=0.002
    plane3.rotation.y+=0.002
    plane4.rotation.y+=0.002
    plane5.rotation.y+=0.002
    plane6.rotation.y+=0.002
    plane7.rotation.y+=0.002
    plane8.rotation.y+=0.002
    plane9.rotation.y+=0.002
    plane10.rotation.y+=0.002
    plane11.rotation.y+=0.002

    plane10.position.x=0
    plane10.position.y=5
    plane11.position.x=0
    plane11.position.y=3

    pl1.position.z+=0.1
    pl2.position.z+=0.1
    pl3.position.z+=0.1
    pl3.position.x=5
    pl3.position.y=8
    pl3.rotation.x=Math.PI/2

    pl2.position.y=-3

    pl4.position.x=0
    pl0.position.x=-8
    pl0.position.y=8
    pl0.position.z+=0.1
    pl0.rotation.x=Math.PI/2

    

    //scene.position.z-=0.1
    gridHelper.position.z+=0.1
    gridHelper2.position.z+=0.1*/




    /*gridHelper.rotation.z+=0.01
    gridHelper2.rotation.z+=0.01*/

    if (gridHelper.position.z>10){
        gridHelper.position.z=0
    }
    else if (gridHelper2.position.z>10){
        gridHelper2.position.z=0
    }

    

    

    
    renderer.render( scene,camera );
    
}
