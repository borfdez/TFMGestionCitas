'use strict';

var controladorMisAvisos = angular.module('controladorMisAvisos', ['ngRoute']);

controladorMisAvisos.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/misavisos', {
        templateUrl: 'views/misavisos.html',
        controller: 'MisAvisosCtrl'
    });
}])

.controller('MisAvisosCtrl', ['$scope','$firebase', '$rootScope', '$location', function($scope, $firebase, $rootScope, $location) {
    if($rootScope.usuario==null){
        $location.path('/login');
    }
 
 
//	$scope.username = CommonProp.getUser();
	var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Avisos");

	var sync = $firebase(firebaseObj);

  $scope.avisos = sync.$asArray();

  $scope.modificarAviso = function(id) {
    console.log(id);
    
    var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Avisos/" + id);
 
    var aviso = $firebase(firebaseObj);
   
    $scope.avisoAActualizar = aviso.$asObject();
 
    $('#editModal').modal();      // triggers the modal pop up
  }

  $scope.update = function() {
	console.log($scope.avisoAActualizar.$id);
	var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Avisos/" + $scope.avisoAActualizar.$id);
	var aviso = $firebase(fb);
	aviso.$update({
		titulo: $scope.avisoAActualizar.titulo,
		contenido: $scope.avisoAActualizar.contenido,
		vigente: $scope.avisoAActualizar.vigente
	}).then(function(ref) {
		console.log(ref.key()); // bar
		$('#editModal').modal('hide');
	}, function(error) {
		console.log("Error:", error);
	});

}


    $scope.confirmarBorrado = function(id) {
        var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Avisos/" + id);
        var aviso = $firebase(fb);
        $scope.AvisoABorrar = aviso.$asObject();
        $('#deleteModal').modal();
    }

    $scope.borrarAviso = function() {
        var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Avisos/" + $scope.AvisoABorrar.$id);
        var aviso = $firebase(fb);
        aviso.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }

  
	
}]);