let dbconn = require('../model/db.connection');
const mongoose = require('mongoose');
var tradew = mongoose.model('tradeWin');
var multer = require('multer');
var FOLDER= './uploads/products';

var upload = multer({
  dest: FOLDER
}).single('files');
module.exports.getAllProducts= function(req,res){
 tradew
  .find()
  .exec((error,product)=>{
    console.log("found products ",product.length);
    res
    .status(200)
    .json(product)
  })
};

module.exports.getProductNames = function(req,res){
    tradew
   .find({},{"name":1,"_id":0})
   .exec((err,product)=>{
    console.log(product)
    res
    .status(200)
    .json(product);
  })
  }

  module.exports.getSubCategory=(req,res)=>{
    var name= req.params.name;
    console.log(name);
    var categoryId = req.params.categoryId;
    console.log(categoryId);
    tradew
        .findOne({name:name})
        .exec((error,doc)=>{
          console.log(doc);
    if(doc){
           var topic=doc.subcategory.id(categoryId);
          console.log(topic);
          if(topic){
            res
            .status(200)
            .json(topic)
          }else{
            res.json("No topic")
          }
  }else{
    console.log("Topic not found");
    res.json("")
  }
  })
  };


  module.exports.postProductDetails=(req,res)=>{
    var name= req.params.name;
    console.log(name);
    var subname = req.params.subname;
    console.log(subname);
    tradew
        .findOne({name:name})
        .exec((error,doc)=>{
          console.log(doc);
    if(doc){
           var topic=doc.subcategory.id(subname);
        let subtopic=  topic.sub.push(req.body)
        doc.save((err,finalresult)=>{
          console.log(finalresult);
          if(finalresult){
            res
            .status(200)
            .json(finalresult)
          }else{
            res.json("No topic")
          }
        })
  }else{
    console.log("Topic not found");
    res.json("")
  }
  })
  };



  module.exports.productImageUpload=(req,res)=>{
    var path = '';
    upload(req, res,function (err) {
      if (err) {
        console.log(err); // An error occurred when uploading
        return res.status(422).send("an Error occured")
      }
      console.log(req) //for complete file data
      path = "http://localhost:4090/"+req.file.path;
      console.log(path);
      res.json(path)
    })
  }


module.exports.getOneProducts = function(req,res){
var product = req.params.name;
console.log(product);

tradew
.findOne({name:product})
.exec(function(err,product){
  if (err) console.log(err);
  
  console.log("product is----",product)
  res
  .status(200)
  .json(product);
})
}


// module.exports.addNewproducts=(req,res)=>{
//   var trading=new tradeWin(req.body);
//   trading.save((error,product)=>{
//     if(error){
//       console.log(error);
//     }else{
//       res
//       .status(200)
//       .send("product Added successfully...!!")
//     }
//   })
// }

