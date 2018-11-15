var CONFIG = require("../config/tradewin.config");
var mongoose = require('mongoose')
// var User = require('../model/user.model')
var User = mongoose.model('User');
// var CONFIG =require("mongodb");
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");


module.exports.registration = (req, res) => {
  // var token = jwt.sign({id:userid})
  // if (!req.body || req.body.firstName || req.body.email || req.body.password || req.body.number) {
  //   return res.status(500).send({
  //     auth: false,
  //     message: "Please fill the required(*) feilds"
  //   });
  // }
  var password = bcryptjs.hashSync(req.body.password);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    phoneNumber: req.body.phoneNumber
  });
  console.log("user=", user)
  user.save(function(err, user) {
    console.log("doc=", user)
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to register a user email is taken"
      });
    }
    console.log("id=", user._id + "key= ", CONFIG.AUTHKEY);
    var token = jwt.sign({
      _id: user._id
    }, CONFIG.AUTHKEY, {
      expiresIn: 1800
    });
    res.status(200)
      .send({
        auth: true,
        user: user.name,
        role: user.role,
        id:user._id,
        status: user.isActive,
        message: "Registration successful",
        token: token
      });
  })
}

module.exports.validation = (req, res, next) => {
  var token = req.headers['x-access-token'];
  //console.log(token);
  if (!token || token == null) {
    return res.status(404).send({
      auth: false,
      message: "Token Not Found !"
    })
  }
  jwt.verify(token, CONFIG.AUTHKEY, function(err, doc) {
    if (err) {
      return res.status(401).json({
        auth: false,
        // message:"Failed to authenticate Token {Unatherized}"
        message: "Session is expired.Please Login again",
        token: null
      })
    }
    //console.log("Id:  ",doc._id)
    User.findById(doc._id, {
      password: false
    }, function(err, user) {
      if (err) {
        return res.status(500).send("Here was problem while Fetching a user record")
      }
      if (!user) {
        return res.status(404).json({
          auth: false,
          message: "User Not Found"
        });
      }
      // res.status(200).send(user)
      next();
    })
  })
}


module.exports.login = (req, res) => {
  // console.log(req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(500).send({
      message: "Username and Password can not be Empty",
      auth: false
    })
  }
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send({
      auth: false,
      message: "Internal server Error"
    });
    if (!user) return res.status(404).send({
      auth: false,
      message: "Not a Register User get Registered it's Free"
    });
    var isPwdMatch = bcryptjs.compareSync(req.body.password, user.password)
    if (!isPwdMatch) {
      return res.status(401).send({
        auth: false,
        message: "Password Not Match",
        token: null
      })
    }
    var token = jwt.sign({
      _id: user._id
    }, CONFIG.AUTHKEY, {
      expiresIn: 3600
    })
    res.status(200)
      .send({
        auth: true,
        user: user.firstName,
        role: user.role,
        id:user._id,
        status: user.isActive,
        message: "Login Successful",
        token: token
      })
  })
}

module.exports.getUserInfo = (req, res) => {
  User
    .find()
    .exec((error, doc) => {
      res
        .status(200)
        .json(doc)
    });
}

module.exports.getUserDoc = (req, res) => {
  var username = req.params.name;
  User
    .findOne({
      name: username
    })
    .exec((error, doc) => {
      res
        .status(200)
        .json(doc)
    })
}

module.exports.updateUserDoc = (req, res) => {
  var user = req.body;
  var userId = req.params.userId;
  User.findByIdAndUpdate(userId, {
    $set: user
  }, {
    new: true
  }, function(err, user) {
    if (err) return handleError(err);
    res
      .status(200)
      .json(user);
  });
}




module.exports.updatepassword = (req, res) => {
    // console.log(req.body);
var password = bcryptjs.hashSync(req.body.passwordData.password);
User.findOneAndUpdate({ _id: req.body.id },{ $set: { password: password,conpassword:req.body.passwordData.confirmpassword}},{new:true})
        .then((response) => {
           // console.log(response)
           if(res){
              res
              .status(200)
              .json({
                   status: true,
                   message: "sucessfully set your password"
                    })
             }else{
              res
              .status(500)
              .json({
                   message:"Your password is not updated"
              })
              }
            })
}


module.exports.addproducts=(req,res)=>{
 var userId=req.params.name;
 console.log(userId);
 console.log(req.body);
 User
.findById(userId,function(error,user){
if(error) return handleError(error);
user.cartList.push(req.body);
user.save((err,user)=>{
  // if(err) return handleError(err);
  res.send(user)
})
})
}

module.exports.getcartproducts = function(req,res){
  var userId=req.params.userId
  
  User
 .findById({"_id":userId},{"cartList":1},{"_id":0})
 .exec((err,product)=>{
  console.log(product)
  res
  .status(200)
  .json(product);
})
}

module.exports.removecartproducts = function(req,res){
  var userId=req.params.userId;
  var cartId=req.params.cartId;
 User
.updateOne({"_id":userId },
  { $pull: { cartList: { _id: cartId } } }
).exec((err,product)=>{
    console.log(product)
    res
    .status(200)
    .json({message:"product removed successfully"});
  })
}