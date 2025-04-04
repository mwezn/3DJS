var PORT=3050
const fs= require('fs')
const express= require('express')
const app =express();
var path =require('path');
var bodyParser=require("body-parser")




app.use(bodyParser.urlencoded({extended: false}))


app.use(express.static(path.join(__dirname, '')))

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get('/films', (req,res)=>{
  res.sendFile(__dirname+'/films.html')
})

app.get('/circles', (req,res)=>{
  res.sendFile(__dirname+'/circles.html')
})
app.get('/model', (req,res)=>{
  res.sendFile(__dirname+'/models.html')
})
app.get('/game', (req,res)=>{
  res.sendFile(__dirname+'/game.html')
})

app.get('/orbit' , (req,res)=>{
  res.sendFile(__dirname+'/orbit.html')

})
app.get('/cube', (req,res)=>{
  res.sendFile(__dirname+'/cube.html')
})

app.get('/text', (req, res)=>{
  res.sendFile(__dirname+'/webgl.html')
})

app.get('/yt', (req, res)=>{
  res.sendFile(__dirname+'/youtube.html')

})



app.listen(PORT,()=>{
  console.log("The Server is running on port:"+PORT)
})



//module.exports=THREE