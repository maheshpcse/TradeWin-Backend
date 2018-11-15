var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cartSchema = mongoose.Schema({
  name: String,
  image: String,
  date: String,
  model: String,
  price: String,
  location: String,
  details: String
})
var billSchema = new Schema({
  userId: String,
  status:{
    type:String,
    "default":"unpaid"
  },
  total:Number,
  gst:Number,
  vat:Number,
  billAmount:Number,
  billItems:[cartSchema] 
})
mongoose.model('Bill', billSchema, 'tradewin.bills');