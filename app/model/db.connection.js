const mongoose = require('mongoose');
const CONFIG = require('../config/tradewin.config');

require('./user.model.js')
require('./tradewin.model.js');
require('./bill.model.js')
require('./enquiry.model')
const option = {
  user : CONFIG.USER,
  pass :  CONFIG.PASS,
  authSource:CONFIG.AUTH
}
module.exports = mongoose.connect(CONFIG.DBURL,option,function(err){
  if(err){
    console.log("err=>",err.name)
  }
});
var db = mongoose.connection;
db.on('error',console.error
.bind(console, 'Connection Erorr: Connection Failed!'));

db.once('open', () => {
  console.log("Mongooose Connection SuccessFull!!");
});
process.once('SIGUSR2', function() {
  gracefullShutdown(' nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2')
  });
});
process.on('SIGINT', function() {
  gracefullShutdown(' App terminating signal (SIGINT) ', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', function() {
  gracefullShutdown(' App terminating signal (SIGTERM)', () => {
    process.exit(0);
  });
});

function gracefullShutdown(message, callback) {
  mongoose.connection.close(function() {
    console.log("Mongooose is DisConnected with App Termination");
    console.log("Connection Intruption by" + message);
    callback();
  });
}
