"use strict";
class Room {

    constructor (db) {
		
        this.database = db;
		this.collectionName = "room";
	}
		
	addRoom(req, res, next){
		
		var self = this;
		var id = req.body.room.id;
		var type = req.body.room.type;
		var tabid = req.body.room.tabid;
		
		self.database.getObject(self.collectionName,{id:id},function(room){
			
		
			if(room!=null){
			
				res.status(409).json("Room with same id already exists!!");
			
			}else{
				
				var roomObj = {
					"id":id,
					"type":type,
					"tabid":tabid
				}
				self.database.saveObject(self.collectionName,roomObj,function(message,status){
					
					if(status){
						res.status(200).json("Room added successfully");
					}else{
					
						res.status(500).json("Server error!! please try after some time");
					}
					
				})
				
			}
			
		});
	}
	getRoom(req, res, next){
	
		var self = this;
		
		var fields ={
			_id:false
		}
		self.database.getObjects(self.collectionName,fields,function(err,results){
			
				if(err){
					console.log(err);
					res.status(500).json("Server error!! please try after some time");
				}else{
					res.status(200).json(results);
				}
		})
	}
	updateRoom(req, res, next){
	

		var self = this;
		var oldId = req.body.id
		var newRoom = req.body.room
		var oldObj = {
			id:oldId
		}
		console.log(oldId)
		self.database.updateObject(self.collectionName,oldObj,newRoom,function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Updation failed!! please try again");
				}else{
					res.status(200).json("Room details updated sucessfully");
				}
		})
	}

	deleteRoom(req,res,next){
	
		var self=this;
		var oldId = req.params.id
		console.log("id: ",oldId)
		self.database.deleteObject(self.collectionName,{id:oldId},function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Deletion failed!! please try again");
				}else{
					res.status(200).json("room deleted sucessfully");
				}
			
		});
	}
}
module.exports = Room;
