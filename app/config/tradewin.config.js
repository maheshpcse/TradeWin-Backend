const port =4090;
const host = '127.0.0.1';
const dburl = 'mongodb://ds121373.mlab.com:21373/tradewin';
const user = 'tradewin';
const pass = 'tradewin1';
const authSource = 'tradewin';
const secret = 'supersecret';
module.exports={
  PORT : port,
  HOST : host,
  DBURL : dburl,
  USER:user,
  PASS:pass,
  AUTH:authSource,
  AUTHKEY:secret
};