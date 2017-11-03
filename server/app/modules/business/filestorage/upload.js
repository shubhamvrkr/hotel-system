"use strict";
class Upload {

    constructor () {
		
        this.storage = multer.diskStorage({
        
			destination: function (req, file, cb) {
				cb(null, './uploads/')
			},
			filename: function (req, file, cb) {
				
				console.log("file object: ",file);
				var datetimestamp = Date.now();
				cb(null, file.originalname.substring(0,file.originalname.indexOf(".")) + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
			}
		});
		
	}
	upload(req, res, next){
		 console.log("Hello")
		 var paths=[]
		 var upload = multer({storage: this.storage}).any();
		 upload(req, res,function(err){
			 
			 if(err){
				 res.status(500).json({message:"Failed uploading files!! please try after some time."});
			 }
			// console.log(req)
			 for(var i=0 ;i< req.files.length;i++){
				 paths.push(req.files[i].path)
			 }
			 console.log(paths)
			 res.status(200).json({message:"OK",data:paths});
		 })
		 
	}
	
}
module.exports = Upload;
