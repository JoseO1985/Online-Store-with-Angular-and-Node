var app = angular.module('myApp', ['ngSanitize', 'ui.router', 'flash'])
.config(['$stateProvider','$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {



  var checkSignin = function ($q, $timeout, $http, $state, $rootScope) {
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/apiauth/checkSignin').success(function (user) {
      // Authenticated
      if (user !== '0') {
        $rootScope.user = user;
        $timeout(deferred.resolve, 0);

      // Not Authenticated
      } else {
        $rootScope.message = 'You need to log in.';
        $timeout(function () { deferred.reject(); }, 0);
        $state.go('login');
      }
    });
    return deferred.promise;
  };

  //================================================
  // Route configurations 
  //================================================

  // Public routes
  $stateProvider
    .state('public', {
      abstract: true,
      template: "<div ui-view></div>"
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthController'/*,
      resolve: {
        requiresSignin: checkSignin
      }*/
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register.html',
      controller: 'AuthController'
    })
     .state('home', {
      url: '/',     
      templateUrl: 'views/products.html',
      controller: 'ProdListController'
    })
    .state('product', {
      url: '/product/:id',
      templateUrl: 'views/product.html',
      controller: 'ProdController'
    })
    .state('cart', {
      url: '/viewcart/',
      templateUrl: 'views/cart.html',
      controller: 'CartController'
    })
    .state('shipping',{
      url:'/shipping',
      templateUrl: 'views/shipping.html',
      controller: 'ShippingController',
      resolve: {
        requiresSignin: checkSignin
      }
    })
    .state('billing',{
      url:'/billing',
      templateUrl: 'views/billing.html',
      controller: 'BillingController',
      resolve: {
        requiresSignin: checkSignin
      }
    })
    .state('review',{
      url:'/review',
      templateUrl:'views/review.html',
      controller: 'ReviewController',
      resolve: {
        requiresSignin: checkSignin
      }
    })
    .state('orders',{
      url:'/orders',
      templateUrl:'views/orders.html',
      controller: 'OrdersController',
      resolve: {
        requiresSignin: checkSignin
      }
    });

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

}]);


app.directive('cartLength', function(){
  return {
   template:"<div><span id='totalProducts'>Added (0): </span><span id='totalPrice'>EUR 0</span></div>"
  };
});

app.directive('username', function(){
  return {
   template:"<div style='margin-top:10px'><span>Bienvenido, {{username()}}</span></div>"
   /*,
   controller: function($scope){
       username
       return $scope.user.email;
    }*/
  };
});

app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
          
          $rootScope.$on('$locationChangeStart', function() {
            $rootScope.previousPage = location.pathname;
          });

          AuthService.isLoggedIn(
            function(res){
                if(res !== '0')
                {
                  $rootScope.authenticated = true;
                  $rootScope.user = res;
                }
                else
                {
                  $rootScope.authenticated = false;
                  $rootScope.user = '';              
                }
                
            },
            function(err){              
        });   
    });

}]);