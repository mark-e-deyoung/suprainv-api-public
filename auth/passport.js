const passport = require('passport');
const passportJwt = require('passport-jwt');

const { ExtractJwt } = passportJwt;
const StrategyJwt = passportJwt.Strategy;
const models = require('../db/models');
//const Users = require('../db/models/Users');

// make sure we get JWT_SECRET from .env
require('dotenv').config();

// passport strategy
// see if the user id from the jwtPayload is
// in the database then done('no-err' with null, user)
// otherwise catch the error and done(err)
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    ((jwtPayload, done) => models.Users.findOne({ where: { user_id : jwtPayload.id } })
      .then((user) => done(null, user))
      .catch((err) => done(err)))
  )
);

module.exports = passport
