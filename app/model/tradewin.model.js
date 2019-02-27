var mongoose = require('mongoose');
var subSchema = mongoose.Schema({
 name:String,
 image:String,
 date:String,
 model:String,
 price:String,
 location:String,
 details:String
})
var subProdutsSchema = mongoose.Schema({
               _id:String,
               name: String,
                image: String,
               sub:[subSchema]
});

var tradewinSchema= mongoose.Schema({
        name: String,
        image: String,
        subcategory: [subProdutsSchema]
     
});

module.exports = mongoose.model('tradeWin',tradewinSchema,'productdetails');
