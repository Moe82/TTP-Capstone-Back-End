const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const axios = require('axios')
const dotenv = require('dotenv').config()
const models = require('../db/models')



findClosestMatch = async (x) => {
  // let arr = []
  // let studentsTable = await models.Student.findAll({
  //   where:{
  //     name: x
  //   }
  // })
  // console.log(studentsTable)
}

router.post('/', async (request, response, nextMiddleware) => {  
  // const imgToBase64 = request.body.imgToBase64  
  // try {
  //   const base64ToText = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,{
  //     "requests": [
  //       {
  //         "image": {
  //           "content": imgToBase64
  //         },
  //         "features": [
  //           {
  //             "type": "TEXT_DETECTION"
  //           }
  //         ]
  //       }
  //     ]
  //   })
  //   const data = base64ToText.data.responses[0].textAnnotations[0].description
  //   const students = data.split("\n")
    let students = ["Mohased shalee", "Thierno Souley mane", "JustinwuI"]
    let closestMatch;
    students.forEach(student => {
      closestMatch = findClosestMatch(student);
      //
    })
    // console.log(data.fullTextAnnotation.text)
  // } catch (error) { console.log(error) }
})




module.exports = router;