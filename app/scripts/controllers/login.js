'use strict';

/**
 * @ngdoc function
 * @name tfmgestionCitasApp.controller:Login
 * @description
 * # Login
 * Controller of the tfmgestionCitasApp
 */
 
 var controladorLogin = angular.module('controladorLogin', ['ngRoute','firebase']);
  
 controladorLogin.controller('Login', ['$scope', '$location', '$firebaseAuth', 'servicioLogin', '$rootScope', function($scope, $location, $firebaseAuth, servicioLogin, $rootScope) {
	
  $scope.usuario = {};

  $scope.perfiles = {
   perfil: null,
   opciones: [
     {descripcion: 'Administrador'},
     {descripcion: 'Especialista'},
     {descripcion: 'Ciudadano'}
   ],
  };
  
  $scope.signIn = function(e){ 
	 var encontrado = false;
     var email = $scope.usuario.email;
     var password = $scope.usuario.password;
     var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Usuarios/");
//	 var loginObj = $firebaseAuth(firebaseObj);
     e.preventDefault();
	 firebaseObj.once("value", function(snapshot){
		 snapshot.forEach(function(childSnapshot){
			 var data = childSnapshot.val();
			 if ((email == data.email) && (password == data.password))
			 {
				 encontrado = true;
				 $rootScope.usuario = email;
				 localStorage.setItem("userEmail", email);
				 if (data.perfil == 'Especialista'){
					$rootScope.especialista = true;
					$rootScope.ciudadano = false;
					$rootScope.administrador = false;
				 }
				 else if (data.perfil == 'Ciudadano'){
					$rootScope.especialista = false;
					$rootScope.ciudadano = true;
					$rootScope.administrador = false;
				 }
				 else{
				 	$rootScope.especialista = false;
					$rootScope.ciudadano = false;
					$rootScope.administrador = true;
				 }

				 $location.path('/misavisos');
				 $scope.$apply();
				 //Success callback
				 console.log('Autenticación realizada con éxito');
				 return true;
			 }
		 });

	 });

  }
  
  $scope.crearUsuario = function() {
		servicioLogin.crearUsuario($scope.usuario.email, $scope.usuario.password, $scope.usuario.nombre, $scope.usuario.apellido1, $scope.usuario.apellido2, $scope.usuario.docIdent, $scope.usuario.domicilio, $scope.perfiles.perfil);
	};
	
  $scope.logout = function() {
		servicioLogin.logout();
	};
	
  $scope.cambiarContrasenia = function() {
		servicioLogin.cambiarContrasenia($scope.usuario.password, $scope.usuario.nuevaPassword, $scope.usuario.nuevaPassword2);
	};
	
  
  
  
  
}]);
  
  
  
  
  
