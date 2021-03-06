var myApp = angular.module('starter', ['ionic', 'starter.controllers','firebase'])

.run(function($ionicPlatform, $rootScope,$http,$firebaseAuth,$window) {
  //$http.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:8100";

  $ionicPlatform.ready(function() {
	 $rootScope.SERVER_LOCATION = "http://proj-309-16.cs.iastate.edu:8080/";
   $rootScope.user_id = $window.localStorage['id'];
   $rootScope.events = [];
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
	
	$rootScope.events = [];
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
   $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider
  .state('auth',{
    url: "/auth",
    templateUrl: "templates/auth.html",
    controller: 'AuthCtrl'
  })
  .state('login',{
    url: "/login",
    abstract: true,
    templateUrl: "templates/login.html",
    controller:"loginCtrl"
  })
  .state('login.signin',{
    url: "/signin",
    views:{
      'signinContent':{
        templateUrl:"templates/signin.html",
        controller:"signinCtrl"
      }
    }
  })
  .state('login.signup',{
    url: "/signup",
    views:{
      'signupContent':{
        templateUrl:"templates/signup.html",
        controller:"signupCtrl"
      }
    }
  })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.profile',{
    url: "/profile",
    views: {
      'menuContent':{
        templateUrl: "templates/profile.html",
        controller: 'profileCtrl'
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.events', {
      url: "/events",
      views: {
        'menuContent': {
          templateUrl: "templates/events.html",
          controller: 'eventsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/events/:eventId",
    views: {
      'menuContent': {
        templateUrl: "templates/event.html",
        controller: 'eventCtrl'
      }
    }
  })
	.state('app.create', {
    url: "/event/create",
    views: {
      'menuContent': {
        templateUrl: "templates/create-event.html",
        controller: 'createEventCtrl'
      }
    }
  })
  $ionicConfigProvider.views.maxCache(5);
  $ionicConfigProvider.tabs.position('bottom');
  $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:8100";

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth');
});