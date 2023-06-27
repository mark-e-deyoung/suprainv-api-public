var _ = require("lodash");

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
global.__basedir = __dirname;

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sequelize = require('sequelize');
require('./db')
const models = require('./db/models/')

var passport = require("passport");
require('./auth/passport');

const utilities = require('./utilities');

const api = require('./api');

const os = require('os');
console.log(os.type())
console.log(os.version())
console.log(os.hostname())
console.log(os.homedir())

var app = express();

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
      message: 'This is the SupraInv app backend',
    });
  });

  
  app.get("/secretDebug",
    function(req, res, next){
      console.log(req.get('Authorization'));
      next();
    }, function(req, res){
      res.json("debugging");
  });
  
  //add /api/v1 prefix to api
  app.use('/api/v1', api);
  
  app.use(utilities.notFound);
  app.use(utilities.errorHandler);

module.exports = app, models;
