// login existing user
const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../db/models')

// make sure we get JWT_SECRET from .env
require('dotenv').config();

var passport = require("passport");
require('../auth/passport');

const router = express.Router();

// vew all users (GET)
// requires authentication
router.get("/users", passport.authenticate('jwt', { session: false }), function(req, res){
  
  models.Users.findAll({attributes: ['user_id','username','first_name','last_name']}).then(function (users){
    res.send(users)
  }).catch(function (err){
    console.log("Error:" + err)
    res.status(204).json({message: err})
  })

});

// view user (GET)
// requires authentication
router.get("/user/:id", passport.authenticate('jwt', { session: false }), function(req, res){
  
  models.Users.findOne(
    {attributes: ['user_id','username','first_name','last_name']},
    {where: { user_id: req.params.id }}
  ).then(function (user){
    res.send(user)
  }).catch(function (err){
    console.log("Error:" + err)
    res.status(204).json({message: err})
  })

  // CReate user (POST)
  // Note: is handled by signup

  // Update user (PUT)
  // requires authentication
  // Note: currently not implemented

  // Delete user (DELETE)
  // requires authentication
  // Note: currently not implemented

});

module.exports = router;