const mongoose =require('mongoose');
//define the mongodb connection url
const mongoURL='mongodb://localhost:27017/hotels';

//setup mongodb connection
mongoose.connect(mongoURL,{

    useNewUrlParser: true,
     useUnifiedTopology: true,
  
  })

//get the default connection
//mongoose maintains a default connection object representing the mongodb connection.
const db=mongoose.connection;

//define event listner for datbase connection
db.on('connected',()=>{
    console.log('connected to mongodb server');
})

db.on('error',(err)=>{
    console.log('connected to error:',err);
})

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server');
})
 
//export thr database connection
module.exports=db;