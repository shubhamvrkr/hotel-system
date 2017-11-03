tabletTab.controller('homepageController', ['$scope', '$rootScope','$http','$cookieStore','$location',
    function ($scope, $rootScope,$http,$cookieStore,$location) {
    	 
	$scope.Login = function(){
		
		var username = $scope.username
		var password = $scope.password;
		 $http.post(APIURL+'/login',{id:username,key:password}).then((response)=>{
	
				
				$cookieStore.put('token', response.data.data.token);
				$cookieStore.put('user', response.data.data.user);
				console.log(response.data.data.user);
				$location.path("/dashboard");
				
	
			 
		 },(err)=>{
			 
			 console.log(err)
			 $scope.error = err.data.message; 
		 })
			
		
	}
      
}]);