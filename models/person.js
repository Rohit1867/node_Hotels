const { type } = require('express/lib/response');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs')
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
    },
    username:{
        required:true,
        type:String
    },
    password:{
       required:true,
       type:String
    }
});

personschema.pre('save',async function(next){
    const person=this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
       //hash password genration
       const salt = await bcrypt.genSalt(10);

       //hash password
       const hashedPassword =await bcrypt.hash(person.password,salt);

       //overide the plain password with the hashed one
        person.password =hashedPassword;
        next();
    }catch(err){
          return next(err);
    }
})

personschema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}

//Create person model
const person =mongoose.model('person',personschema);
module.exports= person;