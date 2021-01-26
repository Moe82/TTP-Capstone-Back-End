const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const axios = require('axios')
const dotenv = require('dotenv')

router.post('/', async (request, response, nextMiddleware) => {  
  const imgToBase64 = response.body.imgToBase64  
  try {
    const base64ToText = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,{
      "requests": [
        {
          "image": {
            "content": imgTobase64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
    const data = base64ToText.data.responses[0]
    console.log(data.fullTextAnnotation.text)
  } catch (error) { console.log(error) }
})

module.exports = router;
