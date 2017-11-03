"use strict";
class Login {

    constructor (db) {
        this.database = db;
	}
		
	login(req, res, next){
		
		var username = req.body.id;
		var password = req.body.key;
	
		console.log("username: ",username);
		console.log("password: ",password);
		if(username=="super-admin"){
		
			if(bcrypt.compareSync(password, "$2a$10$vGFW4Z5fRKtQJ6ka5CZMM.XU577EDvkHPHjPQJDhu40k5kpz4pdHe")){
				 
				 var payload = {id: username,role:"SUPERADMIN"};
				 var token = jwt.sign(payload, jwtOptions.secretOrKey);
				 res.status(200).json({message: "ok", data:{user:{"firstname":"Super","lastname":"Admin","role":"SUPERADMIN","contact":"www.hoteltabsystem.com"},token: token}});
			}else{
				res.status(422).json({message:"kindly check the provided credentials!!"});
			} 
		}else{
			 res.status(422).json({message:"kindly check the provided credentials!!"});
		}
	}
}
module.exports = Login;
