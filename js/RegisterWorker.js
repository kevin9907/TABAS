var URL = '172.18.178.9'

var myApp = angular.module('myApp', []);
myApp.controller("appController", function ($scope, $http) {

    //Manejo del ng-show para mostrar/ocultar las diferentes vistas
    $scope.studentData = false;

    //Funciones auxiliares para el manejo de las vistas
    $scope.itsStudent = function () {
        $scope.studentData = true;
	};
	
	$http.get('http://tabaslogin.azurewebsites.net/Roles').then(function (response) { //cambiar link
		$scope.roles = response.data;
	});	
    
    $scope.createWorker = function(worker){
		$scope.worker = worker;
		$scope.worker.ROLEID = $scope.worker.ROLEID.ROLEID;
		$http({
			method: 'POST',
            url:'http://tabaslogin.azurewebsites.net/Employees/AddEmployee',
			data: $scope.worker
		}).then(function successCallback(response){
			alert("Worker created Successfully")
		}, function errorCallback(response){
			alert("Error while creating Worker");
		});
	};

});