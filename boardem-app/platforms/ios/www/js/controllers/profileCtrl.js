appCtrl.controller('profileCtrl',function($rootScope,$http, $scope, $state,$stateParams,UtilService, UserService){
	$scope.user={};
	$scope.invite = $stateParams.profileId != $rootScope.user_id

	UserService.getUser($rootScope.SERVER_LOCATION,$stateParams.profileId).
	    success(function(data) {
	        if (data.code === 0){
	        	$scope.user = data.extra;
	      }else {
	      	UtilService.popup("Login Error",data.message);
	      }
	    }).
	    error(function(data) {
	    	UtilService.popup("Login Error","Unable to Communicate with server.");
	    });

});