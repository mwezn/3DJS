const videoElement = document.getElementById("webcam");
const startCameraBtn = document.getElementById("start-camera");
const stopCameraBtn = document.getElementById("stop-camera");
const startRecordingBtn = document.getElementById("start-recording");
const stopRecordingBtn = document.getElementById("stop-recording");
const downloadLink = document.getElementById("download-link");
let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
// Start Webcam
startCameraBtn.addEventListener("click", async () => {
 try {
   mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
   videoElement.srcObject = mediaStream;
   startCameraBtn.disabled = true;
   stopCameraBtn.disabled = false;
   startRecordingBtn.disabled = false;
 } catch (error) {
   console.error("Error accessing webcam:", error);
 }
});
// Stop Webcam
stopCameraBtn.addEventListener("click", () => {
 mediaStream.getTracks().forEach(track => track.stop());
 videoElement.srcObject = null;
 startCameraBtn.disabled = false;
 stopCameraBtn.disabled = true;
 startRecordingBtn.disabled = true;
});
// Start Recording
startRecordingBtn.addEventListener("click", () => {
 recordedChunks = [];
 mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "video/mp4" });
 mediaRecorder.ondataavailable = event => {
   if (event.data.size > 0) recordedChunks.push(event.data);
 };
 mediaRecorder.onstop = () => {
   const blob = new Blob(recordedChunks, {type: 'video/mp4' });
   const url = URL.createObjectURL(blob);
   downloadLink.href = url;
   downloadLink.download = `recording-${Date.now()}.mp4`;
   downloadLink.style.display = "block";
 };
 mediaRecorder.start();
 startRecordingBtn.disabled = true;
 stopRecordingBtn.disabled = false;
});
// Stop Recording
stopRecordingBtn.addEventListener("click", () => {
 mediaRecorder.stop();
 startRecordingBtn.disabled = false;
 stopRecordingBtn.disabled = true;
});