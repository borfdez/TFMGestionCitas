  'use strict';

/**
 * @ngdoc function
 * @name tfmgestionCitasApp.controller:MisCitas
 * @description
 * # MisCitas
 * Controller of the tfmgestionCitasApp
 */
 
 var controladorMisCitas = angular.module('controladorMisCitas', []);

 controladorMisCitas.controller('MisCitas', [ '$scope', '$location', '$firebase', '$rootScope', function ($scope, $location, $firebase, $rootScope) {
	 
	if($rootScope.usuario==null){
        $location.path('/login');
    }
	
	var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Citas");
  
	var sync = $firebase(firebaseObj);

	$scope.citas = sync.$asArray();
	

//	$scope.citas = [];
	
//	firebaseObj.once("value", function(snapshot){
//	 snapshot.forEach(function(childSnapshot){
//		 var data = childSnapshot.val();
//		 if (data.disponible == true)
//		 {
//			$scope.citas.push({
//					fecha: data.fecha,
//					especialista: data.especialista,
//					observaciones: data.observaciones
//				});
			 //Success callback
	//		 console.log('Autenticación realizada con éxito');
	//		 return true;
//		 }
//	 });
//	});	
	 
	$scope.ordenarPor = function(orden) {
		$scope.ordenSeleccionado = orden;
	};
	 
	
					
	$scope.crearCita = function(id){
		console.log(id);
    
		var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Citas/" + id);
 
		var cita = $firebase(firebaseObj);
   
	//	$scope.citaAActualizar = cita.$asObject();
		
	//	var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Citas/" + $scope.citaAActualizar.$id);
	//	var cita = $firebase(fb);
		cita.$update({
			disponible: false,
			usuarioCita: $rootScope.usuario
		}).then(function(ref) {
			console.log(ref.key()); // bar
	//		$('#editModal').modal('hide');
		}, function(error) {
			console.log("Error:", error);
		});
	}
	
	 $scope.confirmarCancelacion = function(id) {
        var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Citas/" + id);
        var cita = $firebase(fb);
        $scope.citaABorrar = cita.$asObject();
        $('#deleteModal').modal();
    }

    $scope.cancelarCita = function() {
        var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Citas/" + $scope.citaABorrar.$id);
        var cita = $firebase(fb);
		cita.$update({
		disponible: true,
		usuarioCita: ""
		}).then(function(ref) {
			console.log(ref.key()); // bar
			$('#deleteModal').modal('hide');
		}, function(error) {
			console.log("Error:", error);
		});

    }

	
	
 // $scope.citas =
 //   [
 //     {
 //       fecha: new Date(), especialista:'Especialista1'
 //     },
 //     {
 //       fecha:  new Date(), especialista:'Especialista2'
 //     },
 //     {
 //       fecha:  new Date(), especialista:'Especialista2'
 //     }
 //   ];


}
]);