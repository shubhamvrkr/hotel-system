const log4js = require('log4js');
logger = log4js.getLogger('TabletTabSystem');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet')
multer = require('multer');
var cookieParser = require('cookie-parser')
jwt = require('jsonwebtoken');
const compression = require('compression');
const hpp = require('hpp');
passport = require("passport");
const passportJWT = require("passport-jwt");
bcrypt = require('bcrypt');
MongoClient = require('mongodb').MongoClient;

CONFIG = require('./config.json');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

//secretKey
jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = CONFIG.secret;

var restrictedURLs = ["/staff"]

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  
	console.log('payload received', jwt_payload.id);

	 user = {
		 "id":jwt_payload.id,
		 "role":jwt_payload.role
	 }

    next(null, user);
	
  
});


function isRestrictedUrls(url){
	for(var i=0;i<restrictedURLs.length;i++){
		if(restrictedURLs[i]==url){
			return true
		}
	}
	return false;
}

authorization = function(req, res, next){
	
	console.log("authorizing")
	if(req.user.role=="SUPERADMIN" || req.user.role=="ADMIN" ){
		
		console.log(req.user.role)
		 next(null, req.user);
		
	}else{
		
		//if(isRestrictedUrls(req.url)){
			
		//	res.status(400).json("Authorization failure!!");
			
		//}else{
			
			next(null, req.user);
		//}
	}
}

passport.use(strategy);


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/uploads", express.static(__dirname + '/uploads'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(passport.initialize());


app.use(function (req, res, next) {
	
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

	next();
});
require('./app/routes.js')(app);
app.listen(9091);
console.log('Tablet tab server listening on port ' + 9091);






