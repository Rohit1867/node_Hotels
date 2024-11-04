const express = require('express')
const router=express.Router();
const Person =require('./../models/person');
const {jwtAuthMiddleware,generateToken} =require('./../jwt');
//post route to add person
 
router.post('/signup',async(req,res)=>{
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
     
    const payload={
       id:response.id,
       username:response.username
    }
    console.log(JSON.stringify(payload));
    const token =generateToken(payload);
    console.log("Token is :",token);
     res.status(200).json({response:response,token:token});
    }catch(err){
        console.log(err);
         res.status(500).json({error:'internal server Error'})
    }
  })

  //Login Route
  router.post('/login',async(req,res) =>{
    try{
      //Extract username and password  from request body
       const {username,password} = req.body;

       //find the user by username
       const user=await Person.findOne({username:username})

       //if user does not exist or password doesnot exist 
       if(!user || !(await user.comparePassword(password) !== undefined)){
        return  res.status(401).json({error :'Invalid username or password'});
       }

       //genrate Token
       const payload={
          id:user.id,
          username:user.username
       }
       const token =generateToken(payload);
      
       //return token as response
        res.json({token})
    }catch(err){
      console.log(err);
       res.status(500).json({error:'internal server Error'})
  }
  });
 //Get method to get the person
  router.get('/',jwtAuthMiddleware,async(req,res)=>{
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

//profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
      const userData = req.user;

      console.log("user Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);
      
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({user});
  }catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


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