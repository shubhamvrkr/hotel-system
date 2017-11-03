tabletTab.controller('roomController', ['$scope', '$rootScope','$http','$cookieStore','$location',
    function ($scope, $rootScope,$http,$cookieStore,$location) {
    	 
	console.log("roomcontroller");
	var token = $cookieStore.get('token')
	if(token==null){
		$location.path("\homepage")
	}
	$scope.room={};
	$scope.addroom_response = '';
	$scope.registeredRoom=[]
	//console.log($scope.registeredStaff.length)
	fetchRegisteredRoom();
	$scope.addRoom = function(room){
		
			room.type = room.type.toUpperCase()
			var header = getHeader();
			
			$http.post(APIURL+'/room',{room:room},{headers:header}).then((response)=>{
	
			
				$scope.addroom_response= response.data;
				$scope.registeredRoom.push(room)
				$scope.clear()
			 
			},(err)=>{
			 
				$scope.addroom_response= err.data;
				
			});
			
		
		
	}
	$scope.clear = function(){
		
		$scope.room={};
	}
	
	$scope.clearResponse = function(){
		
		$scope.addroom_response = '';
	}
	$scope.editRoom = function(index){
		
		var temproom = $scope.registeredRoom[index]
		console.log("item fetched: ",temproom)
		console.log("item index: ",index)
		$scope.newroom = angular.copy(temproom);
		console.log("item copied: ",$scope.newroom)
		$scope.newRoomIndex = index
		
	}
	
	$scope.updateRoom = function(room,index){
		
		console.log("update staff" , index);
		var oldId = $scope.registeredRoom[index].id
		var header = getHeader();
		room.type = room.type.toUpperCase();
		$http.put(APIURL+'/room',{id:oldId,room:room},{headers:header}).then((response)=>{

			
			$scope.modal_response= response.data;
			$scope.registeredRoom[index] = room;
			$scope.clear()
		 
		},(err)=>{
			 
			$scope.modal_response= err.data;
				
		});
		
	}
	function fetchRegisteredRoom(){
		
		var header = getHeader();
		
		$http.get(APIURL+'/room',{headers:header}).then((response)=>{
	
				//console.log(response)
				$scope.registeredRoom =response.data
				
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