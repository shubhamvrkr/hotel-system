tabletTab.controller('emenuController', ['$scope', '$rootScope','$http','$cookieStore','$location','$timeout','Upload',
    function ($scope, $rootScope,$http,$cookieStore,$location,$timeout,Upload) {
    	 
	console.log("emenucontroller");
	console.log($scope)
	var token = $cookieStore.get('token')
	if(token==null){
		$location.path("\homepage")
	}
	$scope.registeredEmenuItems=[];
	
	$scope.food_item = {};
	$scope.food_item.img = [];
	$scope.imgurls="";
	$scope.files=[];
	$scope.foodtypes = ["VEG","NON_VEG"];
	$scope.foodcategory = ["BREAKFAST","RICE & MEALS","JUICES",
							"LUNCH & DINNER","CHAT ITEMS","RICE & MEALS",
							"PIZZA's & BURGER's","BEVERAGES"];
	
	fetchRegisteredEmenu();
	
	$scope.addeMenu = function(food_item){
		
			console.log(food_item.description)
			food_item.category1 = food_item.category1.toUpperCase();
			food_item.category2 = food_item.category2.toUpperCase();
			var header = getHeader();
			
			console.log(food_item)
			$http.post(APIURL+'/emenu',{food:food_item},{headers:header}).then((response)=>{
	
			
				$scope.emenu_response= response.data;
				$scope.registeredEmenuItems.push(food_item)
				$scope.clear()
			 
			},(err)=>{
			 
				$scope.emenu_response= err.data;
				
			});
		
		
		
	}
	
	$scope.clear = function(){
		
		$scope.food_item = {};
		$scope.food_item.img = [];
		$scope.files=[];
		$scope.imgurls="";
		$scope.food_item.type = $scope.foodtypes[0];
		$scope.food_item.category1 = $scope.foodcategory[0];
		$scope.selectfile_response = ""
	}
	
	$scope.clearResponse = function(){
		
		$scope.emenu_response = '';
	}
	
	$scope.selectImages = function(){
		
		$scope.progress_value = 0;
		$scope.food_item.img = [];
		
		if($scope.imgurls.length==0 && $scope.files.length ==0){
			$scope.selectfile_response = "No images provided!!"
			
		}else{
				if($scope.imgurls.length >0){
					
					if($scope.imgurls.indexOf("http://") == 0 || $scope.imgurls.indexOf("https://") == 0){
					
						var imagesUrls = $scope.imgurls.split(",");
						
						for (var i = 0; i < imagesUrls.length; i++) {
							
							$scope.food_item.img.push(imagesUrls[i])
						}
						console.log("food_item.img: ",$scope.food_item.img)
						
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
									$scope.food_item.img.push(APIURL+'/'+resp.data.data[index])
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

	$scope.editeMenu = function(index){
		
		var tempfood = $scope.registeredEmenuItems[index]
		console.log("item fetched: ",tempfood)
		console.log("item index: ",index)
		$scope.newfood = angular.copy(tempfood);
		console.log("item copied: ",$scope.newfood)
		$scope.newFoodIndex = index
		
	}
	
	$scope.deleteeMenu = function(index){
		
		var foodid = $scope.registeredEmenuItems[index].id;
		var header = getHeader();
		$http.delete(APIURL+'/emenu/'+foodid,{headers:header}).then((response)=>{

		
			$scope.registeredEmenuItems.splice(index,1);
			$scope.clear()
		 
		},(err)=>{
			 
			console.log(err);
				
		});
		
	}
	
	$scope.updateFood = function(food,index){
		
		console.log("update staff" , index);
		var oldId = $scope.registeredEmenuItems[index].id
		var header = getHeader();
		food.category1 = food.category1.toUpperCase();
		food.category2 = food.category2.toUpperCase();
		$http.put(APIURL+'/emenu',{id:oldId,food:food},{headers:header}).then((response)=>{

			
			$scope.modal_response= response.data;
			$scope.registeredEmenuItems[index] = food;
			$scope.clear()
		 
		},(err)=>{
			 
			$scope.modal_response= err.data;
				
		});
		
	}
	
	$scope.refresh = function(){
		
		fetchRegisteredEmenu();
	}
	function fetchRegisteredEmenu(){
		
		var header = getHeader();
		
		$http.get(APIURL+'/emenu',{headers:header}).then((response)=>{
	
				console.log(response)
				$scope.registeredEmenuItems =response.data
				
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