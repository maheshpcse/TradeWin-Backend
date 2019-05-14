var mongoose= require('mongoose');

var enquirySchema=new mongoose.Schema({
    name:String,
    email:String,
    comment:String,
    subject:String,
})

mongoose.model('enquiry',enquirySchema,'tradewin.enquiry');