tabletTab.controller('dashboardController', ['$scope', '$rootScope','$http','$cookieStore','$location',
    function ($scope, $rootScope,$http,$cookieStore,$location) {
  
	
	var token = $cookieStore.get('token')
	if(token==null){
		$location.path("\homepage")
	}
	$scope.user = $cookieStore.get('user');
	if($scope.user){
		var url= $scope.user.role=="SUPERADMIN"?'/partials/staff.html':'/partials/home.html';
		var title= $scope.user.role=="SUPERADMIN"?'Hotel Staff':'Dashboard';
	}
	console.log("token: ",token)
	
	$scope.view ={
		"url":url,
		"title":title
	}
	$scope.setView= function(name,title){

		$scope.view.url= "/partials/"+name;
		$scope.view.title= title
	}
	$scope.logout = function(){
		
		$cookieStore.remove('user');
		$cookieStore.remove('token');
		$location.path("\homepage")
	}

}]);