"use strict";
class Places {

    constructor (db) {
		
        this.database = db;
		this.collectionName = "places";
	}
		
	addPlace(req, res, next){
		
		var self = this;
		var id = req.body.place.id;
		var name = req.body.place.name;
		var type = req.body.place.type;
		var address = req.body.place.address;
		var latitude = req.body.place.latitude;
		var longitude = req.body.place.longitude;
		var img = req.body.place.img;
		var description = req.body.place.description;
			
		self.database.getObject(self.collectionName,{id:id},function(placeItem){
			
		
			if(placeItem!=null){
			
				res.status(409).json("eMenu item with same id already exists!!");
			
			}else{
				
				var placeObj = {
							"id":id,
							"name":name,
							"type":type,
							"address":address,
							"latitude":latitude,
							"longitude":longitude,
							"img":img,
							"description":description
						}
				self.database.saveObject(self.collectionName,placeObj,function(message,status){
					
					if(status){
						res.status(200).json("eMenu item added successfully");
					}else{
					
						res.status(500).json("Server error!! please try after some time");
					}
					
				})
				
			}
			
		});
	}
	getPlace(req, res, next){
	
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
	
	updatePlace(req, res, next){
	

		var self = this;
		var oldId = req.body.id
		var newPlace = req.body.place
		var oldObj = {
			id:oldId
		}
		console.log(oldId)
		self.database.updateObject(self.collectionName,oldObj,newPlace,function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Updation failed!! please try again");
				}else{
					res.status(200).json("eMenu details updated sucessfully");
				}
		})
	}

	deletePlace(req,res,next){
	
		var self=this;
		var oldId = req.params.id
		console.log("id: ",oldId)
		self.database.deleteObject(self.collectionName,{id:oldId},function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Deletion failed!! please try again");
				}else{
					res.status(200).json("eMenu item deleted sucessfully");
				}
			
		});
	}
	
}
module.exports = Places;
