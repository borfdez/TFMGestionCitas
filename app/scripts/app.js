'use strict';

/**
 * @ngdoc overview
 * @name tfmgestionCitasApp
 * @description
 * # tfmgestionCitasApp
 *
 * Main module of the application.
 */
 
var tfmgestionCitasApp = angular
  .module('tfmgestionCitasApp', [
	'controladorLogin',
	'controladorMisCitas',
	'controladorAniadirAviso',
	'controladorMisAvisos',
	'tfmgestionCitasServicios',
	'controladorHorarios',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ui.sortable',
  ]);
  
tfmgestionCitasApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
   //   .when('/', {
   //     templateUrl: 'views/home.html',
   //     controller: 'HomeCtrl',
   //     controllerAs: 'home'
   //   })
      .when('/crearcita', {
        templateUrl: 'views/crearcita.html',
		controller: 'MisCitas',
		controllerAs:'miscitas'
      })
   	  .when('/crearusuario', {
        templateUrl: 'views/crearusuario.html',
		controller: 'Login',
		controllerAs:'login'
      })
	  .when('/cambiarcontrasenia', {
        templateUrl: 'views/cambiarcontrasenia.html',
		controller: 'Login',
		controllerAs:'login'
      })
	  .when('/crearhorarios', {
        templateUrl: 'views/crearhorarios.html',
		controller: 'Horarios',
		controllerAs:'horarios'
      })
	  .when('/miscitas', {
        templateUrl: 'views/miscitas.html',
		controller: 'MisCitas',
		controllerAs:'miscitas'
      })
	  .when('/login', {
        templateUrl: 'views/login.html',
		controller: 'Login',
		controllerAs:'login'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
  
  tfmgestionCitasApp.run(['servicioLogin', '$rootScope', '$firebase', function(servicioLogin, $rootScope, $firebase) {

        $rootScope.loginObj = servicioLogin.init('/login');
  //      var refMisCitas = new Firebase ("https://tfmgestioncitas.firebaseio.com/citas");
  //      $rootScope.misCitas = $firebase(refMisCitas);
}]);
  
 