'use strict';

angular.module('myApp')
.controller('OrdersController',['$scope','$state','$stateParams','$window','OrderService','ProductsFactory',function ($scope, $state, $stateParams, $window, OrderService, ProductsFactory) {
	
   $scope.customer = $scope.$parent.user.customer;

	OrderService.getOrders(
		function(res){
			$scope.orders = res;
			var length = $scope.customer.cart ? $scope.customer.cart.length:0;
			$('cart-length div span#totalPrice').html('EUR '+$scope.cartTotal2($scope.customer.cart));
	   	    $('cart-length div span#totalProducts').html('Added ('+length+'):');
	
		},
		function(err){
			$scope.orders = [];
	});		
	
 }]);