tabletTab.controller('roombookingController', ['$scope', '$rootScope','$http','$cookieStore','$location',
    function ($scope, $rootScope,$http,$cookieStore,$location) {
    	 
	console.log("roombookingController");
	var token = $cookieStore.get('token')
	if(token==null){
		$location.path("\homepage")
	}
	$scope.guest={};
	$scope.roomclasses = ["AC","NON-AC"];
	$scope.roomtypes = ["CF","SF"];
	$scope.availablerooms = [];
	$scope.registerguest_response = '';
	$scope.registeredGuests=[]

	fetchRegisteredGuests();
	$scope.registerGuest = function(guest){
		
			console.log(guest)
			if( guest.roomno && guest.name && guest.email && guest.contact && guest.address
				&& guest.adults>=1 && guest.childrens>=0 && guest.nights>=1&& guest.checkin && guest.checkout && guest.roomtype && guest.roomclass){
				
				guest.checkin =  new Date(guest.checkin).getTime();
				guest.checkout =  new Date(guest.checkout).getTime();
				guest.checkoutstatus = 0;
				console.log(guest)
				var header = getHeader();
				
				$http.post(APIURL+'/guests',{guest:guest},{headers:header}).then((response)=>{
		
				
					$scope.registerguest_response= response.data;
					$scope.registeredGuests.push(guest)
					$scope.clear()
				 
				},(err)=>{
				 
					$scope.registerguest_response= err.data;
					
				});
			}else{
				$scope.registerguest_response= "All fields are mandatory!!";
			}
		
		
	}
	$scope.clear = function(){
		
		$scope.guest={};
		//reload the room summary
		var header = getHeader();
		$http.get(APIURL+'/room/summary',{headers:header}).then((response)=>{

			console.log(response)
			console.log(response)
			$scope.availablerooms =response.data
			
			
		},(err)=>{
			
			console.log(err)
		});	
	}
	
	$scope.clearResponse = function(){
		
		$scope.registerguest_response = '';
	}
	
	$scope.editguestRegistration = function(index){
		
		var tempguest = $scope.registeredGuests[index]
		console.log("item fetched: ",tempguest)
		console.log("item index: ",index)
		$scope.newguest = angular.copy(tempguest);
		console.log("item copied: ",$scope.newguest)
		$scope.newGuestIndex = index
		
	}
	
	$scope.updateRegistration = function(guest,index){
		
		console.log("update staff");
		var oldId = $scope.registeredGuests[index]._id
		var header = getHeader();
		
		$http.put(APIURL+'/guests',{id:oldId,guest:guest},{headers:header}).then((response)=>{

			
			$scope.modal_response= response.data;
			$scope.registeredGuests[index] = guest;
			$scope.clear()
		 
		},(err)=>{
			 
			$scope.modal_response= err.data;
				
		});
		
	}
	
	$scope.deleteStaff = function(index){
		
		var guestid = $scope.registeredStaff[index]._id;
		var header = getHeader();
		$http.delete(APIURL+'/guests/'+guestid,{headers:header}).then((response)=>{

		
			$scope.registeredGuests.splice(index,1);
			$scope.clear()
		 
		},(err)=>{
			 
			 console.log(err)
				
		});
		
	}
	
	$scope.refresh = function(){
		
		console.log("refreshed clicked")
		fetchRegisteredGuests();
	}
	
	function fetchRegisteredGuests(){
		
		var header = getHeader();
		
		$http.get(APIURL+'/guests',{headers:header}).then((guest_response)=>{
	
				console.log(guest_response)
				$scope.registeredGuests = guest_response.data
							
		},(err)=>{
				
				console.log(err)
		});
					
		$http.get(APIURL+'/room/summary',{headers:header}).then((response)=>{

			console.log(response)
			$scope.availablerooms =response.data
			
			
		},(err)=>{
			
			console.log(err)
		});	
		
	}
	
	$scope.checkAvalibility = function(type, roomclass, checkin, checkout){
		
		return function(item) {
			
			var returnflag = true;
			if(type){
				if(item.type==type){
					returnflag = true;
				}else{
					returnflag = false;
				}
			}
			if(roomclass){
				if(item.class==roomclass){
					returnflag = true;
					
				}else{
					returnflag = false;
				}
			}
			if(checkin && checkout){

				var temp_checkin = new Date(checkin).getTime()
				var temp_checkout = new Date(checkout).getTime()
				for(var i=0;i<item.output.length;i++){
						
					var bookedstats = item.output[i];
					if(temp_checkin<=bookedstats.checkout && temp_checkout >= bookedstats.checkin){
							
						returnflag = false;
					}
				}
			}
			return returnflag;
		
		}
		
	}
	
	function getHeader(){
		var header = {
			"Authorization":"JWT "+token
		}
		return header;
	}
      
}]);
