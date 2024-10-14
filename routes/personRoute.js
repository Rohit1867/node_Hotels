const express = require('express')
const router=express.Router();
const Person =require('./../models/person');
//post route to add person
 
router.post('/',async(req,res)=>{
    // const data =req.body //assuming the request body contains the person data 
    
    // //create a new person doucment using the mongoose model
    // const newPerson =new Person(data);
  
    // //save the person in database
    // newPerson.save((error,savedPerson) =>{
    //     if(error){
    //       console.log('Error saving person:',error);
    //       res.status(500).json({error:'internal server error'})
    //     }else{
    //       console.log('data saved sucessfully');
    //       res.status(200).json (savedPerson);
    //     }
    // })
    
    try{
      const data =req.body //assuming the request body contains the person data 
    
    //create a new person doucment using the mongoose model
    const newPerson =new Person(data);
  
    //save the person in database
    const response= await newPerson.save()
    console.log('data saved');
     res.status(200).json(response);
    }catch(err){
        console.log(err);
         res.status(500).json({error:'internal server Error'})
    }
  })
 //Get method to get the person
  router.get('/',async(req,res)=>{
    try{
      const data=await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(arr){
      console.log(err);
      res.status(500).json({error:'internal server Error'});
    }
  })

  router.get('/:workType',async(req,res)=>{
    try{
      const workType=req.params.workType;
      if(workType =='chef' || workType =='manager' || workType =='waiter'){
        const response=await Person.find({work:workType});
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

  router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//Extract the  id from the url parameter
        const updatePersonData =req.body;//updated data for the person

        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,  //Return the updated document
            runValidators:true,//run mongoose validation
        })
        
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});   
    }
  })

  router.delete('/:id',async(req,res)=>{
    try{
        const personId =req.params.id;//extract the person's id from the URL parameter
        //assuming you have a person model
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message:'person deleted sucessfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server Error'});
    }
  })

  module.exports =router;