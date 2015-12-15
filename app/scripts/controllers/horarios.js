'use strict';
 
var controladorHorarios = angular.module('controladorHorarios', []);

controladorHorarios.controller('Horarios', [ '$scope', '$location', '$firebase', '$rootScope', function ($scope, $location, $firebase, $rootScope) {
	if($rootScope.usuario==null){
        $location.path('/login');
    }
 
  //  $scope.especialistas = [];
	var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Usuarios/");
	 
	var sync = $firebase(firebaseObj);

	$scope.especialistas = sync.$asArray();
	
//	 firebaseObj.once("value", function(snapshot){
//		 snapshot.forEach(function(childSnapshot){
//			 var data = childSnapshot.val();
//			 if (data.perfil == 'Especialista')
//			 {
//				$scope.especialistas.push({
//					email: data.email,
//					nombre: data.nombre,
//					apellido1: data.apellido1
//				});
				 //Success callback
		//		 console.log('Autenticación realizada con éxito');
		//		 return true;
//			 }
//		 });

//	 });
  
	$scope.crearHorario = function() {
	 var especialista = $scope.especialistas
	 var observaciones = $scope.horario.observaciones;
	 var categoria = $scope.horario.categoria;
	 var fecha = $scope.horario.fecha;
	 var hora = $scope.horario.hora;
	 fecha.setHours(hora.getHours());
	 fecha.setMinutes(hora.getMinutes());
	// var fechaHorario = new Date (fecha.getYear(), fecha.getMonth(), fecha.getDay(), hora.getHours(), hora.getMinutes());
//	 fecha.setTime(hora);
 
	 var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Citas");
     var fb = $firebase(firebaseObj);
	 
	fb.$push({ 
		fecha: fecha.getTime(),
		categoria: categoria,
		observaciones: observaciones,
		especialista: especialista,
		disponible: true
	}).then(function(ref) {
  		console.log(ref); 
  		$location.path('/misavisos');
	}, function(error) {
  		console.log("Error:", error);
	});

};
}]);


  