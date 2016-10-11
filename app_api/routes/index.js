var express = require('express');
var router = express.Router();
var ctrlItems = require('../controllers/items');
var ctrlAuth = require('../controllers/authentication');
//var ctrlUsers = require('../controllers/items')
var jwt = require('express-jwt'); //Require express-jwt module
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

//Items
//router.get('/items', ctrlItems.afsfdsf);
router.post('/items', ctrlItems.itemsCreate);
router.get('/items/:itemid', ctrlItems.itemsReadOne);
router.put('/items/:itemid', ctrlItems.itemsUpdateOne);
router.delete('/items/:itemid', ctrlItems.itemsDeleteOne);

//users

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;