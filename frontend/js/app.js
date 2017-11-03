tabletTab = angular.module('TabletTab', ['ngRoute','ngCookies','ngFileUpload']);

tabletTab.config(function ($routeProvider) {

    $routeProvider
	.when('/homepage', {
        templateUrl: 'partials/homepage.html',
        controller: 'homepageController'
		
    }).when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
        controller: 'dashboardController'
	})
    // Default Page after login
    .otherwise({
        redirectTo: '/homepage'
    });

});
