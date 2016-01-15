'use strict';

angular.module('myApp')
.controller('BillingController',['$scope','$state','BillingService',function ($scope, $state, BillingService) {
	

	$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.years = [2015,2016,2017,2018,2019,2020];

	$scope.customer = $scope.$parent.user.customer;

	$scope.verifyBilling = function(){

		BillingService.update($scope.customer.billing, $scope.ccv,
		function(res){
			$state.go('review');
		},
		function(err){

	});
	}

	$scope.showReview = function()
	{
		return $scope.customer.billing[0].cardtype != '' && $scope.customer.billing[0].cardtype != null &&
		$scope.customer.billing[0].name != '' && $scope.customer.billing[0].name != null &&
		$scope.customer.billing[0].number != '' && $scope.customer.billing[0].number != null &&
		$scope.customer.billing[0].expiremonth != '' && $scope.customer.billing[0].expiremonth != null &&
		$scope.customer.billing[0].expireyear != '' && $scope.customer.billing[0].expireyear != null &&
		$scope.ccv != '' && $scope.ccv != null &&
		$scope.customer.billing[0].address[0].name != '' && $scope.customer.billing[0].address[0].name != null &&
		$scope.customer.billing[0].address[0].address != '' && $scope.customer.billing[0].address[0].address != null &&
		$scope.customer.billing[0].address[0].city != '' && $scope.customer.billing[0].address[0].city != null &&
		$scope.customer.billing[0].address[0].state != '' && $scope.customer.billing[0].address[0].state != null &&
		$scope.customer.billing[0].address[0].zip != '' && $scope.customer.billing[0].address[0].zip != null;
	}

 }]);