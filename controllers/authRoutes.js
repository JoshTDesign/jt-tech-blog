const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");


router.post('/signup',(req,res)=>{
User.create({ 
      username:req.body.username,
      email:req.body.email,
      password:req.body.password
    }).then(newUser=>{
      req.session.user = {
        id:newUser.id,
        username:newUser.username,
        email:newUser.email,
      };
      res.json(newUser)
    }).catch(err=>{
      console.log(err);
      res.status(500).json(err);
    })
  })
  
router.post('/login', (req,res) =>{
  User.findOne({
    where:{
      email:req.body.email,
    }
  }).then(foundUser=>{
    if(!foundUser){
      req.session.destroy();
      return res.status(401).send("no such user");
    }
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.user = {
        id:foundUser.id,
        username:foundUser.username,
        email:foundUser.email,
      };
      return res.json(foundUser)
    }else{
      req.session.destroy();
      res.status(401).send("password not matched");
    }
  })
})
  
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send('You are logged out');
})

router.get("/sessiondata",(req,res)=>{
  res.json(req.session);
})

  module.exports = router;