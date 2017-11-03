tabletTab.controller('dashboardController', ['$scope', '$rootScope','$http','$cookieStore','$location',
    function ($scope, $rootScope,$http,$cookieStore,$location) {
  
	$scope.user = $cookieStore.get('user');
	console.log($scope.user)
	var token = $cookieStore.get('token')
	console.log(token)
	if(token==null){
		$location.path("\homepage")
	}
	$scope.view ={
		"url":"/partials/home.html",
		"title":"Dashboard"
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