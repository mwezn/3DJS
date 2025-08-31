import * as THREE from "../node_modules/three/build/three.module.js"
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

let controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = true;
				//controls.enablePan = true;
				//controls.enableDamping = true;
				//controls.rotateSpeed = 0.5;
  

  const light =new THREE.DirectionalLight(0xffffff,5)
  light.position.set(2,0,2)
  scene.add(light)
  camera.position.z = 3;


  // Plane Geometry
const geo = new THREE.PlaneGeometry(20, 20, 50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
const plane = new THREE.Mesh(geo, material);
//plane.rotation.x=4;
//plane.rotation.y=3;
scene.add(plane);

// Request microphone access
navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    // Create an AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);

    // Create an AnalyserNode to process audio data
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048; // Set FFT size for frequency analysis
    source.connect(analyser);

    // Create a buffer to hold audio data
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Function to process and log audio data
    function processAudio() {
      analyser.getByteTimeDomainData(dataArray); // Get waveform data
     console.log(dataArray); // Log the audio data (values range from 0 to 255)
      
      

       // Update geometry
    
      for (var i = 0; i < dataArray.length; i++) {
        animateWave(dataArray[i])

      }
      
      // Call this function repeatedly
      requestAnimationFrame(processAudio);
    }

    processAudio(); // Start processing audio
  })
  .catch((error) => {
    console.error('Error accessing microphone:', error);
  });




  function animate() {

	//plane.rotation.y += .01;
	//plane.rotation.x += .01;
	//cube.rotation.z += .01;


  

	renderer.render( scene, camera );

}

renderer.render(scene ,camera)






// Position Camera
camera.position.z = 30;

// Animate Wave
function animateWave(arrVal) {
  const time = Date.now() * 0.001; // Time-based animation
  const vertices = plane.geometry.attributes.position.array;
  console.log(vertices)

  for (let j = 0; j < vertices.length; j += 3) {
    const x = vertices[j];
    const y = vertices[j + 1];
    vertices[j + 2] = Math.sin(x*+time) + Math.cos(y*+time); 
    // Wave formula
  }

  plane.geometry.attributes.position.needsUpdate = true; // Update geometry
  //renderer.render(scene, camera);
  //requestAnimationFrame(animateWave);
}

// Start Animation
//animateWave();
