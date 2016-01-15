'use strict';

angular.module('myApp')
.controller('AuthController', ['$scope', '$http', '$state','AuthService','Flash', function ($scope, $http, $state, AuthService, Flash) {
  
  $scope.login = function(){

        AuthService.login($scope.email, $scope.password, 
          function(res){

              $scope.$parent.authenticated = true;
              $scope.$parentuser = res;
              if($scope.$parent.previousPage.indexOf('viewcart') != -1)
                $state.go('cart');
              else $state.go('home');
          },
          function(err){
                $scope.invalidLogin = true;
        });          
  };

  $scope.signup = function(){

        AuthService.signup($scope.regemail, $scope.regpassword,
          function(res){
            $scope.$parent.authenticated = true;
            $scope.$parentuser = res;
            $scope.successRegistration();           
            $state.go('home');
          },
          function(err){
            if(err && err.msg)
                $scope.error = err.msg;
        });        
  };

  $scope.logout = function(){
       AuthService.logout(
          function(res){
           $('cart-length div span#totalPrice').html('EUR 0');
           $('cart-length div span#totalProducts').html('Added (0):');
           $scope.$parent.authenticated = false;
           $state.go('home');
          },
          function(err){              
        });  
  }

 $scope.username = function(){
      return $scope.$parent.user ? $scope.$parent.user.customer.local.username: '';
  }

  $scope.isAuthenticated = function(){
      return $scope.authenticated ? $scope.authenticated: false;
  }

  $scope.successRegistration = function () {
        var message = '<strong>You have created a new accout !!!</strong>';
        Flash.create('success', message, 'custom-class');
  }   

}]);
