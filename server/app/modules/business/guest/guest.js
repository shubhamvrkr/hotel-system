"use strict";
class Guest {

    constructor (db) {
		
        this.database = db;
		this.collectionName = "guests";
	}
		
	registerGuest(req, res, next){
		
		var self = this;
		var canBook = true;
		
		var guest = req.body.guest;
		guest.registration = Math.floor(new Date().getTime()/1000000)*1000;
		
		var todaysTime = new Date().getTime();
		console.log("guestcheckin: ", guest.checkin ," ",new Date(guest.checkin))
		console.log("guestcheckout: ", guest.checkout ," ",new Date(guest.checkout))
		
		var condition = {
			"checkin":1,
			"checkout":1
		}
		self.database.getObjectOnCondition(self.collectionName,{roomno:guest.roomno ,"checkout": { $gte: todaysTime }},condition,function(err,registrations){
			
				if(err){
					console.log(err)
				}else{
					
					for(var i=0;i<registrations.length;i++){
						
						var reg = registrations[i];
						if(guest.checkin<=reg.checkout && guest.checkout >= reg.checkin){
							canBook = false;
						}
					}
					if(canBook){
						
						self.database.saveObject(self.collectionName,guest,function(message,status){
					
								if(status){
									res.status(200).json("Room booked successfully");
								}else{
								
									res.status(500).json("Server error!! please try after some time");
								}
					
						})
						
					}else{
						
						res.status(422).json("Room not available on selected dates.");
						
					}
				}
			
		});
		
	}
	
	getGuests(req, res, next){
	
		var self = this;
		var fields = {
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


	updateGuest(req, res, next){
	

		var self = this;
		var oldId = req.body.id
		var newGuest = req.body.guest
		var oldObj = {
			_id:oldId
		}
		console.log(oldId)
		self.database.updateObject(self.collectionName,oldObj,newGuest,function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Updation failed!! please try again");
				}else{
					res.status(200).json("Guest registration details updated sucessfully");
				}
		})
	}
	
	deleteGuest(req,res,next){
	
		var self=this;
		var oldId = req.params.id
		console.log("id: ",oldId)
		self.database.deleteObject(self.collectionName,{_id:oldId},function(err,results){
			
				if(err){
					console.log(err);
					res.status(400).json("Deletion failed!! please try again");
				}else{
					res.status(200).json("Guest registration item deleted sucessfully");
				}
			
		});
	}
}
module.exports = Guest;
