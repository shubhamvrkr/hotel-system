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
							db.createCollection("places", function(err, res) {
								if(err){
									console.log("error: ",err)
								}
								db.createCollection("guests", function(err, res) {
									if(err){
										console.log("error: ",err)
									}
						
								});
					
							});
					
						});
					
					});
				});
			}
		  
	   });
    }
	
	getObject(collectionname,obj,callback){
		
		 var collection = this.db.collection(collectionname);
		 collection.find(obj).toArray(function(err, doc){   
			if(doc.length>0) 
			{
				callback(doc)
			}
			else{
				callback(null)
			}
		});
		
	}
	
	getObjectSummary(collectionname,joincollectionName,obj,fields,callback){
		
		var collection = this.db.collection(collectionname);
		var agg_arr = [];
		var lookup = { $lookup:
						   {
							 from: joincollectionName,
							 localField: obj.localfield,
							 foreignField: obj.foreignfield,
							 as: obj.as
						   }
					}
		agg_arr.push(lookup)
	
		var project = {};
		project.$project = {}
		project.$project["_id"]=0
		project.$project[obj.localfield]=1
		for(var i in fields){
			console.log(i)
			project.$project[fields[i]]=1
		}
		project.$project[obj.as] = { 
									  $filter: 
									  { 
										input: "$"+obj.as, 
										as:'temp', 
										cond: { $gte: [ "$$temp."+obj.conditionfield, obj.conditionvalue ] } 
									  } 
								}
		agg_arr.push(project)
		
		collection.aggregate(agg_arr, function(err, res) {
			
			callback(err,res)
			
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

	getObjectOnCondition(collectionname,obj,condition,callback){
		
			var collection = this.db.collection(collectionname)
			collection.find(obj,condition).toArray(function(err, result) {
				if (err){
					callback(err,null)
				}else{
					callback(null,result)
				}
			});
			
		
	}
	
}
module.exports = DatabaseConnector;
