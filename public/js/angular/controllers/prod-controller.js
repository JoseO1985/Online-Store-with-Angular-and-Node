'use strict';

angular.module('myApp')
.controller('ProdController',['$scope','$stateParams','ProductsFactory',function ($scope, $stateParams, ProductsFactory) {
    ProductsFactory.getProduct(
        $stateParams.id, 
        function(res) {
        $scope.product = res;
    }, function(err) {
        $scope.error = "Failed to fetch product.";
    });

 }]);
