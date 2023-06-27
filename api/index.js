const express = require('express');
const signUpApi = require('./signup');
const signInApi = require('./signin');
const items = require('./items');
const users = require('./users');
const my_items = require('./my_items');
const secret = require('./secret');

const router = express.Router();

router.use(signUpApi);
router.use(signInApi);
router.use(items)
router.use(users)
router.use(my_items)
router.use(secret)

module.exports = router;
