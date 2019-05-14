const mongoose = require('./app/model/db.connection');
const express = require('express');
const CONFIG = require('./app/config/tradewin.config.js');
const bodyParser = require('body-parser');
var tradewinRoute = require('./routers/tradewin.routes');
var userRoute = require('./routers/user');
var billRoute = require('./routers/bill');

var path = require('path');
let app = express();
app.set('port', CONFIG.PORT);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    next();
});
app.use('/uploads',express.static(path.join('uploads')))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/api',tradewinRoute);
app.use('/api',userRoute);
app.use('/api',billRoute);

app.listen(app.get('port'), function(req, res) {
  console.log("Server running....");
  console.log("magic happens on port " + app.get('port'));
});
