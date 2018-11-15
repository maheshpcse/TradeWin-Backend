let dbconn = require('../model/db.connection');
const mongoose = require('mongoose');
var Bill = mongoose.model('Bill');

module.exports.storeBill = (req, res) => {
    var billdata = new Bill({
        userId:req.params.userId,
        billItems:req.body.billItems,
        total:req.body.total,
        gst:req.body.gst,
        vat:req.body.vat,
        billAmount:req.body.billAmount    
    });
    billdata.save(function (err, doc) {
        if (err) return console.log(err);
        res
        .status(200)
        .send({
            doc:doc,
            message:"Bill payment is done !"
        })
        
    })
}

// module.exports.generateBill = (req, res) => {
//     Bill
//     .findOne({userId:req.params.userId})
//     .exec((err,res)=>{
//     if (err) return handle

//     })
// }



