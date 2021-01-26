const express = require('express');
const router = express.Router();

const { Student } = require('../db/models');


// Routes for student

router.get('/', async (req, res, next) => {
    try{
         await Student.findAll()
        .then (
          response => res.json(response)
        )
        
    }catch(error){
        console.log(error)
    }
  });


  // route to create a student


  router.post('/', (req, res, next) =>{
    console.log(req.body)
    Student.create({
       name: req.body.name
     })
     .then(campus => res.status(200).send("succes"))
   .catch(error =>{
     res.status(500).send('Hey there is an Error' + error)
   })
 })



  module.exports = router;