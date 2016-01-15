'use strict';

angular.module('myApp')
.controller('ReviewController',['$scope','$state','OrderService','ProductsFactory',function ($scope, $state, OrderService, ProductsFactory) {
	

	$scope.customer = $scope.$parent.user.customer;

	$scope.makePurchase = function(){
	
		OrderService.addOrder($scope.customer.billing, $scope.customer.shipping, $scope.customer.cart,
		 	function(res){

		 		var ctr=0;
				var f = $('form');
				for (var i = 0; i < $scope.customer.cart.length; i++) {
				   var product = $scope.customer.cart[i].product[0];
				   ctr = i + 1;
				   f.append($("<input></input>").attr("type", "hidden").attr("name", 'item_number_'+ctr).val(product._id));
				   f.append($("<input></input>").attr("type", "hidden").attr("name", 'item_name_'+ctr).val(product.name));
				   f.append($("<input></input>").attr("type", "hidden").attr("name", 'quantity_'+ctr).val($scope.customer.cart[i].quantity));
				   f.append($("<input></input>").attr("type", "hidden").attr("name", 'amount_'+ctr).val(product.price+'.00'));
				}	

				ProductsFactory.updateSessionCart([],//guardar carrito en la sesión
					function(res) {
			  			$scope.customer.cart = res;
						$scope.$parent.user.customer.cart = res;
			  			$('cart-length div span#totalPrice').html('EUR 0');
			  			$('cart-length div span#totalProducts').html('Added (0):');
			  			f.submit();
					}, function(err) {});
				
			},
			function(err){
		  });		

	 
	}

	

	// $scope.showPurchase = function()
	// {
	// 	return $scope.customer.billing[0].cardtype != '' && $scope.customer.billing[0].cardtype != null &&
	// 	$scope.customer.billing[0].name != '' && $scope.customer.billing[0].name != null &&
	// 	$scope.customer.billing[0].number != '' && $scope.customer.billing[0].number != null &&
	// 	$scope.customer.billing[0].expiremonth != '' && $scope.customer.billing[0].expiremonth != null &&
	// 	$scope.customer.billing[0].expireyear != '' && $scope.customer.billing[0].expireyear != null &&
	// 	$scope.ccv != '' && $scope.ccv != null &&
	// 	$scope.customer.billing[0].address[0].name != '' && $scope.customer.billing[0].address[0].name != null &&
	// 	$scope.customer.billing[0].address[0].address != '' && $scope.customer.billing[0].address[0].address != null &&
	// 	$scope.customer.billing[0].address[0].city != '' && $scope.customer.billing[0].address[0].city != null &&
	// 	$scope.customer.billing[0].address[0].state != '' && $scope.customer.billing[0].address[0].state != null &&
	// 	$scope.customer.billing[0].address[0].zip != '' && $scope.customer.billing[0].address[0].zip != null;
	// }

 }]);