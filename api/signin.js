// login existing user
const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../db/models')

// make sure we get JWT_SECRET from .env
require('dotenv').config();

const router = express.Router();

router.post('/signin', async (req, res) => {
  console.log("POST /signin")

  //restructure request
  const { username, password } = req.body;
  
  console.log(username)
  console.log(password)

  const userWithUsername = await models.Users.findOne({ where: { username } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  // user does not exist with that username
  if (!userWithUsername) {
    console.log('user does not exist with username %s',username);
    return res
      .status(400)
      .json({ message: 'Username or password does not match!' });
  }

  // wrong password
  if (userWithUsername.password !== password) {
    console.log('%s is the wrong password',password);
    return res
      .status(400)
      .json({ message: 'Username or password does not match!' });
  }

  // user with matching username and password was found
  // so return a JWT containing the user_id and username that is good for 1 hour
  const jwtToken = jwt.sign(
    { user_id: userWithUsername.user_id, username: userWithUsername.username },
    process.env.JWT_SECRET,{ expiresIn: '1h' }
  );

  res.json({ message: 'Welcome Back!', user_id: userWithUsername.user_id, user_name:userWithUsername.username ,token: jwtToken });
});

module.exports = router;
