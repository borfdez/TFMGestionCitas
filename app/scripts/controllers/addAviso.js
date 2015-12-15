'use strict';
 
 var controladorAniadirAviso = angular.module('controladorAniadirAviso', ['ngRoute']);
 
controladorAniadirAviso.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addAviso', {
        templateUrl: 'views/addAviso.html',
        controller: 'AddAvisoCtrl'
    });
}])
 
.controller('AddAvisoCtrl', ['$scope', '$firebase', '$location', '$rootScope', function($scope, $firebase, $location, $rootScope) {
	if($rootScope.usuario==null){
        $location.path('/login');
    }
	$scope.AniadirAviso = function(){

	var titulo = $scope.aviso.titulo;
    var contenido = $scope.aviso.contenido;

    var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Avisos");
	var fb = $firebase(firebaseObj);

	fb.$push({ 
		titulo: titulo,
		contenido: contenido,
		vigente: true
	}).then(function(ref) {
  		console.log(ref); 
  		$location.path('/misavisos');
	}, function(error) {
  		console.log("Error:", error);
	});

    }
}]);