appCtrl.controller("signinCtrl",function($window,$rootScope,$ionicPopup, $scope,$state,$http,$firebase,$firebaseAuth){

	$scope.toEvents = function(){
		$state.transitionTo("app.events");
	}

	$scope.toFacebook = function(){
		var response = $scope.facebookLogin("",$scope.fbLoginCall);
		
	}

	$scope.fbLoginCall = function(authData,username){
		var id = authData.facebook.id;
		var url = $rootScope.SERVER_LOCATION + "signin?facebookId="+id;
		$scope.idLogin(id,$scope.toEvents);
	}

	$scope.idLogin = function(id,callback){
	    $http.get($rootScope.SERVER_LOCATION + "signin?facebookId="+id).
	    success(function(data, status, headers, config) {
	        if (data.code === 0){
	        	console.log(id);
	          $window.localStorage.setItem('id', id);
	          callback();
	      }else {
	        $ionicPopup.alert({
	          title:"Login Error",
	          template:data.message,
	        });
	      }
	    }).
	    error(function(data, status, headers, config) {
	      $ionicPopup.alert({
	            title: "Login Error",
	            template: "Unable to Communicate with server."
	          });
	    });
	};

	$scope.facebookLogin = function(username, callback){
		var ref = new Firebase("https://boardem.firebaseio.com");
		var authRef = $firebaseAuth(ref);

		authRef.$authWithOAuthPopup("facebook").then(function(authData){
			callback(authData,username);
		}).catch(function(error){
			$ionicPopup.alert({
          		title: "Login Error",
          		template: error
        	});
	  	});
	}

});