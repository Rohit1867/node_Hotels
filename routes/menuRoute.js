const express = require('express')
const router=express.Router();

const MenuItem =require('./../models/menuItem');

router.post('/',async(req,res)=>{
 
  
    try{
      const data =req.body //assuming the request body contains the person data 
    
    //create a new person doucment using the mongoose model
    const newMenu =new MenuItem(data);
  
    //save the person in database
    const response= await  newMenu.save()
    console.log('data saved');
     res.status(200).json(response);
    }catch(err){
        console.log(err);
         res.status(500).json({error:'internal server Error'})
    }
  })
  
router.get('/',async(req,res)=>{
    try{
      const data=await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(arr){
      console.log(err);
      res.status(500).json({error:'internal server Error'});
    }
  })
router.get('/:tasteType',async(req,res)=>{
    try{
      const tasteType=req.params.tasteType;
      if(tasteType =='Sweet' || tasteType =='spicy' || tasteType =='sour'){
        const response=await MenuItem.find({taste:tasteType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
            res.status(404).json({error:'internal work type'});
      }
      
    }catch(arr){
      console.log(err);
      res.status(500).json({error:'internal server Error'});
    }
  })
  module.exports =router;