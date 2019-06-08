var myApp = angular.module('myApp', []);


myApp.controller("appController", function ($scope, $http) {
	$scope.modelView = false;

	//Se cargan todas las marcas en el objeto brands para cargar la tabla   !!Cambiar link!!!!
	$http.get('http://tabaswebservices.azurewebsites.net/Brands').then(function (response) { //cambiar link
		$scope.brands = response.data;
	});

	//Se cargan todas las marcas en el objeto brands para cargar la tabla   !!Cambiar link!!!!
	$http.get('http://tabaswebservices.azurewebsites.net/Flights').then(function (response) { //cambiar link
		$scope.flights = response.data;
	});

	$scope.crearBagCart = function (bagCart, brand) {
		$scope.bagCart = bagCart;
		$scope.brand = brand;

		
		
		$scope.bagCart.QRCODE = "";
		$scope.bagCart.STATUS = "Disponible";
		$scope.bagCart.FLIGHT_ID = $scope.bagCart.FLIGHT_ID.FLIGHT_ID;
		$scope.bagCart.BRAND_ID  = $scope.bagCart.BRAND_ID.BRAND_ID;	

		//alert($scope.bagCart.FLIGHT_ID);
		//alert($scope.bagCart.CAPACITY);
		//alert($scope.bagCart.BRAND_ID);
		//alert($scope.bagCart.MODEL);
		//alert($scope.bagCart.QRCODE);
		//alert($scope.bagCart.STATUS);

		$http({
			method: 'POST',
			url: 'http://tabaswebservices.azurewebsites.net/Bagcarts/AddBagcart',
			data: $scope.bagCart
		}).then(function successCallback(response) {
			alert("BagCart has created Successfully")
		}, function errorCallback(response) {
			alert("Error while creating BagCart");
		});
	};

});