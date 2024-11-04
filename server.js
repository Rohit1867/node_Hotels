const express = require('express')
const app = express(); 
const db=require('./db');
require('dotenv').config();
 
const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body
const PORT=process.env.PORT ||3000;
const passport =require('./auth');
 
//MIddle ware function
const logRequest =(req,res,next)=>{
   console.log(`[${new Date().toLocaleString()}]Request made to :${req.originalUrl}`);
   next();//move on to the next phase
} 
app.use(logRequest);

 

app.use(passport.initialize());


const LocalAuthMidleware =passport.authenticate('local',{session:false});
app.get('/',LocalAuthMidleware,function (req, res) {
  res.send('Welcome to our hotel');
})
 



//import the router files
const menuRoute=require('./routes/menuRoute');
const personRoute=require('./routes/personRoute');
app.use('/person',personRoute);
app.use('/menuitem',LocalAuthMidleware,menuRoute);
app.listen(PORT,()=>{
    console.log("server is listening to the port 3000");
})

 