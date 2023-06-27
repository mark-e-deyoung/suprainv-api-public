// login existing user
const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../db/models')

// make sure we get JWT_SECRET from .env
require('dotenv').config();

require('../auth/passport');

const passport = require('passport');


const router = express.Router();

router.get("/my_items", passport.authenticate('jwt', { session: false }), function(req, res){

  //restructure req.user from jwt
  const { user_id, username } = req.user;

  models.Items.findAll({where: {user_id: user_id}, attributes: ['item_id','item_name','item_description','quantity']}).then(function (items){
    res.send(items)
  }).catch(function (err){
    console.log("Error: " + err)
    res.status(204).json({message: err})
  })

});

module.exports = router;
