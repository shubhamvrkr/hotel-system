"use strict";
class Emenu {

    constructor (db) {
		
        this.database = db;
		this.collectionName = "emenu";
	}
		
	addeMenu(req, res, next){
		
		var self = this;
		var id = req.body.food.id;
		var name = req.body.food.name;
		var price = req.body.food.price;
		var type = req.body.food.type;
		var category1 = req.body.food.category1;
		var category2 = req.body.food.category2;
		var img = req.body.food.img;
		var description = req.body.food.description;
			
		self.database.getObject(self.collectionName,{id:id},function(foodItem){
			
		
			if(foodItem!=null){
			
				res.status(409).json("eMenu item with same id already exists!!");
			
			}else{
				
				var foodObj = {
							"id":id,
							"name":name,
							"price":price,
							"type":type,
							"category1":category1,
							"category2":category2,
							"img":img,
							"description":description
						}
				self.database.saveObject(self.collectionName,foodObj,function(message,status){
					
					if(status){
						res.status(200).json("eMenu item added successfully");
					}else{
					
						res.status(500).json("Server error!! please try after some time");
					}
					
				})
				
			}
			
		});
	}
	geteMenu(req, res, next){
	
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
	
	updateeMenu(req, res, next){
	

		var self = this;
		var oldId = req.body.id
		var newFood = req.body.food
		var oldObj = {
			id:oldId
		}
		console.log(oldId)
		self.database.updateObject(self.collectionName,oldObj,newFood,function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Updation failed!! please try again");
				}else{
					res.status(200).json("eMenu details updated sucessfully");
				}
		})
	}

	deleteeMenu(req,res,next){
	
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
module.exports = Emenu;
