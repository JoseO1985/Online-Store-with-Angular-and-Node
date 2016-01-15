'use strict';

angular.module('myApp')
.controller('ProdListController',['$scope','ProductsFactory',function ($scope, ProductsFactory) {

    ProductsFactory.getProducts(function(res) {
        $scope.products = res;

    }, function(err) {

    });
 }]);
