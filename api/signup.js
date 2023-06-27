// register a new user
const express = require('express');

const models = require('../db/models')

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log("CReate user -POST /signin")
  //restructure request
  const { username, first_name, last_name, password } = req.body;

  //check if user exists
  // to check fullname or email: where: {fullName, email}
  
  const alreadyExistsUser = await models.Users.findOne({ where: { username } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  if (alreadyExistsUser) {
    //409 Conflict
    return res.status(409).json({ message: 'User with username already exists!' });
  }

  // user does not exist so create a new one
  const newUser = new models.Users({ username, first_name,last_name, password });
  const savedUser = await newUser.save().catch((err) => {
    console.log('Error: ', err);
    res.status(500).json({ error: 'Cannot register user at the moment!' });
  });

  if (savedUser) res.json({ message: 'Thanks for registering' });
});

module.exports = router;
