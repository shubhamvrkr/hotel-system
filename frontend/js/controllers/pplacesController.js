tabletTab.controller('pplacesController', ['$scope', '$rootScope','$http','$cookieStore','$location','$timeout','Upload',
    function ($scope, $rootScope,$http,$cookieStore,$location,$timeout,Upload) {
    	 
	//console.log(google.maps)
	console.log("pplacescontroller");
	console.log($scope)
	var token = $cookieStore.get('token')
	if(token==null){
		$location.path("\homepage")
	}
	$scope.registeredPlaces=[];
	$scope.place = {};
	$scope.place.img = [];
	$scope.imgurls="";
	$scope.files=[];
	$scope.placetypes = ["BEACH","TEMPLE","CHURCH","MOSQUE","FORT","WATERFALL","PARK","SANTUARY","MUSEUM","LAKE","OTHER"];

	fetchRegisteredPlaces();
	
	$scope.addPlace = function(place){
		
			if($scope.chosenPlaceDetails){
				place.latitude = $scope.chosenPlaceDetails.geometry.location.lat();
				place.longitude = $scope.chosenPlaceDetails.geometry.location.lng();
			}
			
			place.type = place.type.toUpperCase();
			var header = getHeader();
			console.log(place)
			$http.post(APIURL+'/place',{place:place},{headers:header}).then((response)=>{
	
			
				$scope.place_response= response.data;
				$scope.registeredPlaces.push(place)
				$scope.clear()
			 
			},(err)=>{
			 
				$scope.place_response= err.data;
				
			});
		
		
		
	}
	
	$scope.clear = function(){
		
		$scope.place = {};
		$scope.place.img = [];
		$scope.files=[];
		$scope.imgurls="";
		$scope.place.type = $scope.placetypes[0];
		$scope.selectfile_response = ""
	}
	
	$scope.clearResponse = function(){
		
		$scope.place_response = '';
	}
	
	$scope.selectImages = function(){
		
		$scope.progress_value = 0;
		$scope.place.img = [];
		
		if($scope.imgurls.length==0 && $scope.files.length ==0){
			$scope.selectfile_response = "No images provided!!"
			
		}else{
				if($scope.imgurls.length >0){
					
					if($scope.imgurls.indexOf("http://") == 0 || $scope.imgurls.indexOf("https://") == 0){
					
						var imagesUrls = $scope.imgurls.split(",");
						
						for (var i = 0; i < imagesUrls.length; i++) {
							
							$scope.place.img.push(imagesUrls[i])
						}
						console.log("food_item.img: ",$scope.place.img)
						
					}else{
					
						$scope.selectfile_response = "Image urls are not valid!!"
					}
					
				}
				if($scope.files.length >0){
					
					$scope.progress_value = 1;
					$scope.selectfile_response = "Please wait..uploading images to server";
					
					var header = getHeader();
					 Upload.upload({
								url: APIURL+'/upload', 
								data:{files:$scope.files},
								headers:header
					}).then(function (resp) { 
					
							if(resp.status === 200){ //validate success
								console.log(resp)
								for(var index=0;index<resp.data.data.length;index++){
									console.log(resp.data.data[index])
									$scope.place.img.push(APIURL+'/'+resp.data.data[index])
								}
								$scope.progress_value = 0;
								$scope.selectfile_response = "files uploaded successfully";
							}
							
					}, function (error) { //catch error
							console.log(error);
				
							$scope.progress_value = 0;
							$scope.selectfile_response = error.data;
							
					}, function (evt) { 
									
							console.log(evt);
							$scope.progress_value = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
							console.log('progress: ' + $scope.progress_value + '% ');
					});
				
					
				}
		}		
	}

	$scope.editPlace = function(index){
		
		var tempplace = $scope.registeredPlaces[index]
		console.log("item fetched: ",tempplace)
		console.log("item index: ",index)
		$scope.newplace = angular.copy(tempplace);
		console.log("item copied: ",$scope.newplace)
		$scope.newPlaceIndex = index
		
	}
	
	$scope.deletePlace = function(index){
		
		var id = $scope.registeredPlaces[index].id;
		var header = getHeader();
		$http.delete(APIURL+'/place/'+id,{headers:header}).then((response)=>{

		
			$scope.registeredPlaces.splice(index,1);
			$scope.clear()
		 
		},(err)=>{
			 
			console.log(err);
				
		});
		
	}
	
	$scope.updatePlace = function(place,index){
		
		console.log("update staff" , index);
		if($scope.newchosenPlaceDetails){
				place.latitude = $scope.newchosenPlaceDetails.geometry.location.lat();
				place.longitude = $scope.newchosenPlaceDetails.geometry.location.lng();
		}
		var oldId = $scope.registeredPlaces[index].id
		var header = getHeader();
		place.type = place.type.toUpperCase();
		$http.put(APIURL+'/place',{id:oldId,place:place},{headers:header}).then((response)=>{

			
			$scope.modal_response= response.data;
			$scope.registeredPlaces[index] = place;
			$scope.clear()
		 
		},(err)=>{
			 
			$scope.modal_response= err.data;
				
		});
		
	}
	
	$scope.refresh = function(){
		
		fetchRegisteredPlaces();
	}

	function fetchRegisteredPlaces(){
		
		var header = getHeader();
		$http.get(APIURL+'/place',{headers:header}).then((response)=>{
	
				console.log(response)
				$scope.registeredPlaces =response.data
				
			},(err)=>{
				
				console.log(err)
		});
		
	}
	
	
	function getHeader(){
		var header = {
			"Authorization":"JWT "+token
		}
		return header;
	}
      
	 
}]);