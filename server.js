var PORT=3050
const fs= require('fs')
const express= require('express')
const app =express();
var path =require('path');
var bodyParser=require("body-parser")





app.use(bodyParser.urlencoded({extended: false}))


app.use(express.static(path.join(__dirname, '')))

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/html/index.html')
})

app.get('/pano', (req, res)=>{
    res.sendFile(__dirname+'/html/panorama.html')
})

app.get('/pano2', (req, res)=>{
    res.sendFile(__dirname+'/html/panorama2.html')
})

app.get('/cube', (req,res)=>{
    res.sendFile(__dirname+'/html/cube.html')
})

app.get('/circles', (req,res)=>{
    res.sendFile(__dirname+'/html/circles.html')
})

app.get('/orbit', (req,res)=>{
    res.sendFile(__dirname+'/html/orbit.html')
})
app.get('/3D', (req, res)=>{
    res.sendFile(__dirname+'/html/gltf.html')
})

app.get('/key', (req, res)=>{
    res.sendFile(__dirname+'/html/keyboard.html')
})

app.get('/game', (req,res)=>{
    res.sendFile(__dirname+'/html/game.html')
})
app.get('/yt', (req,res)=>{
    res.sendFile(__dirname+'/html/youtube.html')
})

app.get('/stack', (req, res)=>{
    res.sendFile(__dirname+'/html/images.html')
})










app.listen(PORT,()=>{
  console.log("The Server is running on port:"+PORT)
})



//module.exports=THREE