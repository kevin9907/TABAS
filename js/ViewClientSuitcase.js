var URL = '172.18.120.69'

var myApp = angular.module('myApp', []);
myApp.controller("appController", function ($scope, $http) {

	//Para mostrar una parte de la pagina con el ng Show
	$scope.suitcasesView = false;
	$scope.selectUser = true;

	//Se cargan todos los usuarios en el objeto users para cargar la tabla   !!Cambiar links!!!!
	$http.get('http://tabaslogin.azurewebsites.net/Clients').then(function (response) { //cambiar link
		$scope.users = response.data;
	});




	//funciones auxiliares para mostrar u ocultar las vistas
	$scope.viewSuitcases = function (user) {
		$scope.user = user;
		$scope.selectUser = false;
		$scope.suitcasesView = true;

		//Se cargan todos los usuarios en el objeto users para cargar la tabla   !!Cambiar links!!!!
		$http.get('http://tabaswebservices.azurewebsites.net/Bags/Client/' + $scope.user.ID).then(function (response) { //cambiar link
			$scope.suitcases = response.data;
		});
	};

});