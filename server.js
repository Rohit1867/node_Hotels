const express = require('express')
const app = express(); 
const db=require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body

app.get('/', function (req, res) {
  res.send('Welcome to our hotel')
})
 



//import the router files
const menuRoute=require('./routes/menuRoute');
const personRoute=require('./routes/personRoute');
app.use('/person',personRoute);
app.use('/menuitem',menuRoute);
app.listen(3000,()=>{
    console.log("server is listening to the port 3000");
})