'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/',{
  	templateUrl:'home/home.html',
  	controller:'HomeCtrl'
  })
  .when('/after',{
  	templateUrl:'afterlogin/main.html',
  	controller:'HomeCtrl'
  })
  .otherwise({redirectTo: '/home'});
}]);
