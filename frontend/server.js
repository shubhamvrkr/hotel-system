var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// define the paths for Scripts/partials/js etc
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/partials", express.static(__dirname + '/partials'));

app.get('/', function (req, res) {
  res.sendfile("index.html");
});


app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json());

// Define the port
app.listen(9090);
console.log('Fronted server on port: 9090');
