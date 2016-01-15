'use strict';

angular.module('myApp')
.controller('CartController',['$scope','$state','ProductsFactory','Flash',function ($scope, $state, ProductsFactory, Flash) {
	
	var cart = [];
    var totalCartItems = 0;
	 ProductsFactory.getSessionCart(//recuperar carrito de la sesión
    	function(res) {
            cart = res;
            $scope.cart = cart;
            totalCartItems = cart.length;
            $('cart-length div span#totalPrice').html('EUR '+$scope.cartTotal());
     	    $('cart-length div span#totalProducts').html('Added ('+totalCartItems+'):');
        },function(err){}
       );

    $scope.addToCart = function(productid){

      ProductsFactory.getSessionCart(//recuperar carrito de la sesión
    	function(res) {
          cart = res;
          var found = false;
	      for(var i=0; cart != null && i<cart.length; i++){
	        var item = cart[i];
	        
	        if (item.product[0] != null && angular.equals(item.product[0]._id, productid))
	        {
	          cart[i].quantity += 1;
	          found = true;
	        }
	      }
	      if (!found){
		      	  ProductsFactory.getProduct(productid,
		      		function(res){
						cart.push({quantity: 1, product: [res]});
						 ProductsFactory.updateSessionCart(cart,//guardar carrito en la sesión
							function(res) {
							  cart = res;
							  totalCartItems = cart.length;	
            				  $('cart-length div span#totalPrice').html('EUR '+$scope.cartTotal());
     	    				  $('cart-length div span#totalProducts').html('Added ('+totalCartItems+'):');
     	    				  $scope.successItemAdded();
							}, function(err) {});  						  
		      		},
		      		function(err){      			
		      		});      		      
	      }	    
	        
		    ProductsFactory.updateSessionCart(cart,//guardar carrito en la sesión
			function(res) {
			  cart = res;
			  $('cart-length div span#totalPrice').html('EUR '+$scope.cartTotal());
			  $('cart-length div span#totalProducts').html('Added ('+totalCartItems+'):');
			  $scope.successItemAdded();
			}, function(err) {});
		  
		   ProductsFactory.setCart(cart);
       }, function(err) {}); 
	}

      $scope.cartLength = function(){
      	return cart.length;
      }

      $scope.cartTotal = function(){
	      var total = 0;
	      for(var i=0; i<cart.length; i++){
	        var item = cart[i];
	        total += item.quantity * item.product[0].price;
	      }
	      $scope.cart = cart;

	      $scope.shipping = total*.05;
	      return total+$scope.shipping;
      }; 

      $scope.cartTotal2 = function(cart){
	      var total = 0;
	      for(var i=0; cart && i<cart.length; i++){
	        var item = cart[i];
	        total += item.quantity * item.product[0].price;
	      }

	      $scope.shipping = total*.05;
	      return total+$scope.shipping;
      }; 

       $scope.updateCartQuantity = function(cart){
      		ProductsFactory.updateSessionCart(cart,//guardar carrito en la sesión
					function(res) {
					   cart = res;
            		   $('cart-length div span#totalPrice').html('EUR '+$scope.cartTotal());
					   }, function(err) {

	        });
      }

      $scope.deleteFromCart = function(productId){
	      for(var i=0; i<cart.length; i++){
	        var item = cart[i];
	        if (item.product[0]._id == productId){
	          cart.splice(i,1);
			  totalCartItems--;
              $('cart-length div span#totalPrice').html('EUR '+$scope.cartTotal());
     	      $('cart-length div span#totalProducts').html('Added ('+totalCartItems+'):');
	          break;
	        }
	      }
		  ProductsFactory.updateSessionCart(cart,//guardar carrito en la sesión
				function(res) {
				   cart = res;
			   }, function(err) {
		  });  
		  $scope.cart = cart;    
      };   

      $scope.successItemAdded = function () {
		    var message = '<strong>You have added a new item !!!</strong>';
		    Flash.create('success', message, 'custom-class');
		    // First argument (success) is the type of the flash alert
		    // Second argument (message) is the message displays in the flash alert
		    // You can inclide html as message (not just text)
		    // Third argument (custom-class) is the custom class for the perticular flash alert
	 }      
 }]);