const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const axios = require('axios')
const dotenv = require('dotenv').config()
const models = require('../db/models')

// importing the Levenshtein algo to calculate the Levenshtein distance between names in table and names from API 
const levenshtein = require('./levenshtein');

findMatches = async (students) => {
  let studentsTable = await models.Student.findAll(); 
  var arr = []
  students.forEach(student =>{
    studentsTable.forEach(entry =>{
      if (levenshtein(student.toLowerCase(), entry.dataValues.name.toLowerCase()) <= 2) arr.push(entry.dataValues.name)
    })
  })
  return arr
}

router.post('/', async (request, response, nextMiddleware) => {  
  // const imgToBase64 = request.body.imgToBase64  
  try {
    // const base64ToText = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,{
    //   "requests": [
    //     {
    //       "image": {
    //         "content": imgToBase64
    //       },
    //       "features": [
    //         {
    //           "type": "TEXT_DETECTION"
    //         }
    //       ]
    //     }
    //   ]
    // })
    //let post = ["Mohased shalee", "Thierno SOULEYMANE ", "JustinwuI"]
    //let database = 
    // const data = base64ToText.data.responses[0].textAnnotations[0].description
    // const students = data.split("\n")
    // console.log(students)
    let students = ["jeremy becker", "Frankyyy", "Alsenio", "Baaba sssaww"]
    console.log("Original students:\n", students)
    const matches = await findMatches(students)
    console.log(matches)

  } catch(error) {
    console.log(error)
  }
})

module.exports = router;