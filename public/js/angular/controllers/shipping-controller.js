'use strict';

angular.module('myApp')
.controller('ShippingController',['$scope','$state','ShippingService',function ($scope, $state, ShippingService) {
	
	$scope.customer = $scope.$parent.user.customer;

	$scope.setShipping = function(){

		ShippingService.update($scope.customer.shipping,
		function(res){
			$state.go('billing');
		},
		function(err){

	});
	}

	$scope.showBilling = function()
	{
		return $scope.customer.shipping[0].name != '' && $scope.customer.shipping[0].name != null &&
		$scope.customer.shipping[0].address != '' && $scope.customer.shipping[0].address != null &&
		$scope.customer.shipping[0].city != '' && $scope.customer.shipping[0].city != null &&
		$scope.customer.shipping[0].state != '' && $scope.customer.shipping[0].state != null &&
		$scope.customer.shipping[0].zip != '' && $scope.customer.shipping[0].zip != null;
	}

 }]);