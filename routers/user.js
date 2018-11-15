const express = require('express');
var router = express.Router();
var productData = require('../app/controller/user.controller.js');


router
.route('/validate')
.get(productData.validation);

router
.route('/login')
.post(productData.login);

router
.route('/register')
.post(productData.registration);

router
.route('/additems/:name')
.put(productData.addproducts);

router
.route('/getitems/:userId')
.get(productData.getcartproducts);

router
.route('/removeitems/:userId/:cartId')
.get(productData.removecartproducts);

module.exports=router;