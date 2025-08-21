
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const gridHelper = new THREE.GridHelper(200,50)
    gridHelper.position.y=-1

    const listener = new THREE.AudioListener();
    camera.add(listener)

    // create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../keypress.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	//sound.setLoop(true);
	sound.setVolume(0.5);
	
});

    const space= new THREE.TextureLoader().load('../img/meta.jpg')
    //scene.background=space;


    import { CSS3DRenderer, CSS3DObject } from "../3DCSS.js";




const webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(webGLRenderer.domElement);

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);





    camera.position.set(10,3,0)
    
    var light = new THREE.AmbientLight(0xffffff, 5);
    scene.add(light,gridHelper);

    var light2 = new THREE.PointLight(0xffffff, 5);
    scene.add(light2);



    var controls = new OrbitControls( camera, cssRenderer.domElement );
                controls.enableZoom = true;
                controls.enablePan = true;
                controls.enableDamping = true;
                controls.rotateSpeed = 1;








    let monitor, keyboard,mixer, clock,keypress,anim

    var loader = new THREE.GLTFLoader()//.setPath('../monitor/');    
    // Load a glTF resource
   /* loader.load('../rgbkeyboard.glb',function ( gltf ) {

        monitor=gltf.scene;
        scene.add(monitor);
        /*gltf.scene.traverse(function(child){
            console.log(child.name);
        })

        
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } ); */

    loader.load('../RGB/edit.glb',function ( gltf ) {
        keypress=gltf.animations
        keyboard=gltf.scene;
        keyboard.position.x=0;
        keyboard.position.set(0,0,0)
        keyboard.scale.set(10,10,10)
        scene.add(keyboard);

     /*  mixer = new THREE.AnimationMixer(keyboard);
                keypress.forEach((clip,i) => {
                    console.log(clip,i)
                    mixer.clipAction(clip).play();
        }); */

        
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } );

    document.addEventListener('keydown', (event) => {

        sound.play();
        anim = new THREE.AnimationMixer(keyboard);
        let action,action2
    if (!keyboard) return; // Ensure model is loaded
    if(!keypress) return
    switch (event.key) {
        case 'ArrowUp': // Move forward
            keyboard.position.z -= 0.1;
            console.log('UP PRESSED')
            break;
        case 'ArrowDown': // Move backward
            //keyboard.position.z += 0.1;
            //keyboard.rotation.y += 0.1;
            break
        case 's': // Move backward
            //keyboard.position.z += 0.1;
            //keyboard.rotation.y += 0.1;
            action = anim.clipAction(keypress[2]); // Assuming the first animation
            action2 =anim.clipAction(keypress[3])
            action.time = 3;
            action2.time=3;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play();
            break
        case 'd': 
            action = anim.clipAction(keypress[4]); // Assuming the first animation
            action2 =anim.clipAction(keypress[5])
            action.time = 3.4;
            action2.time=3.4;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break
        case 'f': 
            action = anim.clipAction(keypress[6]); // Assuming the first animation
            action2 =anim.clipAction(keypress[7])
            action.time = 3.8;
            action2.time=3.8;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break
        case 'g': 
            action = anim.clipAction(keypress[8]); // Assuming the first animation
            action2 =anim.clipAction(keypress[9])
            action.time = 4.2;
            action2.time=4.2;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break
        case 'h': 
            action = anim.clipAction(keypress[10]); // Assuming the first animation
            action2 =anim.clipAction(keypress[11])
            action.time = 4.6;
            action2.time=4.6;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break
        case 'j': 
            action = anim.clipAction(keypress[12]); // Assuming the first animation
            action2 =anim.clipAction(keypress[13])
            action.time = 5;
            action2.time=5;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break

        case 'ArrowLeft': // Rotate left
            //keyboard.rotation.y += 0.1;
            action = anim.clipAction(keypress[0]); // Assuming the first animation
            action2 =anim.clipAction(keypress[1])
            console.log(action,keypress[20])
            action.time = 1.8;
            action2.time=1.8;
            action.setLoop(THREE.LoopOnce)
            action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break;
        case 'ArrowRight': // Rotate right
            keyboard.rotation.y -= 0.1;
            break;
        case ' ': // Spacebar to trigger animation (if any)
            break

           
    }
});

/*
 
            console.log('SPACE')
            const action = anim.clipAction(keypress[3]); // Assuming the first animation
            const action2 =anim.clipAction(keypress[6])
            console.log(action,keypress[20])
            action.time = 1.4;
            action2.time=1.4;
            //action.setLoop(THREE.LoopOnce)
           // action2.setLoop(THREE.LoopOnce)
            action.play();
            action2.play()
            break;
            

*/


    clock = new THREE.Clock();


    
    function animate() {

        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        if (anim)   anim.update(delta)
         
        requestAnimationFrame(animate);
        webGLRenderer.render(scene, camera);
        cssRenderer.render(scene, camera);
        
    }
animate();