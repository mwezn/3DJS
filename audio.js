

var context = new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 44100,
})






var ctx=document.getElementById('c').getContext('2d');
var gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(1, '#ADD8E6');
    gradient.addColorStop(0.95, 'rgba(23, 238, 73, 1)');
    gradient.addColorStop(0.80, '#6d56d2ff');

    gradient.addColorStop(0.65, '#576D74');
    gradient.addColorStop(0.45, '#FFAA00');
    gradient.addColorStop(0, '#FF0000');
    ctx.fillStyle = gradient;




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
      


      ctx.clearRect(0, 0, 3000,512);
      for (var i = 0; i < dataArray.length; i++) {
        ctx.fillRect(i, 512-dataArray[i]*3, -1, 512);
        //cube.position.z=-dataArray[i]/200
        //cube.scale.set(dataArray[i]/50,dataArray[i]/50,1)

      }
      
      // Call this function repeatedly
      requestAnimationFrame(processAudio);
    }

    processAudio(); // Start processing audio
  })
  .catch((error) => {
    console.error('Error accessing microphone:', error);
  });



  