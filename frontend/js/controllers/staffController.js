tabletTab.controller('staffController', ['$scope', '$rootScope','$http','$cookieStore','$location',
    function ($scope, $rootScope,$http,$cookieStore,$location) {
    	 
	console.log("staffcontroller");
	var token = $cookieStore.get('token')
	if(token==null){
		$location.path("\homepage")
	}
	$scope.staff={};
	$scope.addstaff_response = '';
	$scope.registeredStaff=[]
	//console.log($scope.registeredStaff.length)
	fetchRegisteredStaff();
	$scope.addStaff = function(staff){
		
			staff.role = staff.role.toUpperCase()
			var header = getHeader();
			
			$http.post(APIURL+'/staff',{staff:staff},{headers:header}).then((response)=>{
	
			
				$scope.addstaff_response= response.data;
				$scope.registeredStaff.push(staff)
				$scope.clear()
			 
			},(err)=>{
			 
				$scope.addstaff_response= err.data;
				
			});
			
		
		
	}
	$scope.clear = function(){
		
		$scope.staff={};
	}
	
	$scope.clearResponse = function(){
		
		$scope.addstaff_response = '';
	}
	$scope.editStaff = function(index){
		
		var tempstaff = $scope.registeredStaff[index]
		console.log("item fetched: ",tempstaff)
		console.log("item index: ",index)
		$scope.newstaff = angular.copy(tempstaff);
		console.log("item copied: ",$scope.newstaff)
		$scope.newStaffIndex = index
		
	}
	
	$scope.updateStaff = function(staff,index){
		
		console.log("update staff");
		var oldId = $scope.registeredStaff[index].id
		var header = getHeader();
		staff.role = staff.role.toUpperCase();
		$http.put(APIURL+'/staff',{id:oldId,staff:staff},{headers:header}).then((response)=>{

			
			$scope.modal_response= response.data;
			$scope.registeredStaff[index] = staff;
			$scope.clear()
		 
		},(err)=>{
			 
			$scope.modal_response= err.data;
				
		});
		
	}
	
	$scope.deleteStaff = function(index){
		
		var staffid = $scope.registeredStaff[index].id;
		var header = getHeader();
		$http.delete(APIURL+'/staff/'+staffid,{headers:header}).then((response)=>{

		
			$scope.registeredStaff.splice(index,1);
			$scope.clear()
		 
		},(err)=>{
			 
			 console.log(err)
				
		});
		
	}
	
	$scope.refresh = function(){
		
		console.log("refreshed clicked")
		fetchRegisteredStaff();
	}
	
	function fetchRegisteredStaff(){
		
		var header = getHeader();
		
		$http.get(APIURL+'/staff',{headers:header}).then((response)=>{
	
				//console.log(response)
				$scope.registeredStaff =response.data
				
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