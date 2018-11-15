const express = require('express');
var router = express.Router();
var cartData = require('../app/controller/bill.controller.js');

router
.route('/addbill/:userId')
.post(cartData.storeBill);


module.exports=router;