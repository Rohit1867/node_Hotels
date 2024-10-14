const express = require('express')
const app = express(); 
const db=require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body
const PORT=process.env.PORT ||3000;

app.get('/', function (req, res) {
  res.send('Welcome to our hotel')
})
 



//import the router files
const menuRoute=require('./routes/menuRoute');
const personRoute=require('./routes/personRoute');
app.use('/person',personRoute);
app.use('/menuitem',menuRoute);
app.listen(PORT,()=>{
    console.log("server is listening to the port 3000");
})