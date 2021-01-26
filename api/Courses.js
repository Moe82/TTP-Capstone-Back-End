const express = require('express');
const router = express.Router();

const { Course } = require('../db/models');


// Routes for Courses

router.get('/', async (req, res, next) => {
    try{
         await Course.findAll()
        .then (
          response => res.json(response)
        )
        
    }catch(error){
        console.log(error)
    }
  });


  module.exports = router;