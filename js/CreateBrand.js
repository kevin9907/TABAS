var myApp = angular.module('myApp', []);

myApp.controller("appController",function($scope,$http){
	
    $scope.createBrand = function(brand){
		$scope.brand = brand;
		$http({
			method: 'POST',
            url:'http://tabaswebservices.azurewebsites.net/Brands/AddBrand',
			data: $scope.brand
		}).then(function successCallback(response){
			alert("Flight has created Successfully")
		}, function errorCallback(response){
			alert("Error while created Flight");
		});
	};

});