import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, plane, analyser, dataArray, freqData

//var vid=document.getElementById('video');

  navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    // Create an VideoContext

    console.log(stream)
    vid.srcObject=stream
    
  })
  .catch((error) => {
    console.error(error);
  });

// --------------------------------------
// Setup Scene
// --------------------------------------
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(1000, 500);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

camera.position.set(0, 10, 40);

// Light
const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(5, 5, 5);
scene.add(light);

// --------------------------------------
// Create 3D Plane
// --------------------------------------
const geo = new THREE.PlaneGeometry(40, 40, 100, 100);
const mat = new THREE.MeshBasicMaterial({
    color: 0x8877ff,
    wireframe: true
});
plane = new THREE.Mesh(geo, mat);
plane.rotation.x = -Math.PI / 2;   // Lay flat like a wave surface
scene.add(plane);

// Buffer reference for speed
const positionAttr = plane.geometry.attributes.position;

// --------------------------------------
// Microphone Setup
// --------------------------------------
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;   // more frequency resolution
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        // NEW: frequency spectrum buffer
         freqData = new Uint8Array(analyser.frequencyBinCount);

    })
    .catch(err => console.error("Mic error:", err));

// --------------------------------------
// Wave Animation
// --------------------------------------
function animateWave() {
    if (!analyser) return;

    // Time-domain (waveform)
    analyser.getByteTimeDomainData(dataArray);

    // Frequency domain (spectrum)
    analyser.getByteFrequencyData(freqData);

    const positions = positionAttr.array;
    const time = performance.now() * 0.002;

    // -------------------------
    // 1. Compute audio energy bands
    // -------------------------
    function bandEnergy(start, end) {
        let sum = 0;
        for (let i = start; i < end; i++) sum += freqData[i];
        return sum / (end - start);
    }

    const low  = bandEnergy(0, freqData.length*0.1);  // bass
    const mid  = bandEnergy(Math.floor(freqData.length*0.1), freqData.length*0.4); //Added Math.floor
    const high = bandEnergy(Math.floor(freqData.length*0.4), freqData.length*0.9); //Added Math.floor

    // -------------------------
    // 2. Color shift via HSL hue
    // -------------------------
    let hue = (low * 0.5 + mid * 0.3 + high * 0.2) % 360;
    hue = Math.min(360, Math.max(0, hue)); 

    console.log(low,mid,high)

    mat.color.setHSL(hue/180, 1.0, 0.55);
    //mat.color.setHSL(hue, 1.0, 0.55); //rapidly changing color


    // -------------------------
    // 3. Wave Geometry Update
    // -------------------------
    for (let i = 0; i < positions.length; i += 3) {

        const x = positions[i];
        const y = positions[i + 1];

        const sampleIndex = Math.floor((i / 3) % dataArray.length);
        const audioValue = (dataArray[sampleIndex] - 128) / 128; // -1..1

        positions[i + 2] =
            Math.sin(x * 0.3 + time) * 3 +
            Math.cos(y * 0.3 + time * 0.7) * 3 +
            audioValue * 80;
    }

    positionAttr.needsUpdate = true;
}


// --------------------------------------
// Main Render Loop
// --------------------------------------
function animate() {
    animateWave();
    //plane.rotation.z+=0.0001;
    renderer.render(scene, camera);
}
