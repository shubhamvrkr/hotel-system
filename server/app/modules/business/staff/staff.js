"use strict";
class Staff {

    constructor (db) {
		
        this.database = db;
		this.collectionName = "staff";
	}
		
	addStaff(req, res, next){
		
		var self = this;
		var id = req.body.staff.id;
		var firstname = req.body.staff.firstname;
		var lastname = req.body.staff.lastname;
		var role = req.body.staff.role;
		var contact = req.body.staff.contact;
		var password = req.body.staff.password;

		var salt = bcrypt.genSaltSync(10);
		var passhash = bcrypt.hashSync(password, salt);
		
		
		self.database.getObject(self.collectionName,{id:id},function(staffUser){
			
			console.log('staffuser: ',staffUser)
			if(staffUser!=null){
			
				res.status(409).json("Staff member with same id already exists!!");
			
			}else{
				
				var staffObj = {
					"id":id,
					"firstname":firstname,
					"lastname":lastname,
					"role":role,
					"contact":contact,
					"passhash":passhash
				}
				self.database.saveObject(self.collectionName,staffObj,function(message,status){
					
					if(status){
						res.status(200).json("Staff member added successfully");
					}else{
					
						res.status(500).json("Server error!! please try after some time");
					}
					
				})
				
			}
			
		});
	}
	getStaff(req, res, next){
	
		var self = this;
		
		var fields ={
			passhash:false,
			_id:false
		}
		self.database.getObjects(self.collectionName,fields,function(err,results){
			
				console.log("result: ",results)
				if(err){
					console.log(err);
					res.status(500).json("Server error!! please try after some time");
				}else{
					res.status(200).json(results);
				}
		})
	}
	updateStaff(req, res, next){
	

		var self = this;
		var oldId = req.body.id
		var newStaff = req.body.staff
		var oldObj = {
			id:oldId
		}
		console.log(oldId)
		self.database.updateObject(self.collectionName,oldObj,newStaff,function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Updation failed!! please try again");
				}else{
					res.status(200).json("Staff details updated sucessfully");
				}
		})
	}
	
	deleteStaff(req,res,next){
	
		var self=this;
		var oldId = req.params.id
		console.log("id: ",oldId)
		self.database.deleteObject(self.collectionName,{id:oldId},function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Deletion failed!! please try again");
				}else{
					res.status(200).json("Staff deleted sucessfully");
				}
			
		});
	}
}
module.exports = Staff;
