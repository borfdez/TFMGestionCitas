'use strict';

/* Services */


var tfmgestionCitasServicios = angular.module('tfmgestionCitasServicios', ['firebase']);

tfmgestionCitasServicios.factory('servicioLogin', ['$rootScope', '$firebase','$firebaseAuth','$location',
    function($rootScope, $firebase, $firebaseAuth, $location) {
        var loginObj = null;
        var refUsuarios = new Firebase ("https://tfmgestioncitas.firebaseio.com/Usuarios");
        var usuarios = $firebase(refUsuarios);
        $rootScope.usuario = null;
        $rootScope.loginError = null;
        $rootScope.change = null;
        return {
            init: function() {

                var databaseRef = new Firebase('https://tfmgestioncitas.firebaseio.com');
                return loginObj = $firebaseAuth(databaseRef);
            },

			cambiarContrasenia: function(oldPass, nuevaPass, nuevaPass2){
				$rootScope.loginError = null;
				var firebaseObj = new Firebase("https://tfmgestioncitas.firebaseio.com/Usuarios/");
				firebaseObj.once("value", function(snapshot){
					snapshot.forEach(function(childSnapshot){
						var data = childSnapshot.val();
						var key = childSnapshot.key();
						if ((localStorage.getItem("userEmail") == data.email) && (oldPass == data.password)){
							if (nuevaPass == nuevaPass2){
								var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Usuarios/" + key);
								var usuario = $firebase(fb);
								usuario.$update({
									password: nuevaPass
								}).then(function(ref) {
									console.log(ref.key()); // bar
									$location.path('/misavisos');
									$scope.$apply();
									return true;
								}, function(error) {
									console.log("Error:", error);
								});
							}
							else{
								console.log("La contraseña nueva introducida no coincide");
								console.error('Fallo de modificación de contraseña');
							}
						}
						else{
							console.log("La contraseña anterior no coincide");
							console.error('Fallo de modificación de contraseña');
						}
					});
				});
			},
             
			logout: function() {
				$rootScope.loginError = null;
//				loginObj.$logout();
				$rootScope.usuario = null;
				$rootScope.administrador = false;
				$rootScope.ciudadano = false;
				$rootScope.especialista = false; 
				localStorage.removeItem('userEmail');
				$location.path('/login');
			},


			crearUsuario: function(email, pass, nombre, apellido1, apellido2, docIdent, domicilio, perfil) {
				$rootScope.loginError = null;
				if (!apellido2)
				{
					apellido2 = null;
				}
				var fb = new Firebase("https://tfmgestioncitas.firebaseio.com/Usuarios/");
				var usuario = $firebase(fb);
				usuario.$push({
					email: email,
					password: pass,
					nombre: nombre,
					apellido1: apellido1,
					apellido2: apellido2,
					docIdent: docIdent,
					domicilio: domicilio,
					estado: true,
					perfil: perfil
				}).then(function(ref) {
					console.log(ref.key()); // bar
				//$('#editModal').modal('hide');
				}, function(error) {
					console.log("Error:", error);
					console.error('Fallo de creación de usuario: ', error);
					$rootScope.loginError = error;
				});    
			}
		};
}]);


