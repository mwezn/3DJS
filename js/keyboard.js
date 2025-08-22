
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
	sound.setVolume(1);
	
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





    camera.position.set(0,3,10)
    
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
   loader.load('../monitor/OldMonitor.gltf',function ( gltf ) {

        monitor=gltf.scene;
        monitor.scale.set(3,3,3)
        monitor.position.y=3;
        scene.add(monitor);
        gltf.scene.traverse(function(child){
            console.log(child.name);
        })

        
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } ); 

    loader.load('../RGB/edit.glb',function ( gltf ) {
        keypress=gltf.animations
        keyboard=gltf.scene;
        keyboard.rotation.x=Math.PI/4
        keyboard.position.set(0,0,5)
        keyboard.scale.set(8,8,8)
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
    if (!keyboard || !keypress) return;

    sound.play();
    anim = new THREE.AnimationMixer(keyboard);

    const playAnimationPair = (index, time) => {
        const action1 = anim.clipAction(keypress[index]);
        const action2 = anim.clipAction(keypress[index + 1]);
        action1.time = time;
        action2.time = time;
        action1.setLoop(THREE.LoopOnce);
        action2.setLoop(THREE.LoopOnce);
        action1.play();
        action2.play();
    };

    const keyAnimationMap = {
        b: { index: 0, time: 1.0 },
        s: { index: 2, time: 3 },
        d: { index: 4, time: 3.4 },
        f: { index: 6, time: 3.8 },
        g: { index: 8, time: 4.2 },
        h: { index: 10, time: 4.6 },
        i: { index: 16, time: 5.0 },
        m: { index: 18, time: 5.4},
        k: { index: 20, time: 5.8},
        l: { index: 22, time: 3.2 },
        n: { index: 26, time: 3.6 },
        o: { index: 28, time: 3.8 },
        p: { index: 30, time: 4.0 },
        q: { index: 32, time: 4.2 },
        r: { index: 34, time: 4.4 },
        a: { index: 36, time: 4.6 },
        t: { index: 38, time: 4.8 },
        u: { index: 40, time: 5.0 },
        v: { index: 42, time: 5.2 },
        w: { index: 44, time: 5.4 },
        x: { index: 46, time: 5.6 },
        y: { index: 48, time: 5.8 },
        z: { index: 50, time: 6.0 },
    };

    const key = event.key.toLowerCase();

    if (key in keyAnimationMap) {
        const { index, time } = keyAnimationMap[key];
        playAnimationPair(index, time);
        return;
    }

    // Handle special keys separately
    switch (key) {
        case 'arrowup':
            keyboard.position.z -= 0.1;
            console.log('UP PRESSED');
            break;
        case 'arrowdown':
            // keyboard.position.z += 0.1;
            break;
        case 'arrowleft':
            playAnimationPair(0, 1.8); // Customize index/time as needed
            break;
        case 'arrowright':
            keyboard.rotation.y -= 0.1;
            break;
        case ' ':
            // Spacebar logic
            break;
    }
});


    /*document.addEventListener('keydown', (event) => {

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
});*/

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

    function Element2( path, x, y, z, ry,css) {

            const div = document.createElement( 'div' );
            const iframe = document.createElement('iframe');
            iframe.style.border = '0px';
            iframe.src = path
            //if(loop) iframe.loop='true'
            //if (autoplay) iframe.allow='autoplay'
            //css=='monitor'?div.className='css3d-object':div.className='oldtv'
            div.className=css;
            
            div.appendChild(iframe)
            //container.appendChild(div)

            const object = new CSS3DObject( div );
            object.position.set( x, y, z );
            object.rotation.y = ry;
            object.scale.set(0.01, 0.01, 0.01);
            return object;
        }
    
    const scope= new Element2('https://www.wikipedia.org/',0,3,0,0,'monitor')

    scene.add(scope)


    
    function animate() {

        var delta = clock.getDelta();
        if ( mixer ) mixer.update( delta );
        if (anim)   anim.update(delta)

         
        requestAnimationFrame(animate);
        webGLRenderer.render(scene, camera);
        cssRenderer.render(scene, camera);
        
    }
animate();