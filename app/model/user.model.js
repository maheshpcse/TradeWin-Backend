var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subSchema = mongoose.Schema({
  name: String,
  image: String,
  date: String,
  model: String,
  price: String,
  location: String,
  details: String
})
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  password:
  {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: Number,
  role: {
    type: String,
    "default": 'user'
  },
  isActive: {
    type: Boolean,
    "default": false
  },
  userName: {
    type: String
  },
  address: String,
  profileImg: String,
  dateofbirth: String,
  designation: String,
  cartList: [subSchema]

})
mongoose.model('User', userSchema, 'tradewin.userinfo');
