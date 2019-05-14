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
.route('/getUserProfile/:id')
.get(productData.getUserDoc)

router
.route('/additems/:name')
.put(productData.addproducts);

router
.route('/updateUserProfile/:userId')
.put(productData.updateUserDoc);

router
.route('/getitems/:userId')
.get(productData.getcartproducts);

router
.route('/uploadImage/:userId')
.post(productData.fileUploader)

router
.route('/removeitems/:userId/:cartId')
.get(productData.removecartproducts);

router
.route('/enquiry')
.post(productData.postEnquiryData);

module.exports=router;