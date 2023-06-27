// login existing user
const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../db/models')

// make sure we get JWT_SECRET from .env
require('dotenv').config();

var passport = require("passport");
require('../auth/passport');

const router = express.Router();

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

module.exports = router;
