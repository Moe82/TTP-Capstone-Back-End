const express = require('express');
const router = express.Router();


nextMiddleware = () => {
  console.log("here")
}

router.post('/', (request, response, nextMiddleware) => { 
  (async function () {
    const fileName = request.body.fileName;
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.documentTextDetection(fileName);
      const fullTextAnnotation = result.fullTextAnnotation;
      console.log(`Full text: ${fullTextAnnotation.text}`);
      fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
          console.log(`Block confidence: ${block.confidence}`);
          block.paragraphs.forEach(paragraph => {
            console.log(`Paragraph confidence: ${paragraph.confidence}`);
            paragraph.words.forEach(word => {
              const wordText = word.symbols.map(s => s.text).join('');
              console.log(`Word text: ${wordText}`);
              console.log(`Word confidence: ${word.confidence}`);
              word.symbols.forEach(symbol => {
                console.log(`Symbol text: ${symbol.text}`);
                console.log(`Symbol confidence: ${symbol.confidence}`);
              });
            });
          });
        });
      });
    })().then(() => {
      response.status(200).json(campus)
    }).catch(err => {
      response.status(500).json(err)
    })
  })





// Express Routes for Players - Read more on routing at https://expressjs.com/en/guide/routing.html
// router.get('/', async (req, res, next) => {
//   try {
//     const allPlayers = await Player.findAll();
//     // An if/ternary statement to handle not finding allPlayers explicitly
//     !allPlayers
//       ? res.status(404).send('Players Listing Not Found')
//       : res.status(200).json(allPlayers);
//   } catch (error) {
//     next(error);
//   }
// });

// Export our router, so that it can be imported to construct our api routes
module.exports = router;
