const passport = require("passport");
const express = require('express');

const cors = require('cors');
const path = require('path');
const seed = require('./seed')
const fileUpload = require('express-fileupload');
const authRouter = require("./auth");
const db = require('./db');

// IMPORTS/VARIABLES
const PORT = process.env.PORT || 8080;

const app = express();

// CHANGED: trust proxy for secure cookies on Heroku
app.set('trust proxy', 1);

// CHANGED: CORS — allow localhost and FRONTEND_ORIGIN from env
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN, // e.g. https://attendance-tracker.netlify.app
].filter(Boolean);

const corsOptions = {
  credentials: true,
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    return allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error('CORS blocked'));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  maxAge: 86400,
};

app.use(cors(corsOptions));
// CHANGED: handle preflight
app.options('*', cors(corsOptions));

app.use(express.json({
  limit: "50mb"
}));

// CHANGED: remove deprecation warning
app.use(express.urlencoded({ extended: true }))
// CORS!

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api'));
app.use("/auth", authRouter);

// CHANGED: same deprecation fix here too (kept line; minimal change)
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true
}));
// Mount on API

// START BACKEND SERVER FUNCTION
const serverRun = () => {
  const server = app.listen(PORT, () => {
    console.log(`Live on port : ${PORT}`);
  });
};
// DB Sync Function
// Optional parameters
// {force:true} - drops current tables and places new empty tables
// {alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

// const syncDb = () => db.sync({force:true});
const syncDb = () => {
  if (process.env.NODE_ENV === 'production') {
    db.sync();
  }
  else {
    console.log('As a reminder, the forced synchronization option is on');
    db.sync({alter:true})
      // .then(() => seed())
      .catch(err => console.log(err));
    }
};
// Connects to //postgres://localhost:5432/dbname

syncDb();
serverRun();

module.exports = app;