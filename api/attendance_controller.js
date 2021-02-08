const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const axios = require('axios')
const dotenv = require('dotenv').config()
const models = require('../db/models')

// importing the Levenshtein algo to calculate the Levenshtein distance between names in table and names from API 
const levenshteinDistance = require('./levenshtein');
const { request } = require('express');

findMatches = async (students, courseNumber) => {
  var arr = []
  let studentsTable = await models.Student.findAll({where: {CourseId:courseNumber}}); 
  students.forEach(student =>{
    studentsTable.forEach(entry =>{
      if (levenshteinDistance(student.toLowerCase(), entry.dataValues.name.toLowerCase()) <= 3) {
        arr.push(entry.dataValues.name)
      }
    })
  })
  return arr
}

router.post('/', async (request, response, nextMiddleware) => {  
  try {
    for (let imgInBase64 of request.body.imagesInBase64) {
      console.log("HERE", imgInBase64.length)
      const base64ToText = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,{
        "requests": [
          {
            "image": {
              "content": imgInBase64
            },
            "features": [
              {
                "type": "TEXT_DETECTION"
              }
            ]
          }
        ]
      })
      const data = base64ToText.data.responses[0].textAnnotations[0].description.split("\n")
      let date = data[0]
      data.shift()
      students = data
      const courseNumber = request.body.id
      console.log("API results:", students)
      const matches = await findMatches(students, courseNumber)
      console.log("Matches:", matches)
      models.Attendance.findAll({where: {CourseId: request.body.id}})
      .then(attendanceSheets => {
        for (let attendanceSheet of attendanceSheets){
          if (attendanceSheet.date == date) {
            attendanceSheet.destroy();
          }
        }
      })
      models.Attendance.create({
        studentsPresent: matches,
        CourseId:courseNumber,
        date: date
      })
    }
      response.status(200).json("Success")
  } catch(error) {
    response.status(400).json(error)
    console.log(error)
  }
})

// Super hackey and complicated, but it works...
router.get('/:id', async (req, res, next)=>{
  try {
    let attendanceSheetObject = {data: {}}
    await models.Student.findAll({
      where: {
        CourseId: req.params.id
      }
    }).then(async allStudents => {
      
      for (student of allStudents){
        attendanceSheetObject.data[student.dataValues.name] = {}
        }
        
      await models.Attendance.findAll({
        where: {
          CourseId: req.params.id
        }
      })
      .then(
        async attendanceSheets => {
          for (let attendanceSheet of attendanceSheets) {
            let date = attendanceSheet.date
            for (student of Object.keys(attendanceSheetObject.data)){
              if (!(date in Object.keys(student))) {
                attendanceSheetObject.data[student][date] = "absent"
              }
            }
          }
          for (let student of Object.keys(attendanceSheetObject.data)){
            for (let attendanceSheet of attendanceSheets) {
              const objectArray = Object.entries(attendanceSheet.studentsPresent)
              objectArray.forEach(([key, value]) => {
                if (student == value){
                  attendanceSheetObject.data[student][attendanceSheet.date] = "present"
                }
              });
            }
          }
          // sortAttendanceSheetObject(attendanceSheetObject)
          res.status(200).json(attendanceSheetObject)
        }
      ) 
    }).catch(err => res.json(err))
  } catch (error) {
    console.log(error);
  }
})

// sorts the attendance object by date. 
// sortAttendanceSheetObject = (attendaceObject) => {
//   const objectArray = Object.entries(attendaceObject.data)
//   objectArray.forEach(([key, value]) => {
//     const dates = Object.entries(value)
//     for (let date of dates){ 
//       console.log(key,date[0]) 
//     }
//   })
// }

module.exports = router;