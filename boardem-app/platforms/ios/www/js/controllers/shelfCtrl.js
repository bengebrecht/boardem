appCtrl.controller("shelfCtrl",function($window,$rootScope,$scope,$state,$http,$firebase,$firebaseAuth,UtilService){
	$scope.games = [];
	
	$scope.loadShelf = function(){
    $scope.games = {};

	};
});