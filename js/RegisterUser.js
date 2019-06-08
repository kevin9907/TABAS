
var myApp = angular.module('myApp', []);
myApp.controller("appController", function ($scope, $http) {

    //Manejo del ng-show para mostrar/ocultar las diferentes vistas
    $scope.studentData = false;

	

    //Funciones auxiliares para el manejo de las vistas
    $scope.itsStudent = function () {
		if($scope.studentData == false){
			$scope.studentData = true;
		}else{
			$scope.studentData = false;
		}
	};
	
	$http.get('http://tabaslogin.azurewebsites.net/Universities').then(function (response) { //cambiar link
		$scope.universities = response.data;
	});	
    
    $scope.createUser = function(user){
		$scope.user = user;
		$scope.user.MILES = 0;
		$scope.user.UNIVERSITY_ID = $scope.user.UNIVERSITY_ID.UNIVERSITY_ID;

		//alert($scope.user.ID);
		//alert($scope.user.PASSWRD);
		//alert($scope.user.FNAME);
		//alert($scope.user.LNAME);
		//alert($scope.user.PHONENO);
		//alert($scope.user.CARDNO);
		//alert($scope.user.EMAIL);

		//alert($scope.user.UNIVERSITY_ID);
		//alert($scope.user.UID);
		//alert($scope.user.MILES);

		$http({
			method: 'POST',
            url: 'http://tabaslogin.azurewebsites.net/Clients/AddClient' ,
			data: $scope.user
		}).then(function successCallback(response){
			alert("User has created Successfully")
		}, function errorCallback(response){
			alert("Error while creating user");
		});
	};

});