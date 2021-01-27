//NODE MODULES
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const seed = require('./seed')
const fileUpload = require('express-fileupload');

//IMPORTS/VARIABLES
const PORT = process.env.PORT || 8099;
const db = require('./db');

const app = express();
app.use(express.json({
  limit: "50mb"
}));
app.use(express.json())

app.use(express.urlencoded())
//CORS!
app.use(cors());



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
//DB Sync Function
//Optional parameters
// {force:true} - drops current tables and places new empty tables
//{alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

//const syncDb = () => db.sync({force:true});
const syncDb = () => {
  if (process.env.NODE_ENV === 'production') {
    db.sync();
  }
  else {
    console.log('As a reminder, the forced synchronization option is on');
    db.sync({ force: true })
      .then(() => seed())
      .catch(err => console.log(err));
    }
};
// Connects to //postgres://localhost:5432/dbname

syncDb();
serverRun();

module.exports = app;