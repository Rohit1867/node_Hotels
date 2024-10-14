const { type } = require('express/lib/response');
const mongoose=require('mongoose');

//define the person schema
const personschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    adddress:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
});

//Create person model
const person =mongoose.model('person',personschema);
module.exports= person;