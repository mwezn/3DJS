
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const gridHelper = new THREE.GridHelper(200,50)
    gridHelper.position.y=-1


    import { CSS3DRenderer, CSS3DObject } from "../3DCSS.js";




const webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(webGLRenderer.domElement);

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);


function Element( id, x, y, z, ry,css,autoplay=false ) {

            const div = document.createElement( 'div' );
            const iframe = document.createElement('iframe');
            iframe.style.border = '0px';
            iframe.src = [ 'https://www.youtube.com/embed/', id, '?autoplay=1' ].join( '' );
            if (autoplay) iframe.allow='autoplay'
            css=='monitor'?div.className='css3d-object':div.className='oldtv'
            
            div.appendChild(iframe)
            //container.appendChild(div)

            const object = new CSS3DObject( div );
            object.position.set( x, y, z );
            object.rotation.y = ry;
            object.scale.set(0.01, 0.01, 0.01);
            return object;
        }

const tupac= new Element('jdWXS3BPt_0',0,0,0,0,'monitor')
const quest = new Element('jzDYPFNdI0Y',-3,0,-6,0,'oldtv')

/*const div=document.createElement('div')
const iframe = document.createElement('iframe');
//iframe.src = 'https://www.youtube.com/embed/c69-JlvNNec'; // Replace with your video URL
iframe.src='https://www.youtube.com/embed/jdWXS3BPt_0'
iframe.style.border = '0';
div.className='css3d-object'
div.appendChild(iframe)

// Wrap iframe in a CSS3DObject
const cssObject = new CSS3DObject(div);
cssObject.position.set(0, 0, 0); // Position in the 3D scene
cssObject.scale.set(0.01, 0.01, 0.01); // Scale down to fit the scene*/

scene.add(tupac,quest);




    camera.position.z=5
    
    var light = new THREE.AmbientLight(0xffffff, 5);
    scene.add(light,gridHelper);

    var light2 = new THREE.PointLight(0xffffff, 5);
    scene.add(light2);



    var controls = new OrbitControls( camera, cssRenderer.domElement );
				controls.enableZoom = true;
				controls.enablePan = true;
				controls.enableDamping = true;
				controls.rotateSpeed = 1;








    let monitor,oldset, gaming;

    var loader = new THREE.GLTFLoader()//.setPath('../monitor/');    
    // Load a glTF resource
    loader.load('../monitor/OldMonitor.gltf',function ( gltf ) {

        //monitor=gltf.scene;
        scene.add(gltf.scene);
       
    
        gltf.scene.traverse(function(child){
            console.log(child.name);
        })

        
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } );

    loader.load('../audioblend2.glb',function ( gltf ) {
        gltf.scene.rotation.y=-Math.PI/2
        scene.add( gltf.scene );
        
        
    
        gltf.scene.traverse(function(child){
            console.log(child.name);
        })

        
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } );

    loader.load('../gaming-pc/scene.gltf',function ( gltf ) {
        gaming=gltf.scene;
        gaming.position.z=-20
        gaming.position.x=20
        //gaming.rotation.y=-Math.PI/2

        scene.add( gaming );
        gltf.scene.traverse(function(child){
            console.log(child.name);
        })

        
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } );


    if (monitor) monitor.position.y+=1
    







    

    function animate() {

        //if(gaming) gaming.rotation.y+=0.01
        
        requestAnimationFrame(animate);
        webGLRenderer.render(scene, camera);
        cssRenderer.render(scene, camera);
        
    }
animate();
