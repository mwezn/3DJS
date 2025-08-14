
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    camera.position.z=20
    
    var light = new THREE.AmbientLight(0xffffff, 5);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffffff, 5);
    scene.add(light2);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );


    var controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = true;
				controls.enablePan = true;
				controls.enableDamping = true;
				controls.rotateSpeed = 0.5;






    var loader = new THREE.GLTFLoader().setPath('../monitor/');    
    // Load a glTF resource
    loader.load('OldMonitor.gltf',function ( gltf ) {
        scene.add( gltf.scene );
        
        
    }, undefined, function ( error ) {
        console.error( error );
    } );
    
            /*gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object*/








    function animate() {
        //requestAnimationFrame( animate );

        
        

        renderer.render( scene, camera );
    }
    animate();
