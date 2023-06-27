// login existing user
const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../db/models')

// make sure we get JWT_SECRET from .env
require('dotenv').config();

var passport = require("passport");
require('../auth/passport');

const router = express.Router();

// view all items (GET)
// no authentication needed
router.get("/items", function(req, res){
  console.log("View all items - GET /items")
  
  models.Items.findAll(
    {attributes: ['item_id','item_name','item_description','quantity']}
  ).then(function (items){
    res.send(items)
  }).catch(function (err){
    console.log("Error:" + err)
    res.status(204).json({message: err})
  })

});

// view item (GET)
// no authentication needed
router.get("/item/:id", function(req, res){
 console.log("View item - GET /item:id id="+req.params.id)

  const item = models.Items.findOne(
    {where: {
      item_id: req.params.id
      }
    }
  ).then(function (item){
    res.send(item)
  }).catch(function (err){
    console.log("Error:" + err)
    res.status(204).json({message: err})
  })

})

// CReate item (POST)
// requires authentication
router.post("/item", passport.authenticate('jwt', { session: false }), function(req, res){
console.log("CReate item - POST /item")
    //restructure req.user from jwt
    const { user_id, username } = req.user;

    models.Items.create({
      item_name: req.body.item_name,
      item_description: req.body.item_description,
      user_id: user_id,
      quantity: req.body.quantity
    }).then( (result) => res.json(result)
  )
})

// Update item (PUT)
// requires authentication
// Note: currently any authenticated user can update any item
router.put("/item/:id", passport.authenticate('jwt', { session: false }), function(req, res){
console.log("Update item - PUT /item:id id="+req.params.id)

  models.Items.update({
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    quantity: req.body.quantity
  },
  {where: {
    id: req.params.id
    }
  }).then( (result) => res.json(result)
  )
})

// Delete item (DELETE)
// requires authentication
// Note: currently any authenticated user can delete any item
router.delete("/item/:id", passport.authenticate('jwt', { session: false }), function(req, res){
console.log("Delete item - DELETE /item/:id id="+ req.params.id)
  models.Items.destroy({
    where: {
    id: req.params.id
    }
  }).then( (result) => res.json(result)
  )
})

module.exports = router;
