tabletTab = angular.module('TabletTab', ['ngRoute','ngCookies','ngFileUpload','720kb.datepicker','angular.filter']);

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
