"use strict";
class DatabaseConnector {

	
    constructor (host,port) {
       var self  =this;
	   //initialize the connection with the database
	  // console.log(host+":"+port+"/test")
	   MongoClient.connect(host+":"+port+"/hoteltab", function(err, db) {
		   
			if(err){
				console.log("error: ",err)
			}else{
				
				self.db = db;
				//create required collections
				db.createCollection("staff", function(err, res) {
					if(err){
						console.log("error: ",err)
					}
					db.createCollection("room", function(err, res) {
						if(err){
							console.log("error: ",err)
						}
						db.createCollection("emenu", function(err, res) {
							if(err){
								console.log("error: ",err)
							}
					
						});
					
					});
				});
			}
		  
	   });
    }
	
	getObject(collectionname,obj,callback){
		
		 var collection = this.db.collection(collectionname);
		 collection.find(obj, {$exists: true}).toArray(function(err, doc){   
			if(doc.length>0) 
			{
				callback(doc)
			}
			else{
				callback(null)
			}
		});
		
	}
	
	saveObject(collectionname,obj,callback){
		
		 var collection = this.db.collection(collectionname);
		 collection.insertOne(obj, function(err,result){
			 if(err){
				 callback(err,false)
			 }
			callback("saved",true)
		 });
	}
	
	getObjects(collectionname,obj,callback){
		
		var collection = this.db.collection(collectionname)
		collection.find({},obj).toArray(function(err, result) {
			if (err){
				callback(err,null)
			}else{
				callback(null,result)
			}
		});
		
	}
	
	updateObject(collectionname,oldObj,newObj,callback){
		
		var collection = this.db.collection(collectionname)
		collection.updateOne(oldObj,newObj,{upsert:true},function(err,res){
			if (err){
				callback(err,false)
			}else{
				callback(null,true)
			}
		});
		
	}
	
	deleteObject(collectionname,obj,callback){
		
		var collection = this.db.collection(collectionname)
		collection.remove(obj,function(err,res){
			if (err){
				callback(err,false)
			}else{
				callback(null,true)
			}
		});
		
	}
}
module.exports = DatabaseConnector;
