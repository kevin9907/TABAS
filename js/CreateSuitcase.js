

var myApp = angular.module('myApp', []);

myApp.controller("appController", function ($scope, $http) {
	$scope.showFlights = false;
	$scope.showPlanes = false;

	//Se cargan todos los usuarios en el objeto users para cargar la tabla   !!Cambiar links!!!!
	$http.get('http://tabaslogin.azurewebsites.net/Clients').then(function (response) { //cambiar link
		$scope.users = response.data;
	});


	//Se cargan todas las marcas en el objeto brands para cargar la tabla   !!Cambiar link!!!!
	$http.get('http://tabaswebservices.azurewebsites.net/Flights').then(function (response) { //cambiar link
		$scope.flights = response.data;
	});

	$scope.loadFlights = function (fly) {
		$scope.fly = fly;
		$scope.showFlights = true;

		$http.get('http://tabaswebservices.azurewebsites.net/Bagcarts/NF/' + $scope.fly.PLANE_ID.PLANE_ID).then(function (response) { //cambiar link
			$scope.bagCarts = response.data;
		});

	};

	$scope.prueba = function (plane) {
		$scope.plane = plane;
	};

	$scope.loadPlanes = function (fly) {
		$scope.fly = fly;
		$scope.showPlanes = true;
		$http.get('http://tabaswebservices.azurewebsites.net/Flights/Airplane/' + $scope.fly.PLANE_ID.PLANE_ID).then(function (response) { //cambiar link
			$scope.planes = response.data;
		});
	};

	$scope.createSuitcase = function (suitcase) {
		$scope.suitcase = suitcase;

		$scope.suitcase.PRICE = $scope.suitcase.WEIGHT * 3;
		$scope.suitcase.SCAN_STATUS = "Sin Procesar";
		$scope.suitcase.SHIP_STATUS = "Sin Procesar";
		$scope.suitcase.PLANE_BIN = "NA";

		$scope.suitcase.CLIENT_ID = $scope.suitcase.CLIENT_ID.ID;
		$scope.suitcase.BAGCART_ID = $scope.suitcase.BAGCART_ID.BAGCART_ID;		
		$scope.suitcase.PLANE_ID = $scope.planes.PLANE_ID * 1;

		//alert("Cliente: " + $scope.suitcase.CLIENT_ID);
		//alert("Color: " + $scope.suitcase.COLOUR);
		//alert("Peso: " + $scope.suitcase.WEIGHT);
		//alert("Precio: " + $scope.suitcase.PRICE);
		//alert("BagCart ID: " + $scope.suitcase.BAGCART_ID);
		//alert("Plane ID: " + $scope.suitcase.PLANE_ID);
		//alert("Scan Status: " + $scope.suitcase.SCAN_STATUS);
		//alert("Ship Status: " + $scope.suitcase.SHIP_STATUS);


		$http({
			method: 'POST',
			url: 'http://tabaswebservices.azurewebsites.net/Bags/AddBag',
			data: $scope.suitcase
		}).then(function successCallback(response) {
			alert("Suitcase has created successfully")
		}, function errorCallback(response) {
			alert("Error while creating suitcase");
		});
	};

});