const express = require('express');
const router = express.Router();

const { Teacher } = require('../db/models');


// Routes for student

router.get('/', async (req, res, next) => {
    try{
         await Teacher.findAll()
        .then (
          response => res.json(response)
        )
        
    }catch(error){
        console.log(error)
    }
  });


  module.exports = router;