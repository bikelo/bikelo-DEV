'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.constant('domain','http://bikelo.co/bikeloworking')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','domain','$firebaseSimpleLogin','$window',function($scope,domain,$firebaseSimpleLogin,$window) {

  var firebaseObj = new Firebase("https://burning-heat-9007.firebaseio.com/");
  var loginObj = $firebaseSimpleLogin(firebaseObj);
  $scope.domain = domain;
  console.log(domain);
  $scope.user = {};
  $scope.SignIn = function(e){       
     e.preventDefault();
     var username = $scope.user.email;
     var password = $scope.user.password;
     loginObj.$login('password', {
                email: username,
                password: password
            })
            .then(function(user) {
                //After the user succesfully Authenticated we would redirect him to the blank page                
                $window.location.href = domain+"/afterlogin/main.html";
            }, function(error) {
                  //IF the user fails to Authenticate the we would shown then the error
                  if(error.code == "INVALID_EMAIL"){
                    $scope.loginError = "Invalid Email Address";
                  }
                  if(error.code == "INVALID_PASSWORD"){
                    $scope.loginError = "Invalid password";   
                  }
                
            });
  }

  $scope.fbLogin = function(e){
    e.preventDefault();
    //var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    //var ref = new Firebase("https://burning-heat-9007.firebaseio.com/");
    
          //var ref = new Firebase("https://burning-heat-9007.firebaseio.com");
    var refObj = $firebaseSimpleLogin(firebaseObj);
          refObj.$login("facebook", function(error, authData) {
                             console.log(authData); 
                      }).then(function(user) {                        
                //After the user succesfully Authenticated we would redirect him to the blank page                
                $window.location.href = domain+"/afterlogin/main.html";
            }, function(error) {
                  alert('error');                
            });





  }


  $scope.tLogin = function(e){
    e.preventDefault();
    //var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    //var ref = new Firebase("https://burning-heat-9007.firebaseio.com/");
    
      //var ref = new Firebase("https://burning-heat-9007.firebaseio.com");
          var refObj = $firebaseSimpleLogin(firebaseObj);
          refObj.$login("twitter", function(error, authData) {
                             console.log(authData); 
                      }).then(function(user) {                        
                //After the user succesfully Authenticated we would redirect him to the blank page                
                $window.location.href = domain+"/afterlogin/main.html";
            }, function(error) {
                  alert('error');                
            });




  }

}]);
