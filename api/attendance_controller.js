const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const axios = require('axios')
const dotenv = require('dotenv').config()
const models = require('../db/models')

const levenshtein = require('./levenshtein');



findClosestMatch = async (posts) => {
  let arr = []
  let studentsTable = await models.Student.findAll();      //["mohased shale", "thierno souleymane ", "justinwui"]   //await models.Student.findAll();
      
    posts.forEach(post =>{
      studentsTable.forEach(item =>{
        if(levenshtein(post.toLowerCase(), item.name.toLowerCase()) <= 2) arr.push(item.name)
      })
    })

   return arr
}

router.post('/', async (request, response, nextMiddleware) => {  
  const imgToBase64 = request.body.imgToBase64  
  try {
    const base64ToText = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,{
      "requests": [
        {
          "image": {
            "content": imgToBase64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
    
      const data = base64ToText.data.responses[0].textAnnotations[0].description
    const students = data.split("\n")
    const arr= await findClosestMatch(students) ;
    
    models.Attendance.create({studentPresents:arr});


}catch(error){
  console.log(error)
}


})




module.exports = router;
