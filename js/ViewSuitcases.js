var myApp = angular.module('myApp', []);
myApp.controller("appController", function ($scope, $http) {


	//Se cargan todos los usuarios en el objeto users para cargar la tabla   !!Cambiar links!!!!
	$http.get('http://tabaswebservices.azurewebsites.net/Bags').then(function (response) { //cambiar link
		$scope.suitcases = response.data;
	});


});