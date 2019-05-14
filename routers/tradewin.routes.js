const express = require('express');
var router = express.Router();
var productData = require('../app/controller/tradewin.controller.js');

router
.route('/product')
.get(productData.getAllProducts);

router
.route('/product/products')
.get(productData.getProductNames);

router
.route('/product/:name')
.get(productData.getOneProducts);

router
.route('/product/:name/:categoryId')
.get(productData.getSubCategory);
 
router
.route('/product/newproduct/:name/:subname')
.post(productData.postProductDetails)

router
.route('/product/uploadProduct')
.post(productData.productImageUpload)

module.exports = router;
