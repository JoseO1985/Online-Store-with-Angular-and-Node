'use strict';

angular.module('myApp').factory('ProductsFactory',function($http){
  var product = '';
  var cart = [];
  var products = [];


  return {
    
    getProducts: function(success, error) {
            $http.get('/apiproducts/products').success(success).error(error);
    },
    getProduct: function(id, success, error) {
            if(id)
              $http.get('/apiproducts/product/'+id).success(success).error(error);
    },
    getSessionCart: function(success, error) {
            $http.get('/apiproducts/cart').success(success).error(error);
    },
    updateSessionCart: function(cart, success, error) {
              $http.post('/apiproducts/update/cart',  { updatedCart: cart }).success(success).error(error);
    },
    getAllProducts: function()
    {
      return products;
    },
    setCart: function(value){
      cart = value;
    },
    getCart: function()
    {
      return cart;
    }
  };
});


angular.module('myApp').factory('AuthService',function($http){

   return { 
        login: function(username,password,success,error){
            $http.post('/apiauth/login',{email:username,password:password}).success(success).error(error);
        },          
        signup: function(username,password,success,error){
            $http.post('/apiauth/signup',{email:username,password:password}).success(success).error(error);
        },
        logout: function(success, error){
          return $http.get('/apiauth/logout').success(success).error(error);
        },
        isLoggedIn: function(success, error)
        {
          return $http.get('/apiauth/checkSignin').success(success).error(error);     
        }
  };
});

angular.module('myApp').factory('ShippingService',function($http){

   return { 
        update: function(updatedShipping,success,error){
            $http.post('/apishipping/update/',{updatedShipping:updatedShipping}).success(success).error(error);
        }
  };
});

angular.module('myApp').factory('BillingService',function($http){

  return { 
         update: function(updatedBilling,ccv,success,error){
            $http.post('/apibilling/update/',{updatedBilling:updatedBilling, ccv:ccv}).success(success).error(error);
        }
  };
});

angular.module('myApp').factory('OrderService',function($http){

  return { 
         addOrder: function(billing,shipping,cart,success,error){
            $http.post('/apiorder/add/',{billing:billing, shipping:shipping, cart:cart}).success(success).error(error);
        },
        getOrders: function(success,error){
            $http.get('/apiorder/orders').success(success).error(error);
        }
  };
});