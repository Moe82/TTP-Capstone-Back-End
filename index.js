//NODE MODULES
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
//IMPORTS/VARIABLES
const PORT = process.env.PORT || 8080;
// const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({
  createParentPath: true
}));
//Mount on API
app.use('/api', require('./api'));

//START BACKEND SERVER FUNCTIOON
const serverRun = () => {
  const server = app.listen(PORT, () => {
    console.log(`Live on port : ${PORT}`);
  });
};

serverRun();

module.exports = app;