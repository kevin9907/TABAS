
//iniciador de la aplicación y el controlador de angularjs para el empleado en movil 
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.id=123456789;
    $scope.url = "http://tabaslogin.azurewebsites.net/";
    if (typeof (localStorage) == "undefined") {
        $scope.login = false;
    } else {
        $scope.login = true;
        $scope.id = localStorage.getItem("id");
    }
    $scope.bags = "";
    $scope.bagcarts = "";
    $http.get("http://tabaswebservices.azurewebsites.net/Bags").then(function (response) {
        $scope.bags = response.data;
});$http.get("http://tabaswebservices.azurewebsites.net/Bagcarts").
then(function (response) {
    $scope.bagcarts = response.data;
});
    



        //método de login
    $scope.login = function (employee) {
        $scope.employee=employee;
        localStorage.setItem("id",'Error');
        $http.get($scope.url+"Login/"+$scope.employee.EmployeeID+"/"+$scope.employee.Passwrd).
        then(function (response) {
            localStorage.setItem("id", response.data);
            setTimeout(() => {
            }, 5000);
            if (localStorage.getItem("id") != 'Error') {
                $scope.loginInfo = true;
                $scope.getRoleEmployee();
            } else {
                $scope.loginInfo = false;
                document.location.href="../html/login.html";
            }
            });
    };

    //funcion para ir a cierta pagina dependiendo del tipo de empleado
    $scope.getRoleEmployee = function(){
        $scope.id=localStorage.getItem("id");
        $http.get($scope.url+"Employees/"+$scope.id).then(function (response) {
            $scope.employee = response.data;
            alert($scope.employee.ROLEID);
            if($scope.employee.ROLEID==2){
                document.location.href="../html/bagScanner.html";
                $http.get("http://tabaswebservices.azurewebsites.net/Bags/").then(function (response) {
                    $scope.bags = response.data;
            });$http.get("http://tabaswebservices.azurewebsites.net/Bagcarts").
            then(function (response) {
                $scope.bagcarts = response.data;
            });
            }else if($scope.employee.ROLEID==3){
                document.location.href="../html/suitcaseToPlane.html";
                $http.get("http://tabaswebservices.azurewebsites.net/Bags/").then(function (response) {
                    $scope.bags = response.data;
            });
            }else{
                alert("No es lugar para administradores, ingresa un embarcador o escaneador");
            }
        });
    }
//Funcion para actualizar una maleta 
    $scope.bagToCart =function(bag){
        $scope.bag = bag;
        $scope.bag.BAG_ID = $scope.bag.BAG_ID.BAG_ID;
        $scope.bag.BAGCART_ID = $scope.bag.BAGCART_ID.BAGCART_ID;
        $http({
			method: 'PUT',
			url: "http://tabaswebservices.azurewebsites.net/Bags/"+$scope.bag.BAG_ID + "/SetBagcart/" + $scope.bag.BAGCART_ID,
			data: $scope.bag
		}).then(function successCallback(response){
			alert("Rol has updated Successfully")
		}, function errorCallback(response){
			alert("Error while updating Rol");
		});
    }
// funcion para cambiar el select de avion segun la maleta seleccionada
    $scope.selectChange = function(){
        $http.get("http://tabaswebservices.azurewebsites.net/Bags/"+$scope.bagInfo.BAG_ID).then(function (response) {
        $scope.plane = [response.data];
        $scope.airinfo=response.data;
        $http.get("http://tabaswebservices.azurewebsites.net/Airplanes/" + $scope.airinfo.PLANE_ID).then(function (response) {
            $scope.storagebins = response.data;
            $scope.storage="";
            for(var i=0;i<$scope.storagebins.STORAGE_BINS;i++){
                $scope.storage+=[i];
            }
        });
        });
    }

    //Funcion para pasar de pagina
    $scope.toPlane = function(){
        $scope.shipping={};
        $scope.shipping.SUPERVISOR="123456789";
        $scope.shipping.BAGCART_ID=$scope.bagcartinfo.BAGCART_ID;
        $scope.shipping.BAG_ID = $scope.bagInfo.BAG_ID;
        $scope.shipping.SHIPPING_DATE_HOUR = "3/6/2019 20:04 PM"
        alert($scope.shipping.SUPERVISOR);
        alert($scope.shipping.BAGCART_ID);
        alert($scope.shipping.BAG_ID);
        alert($scope.shipping.SHIPPING_DATE_HOUR);
        $http({
            method: 'POST',
            url:"http://tabaswebservices.azurewebsites.net/Shipping/AddShipping/",
            data: $scope.shipping
        }).then(function successCallback(response){
            alert("Shipper has created Successfully")
        }, function errorCallback(response){
            alert("Error while created shipper");
        });
        $http({
            method: 'PUT',
            url: "http://tabaswebservices.azurewebsites.net/Shipping/Bag/"+$scope.shipping.BAG_ID,
            data: $scope.info
        }).then(function successCallback(response){
            alert("Rol has updated Successfully")
        }, function errorCallback(response){
            alert("Error while updating Rol");
        });
        
        //document.location.href="../html/suitcaseToPlane.html";
    }
//funcion para pasar de pagina y guardar el bag id
    $scope.toBagcart = function(){
        $scope.info={};
        $scope.date = new Date();
        $scope.info.SCAN_DATE_HOUR = [  $scope.padLeft($scope.date.getDate()),
            $scope.padLeft($scope.date.getMonth()+1),
                    $scope.date.getFullYear()
                    ].join('/');
        $scope.SCAN_HOUR=[  $scope.padLeft($scope.date.getHours()),
            $scope.padLeft($scope.date.getMinutes()),
                    $scope.date.getSeconds()
                    ].join(':');
        $scope.info.SUPERVISOR="123456789";
        $scope.info.SCAN_DATE_HOUR = $scope.info.SCAN_DATE_HOUR + " " + $scope.SCAN_HOUR;
        $scope.info.BAGCART_ID=$scope.scan.BAGCART_ID.BAGCART_ID;
        $scope.info.BAG_ID=$scope.scan.BAG_ID.BAG_ID;
        $http({
            method: 'POST',
            url:"http://tabaswebservices.azurewebsites.net/Scans/AddScan/",
            data: $scope.info
        }).then(function successCallback(response){
            alert("Scanner has created Successfully")
        }, function errorCallback(response){
            alert("Error while created scanner");
        });
        if($scope.SCAN_STATUS=="Aceptado"){
            $http({
			    method: 'PUT',
			    url: "http://tabaswebservices.azurewebsites.net/Scans/Bag/"+$scope.info.BAG_ID+"/A",
			    data: $scope.info
		    }).then(function successCallback(response){
			    alert("Rol has updated Successfully")
		    }, function errorCallback(response){
			    alert("Error while updating Rol");
            });
        }else{
            $http({
			    method: 'PUT',
			    url: "http://tabaswebservices.azurewebsites.net/Scans/Bag/"+$scope.info.BAG_ID+"/D",
			    data: $scope.info
		    }).then(function successCallback(response){
			    alert("Rol has updated Successfully")
		    }, function errorCallback(response){
			    alert("Error while updating Rol");
            });
        }
    }
    
    $scope.bagsInBagcart = function(){
        $http.get("http://tabaswebservices.azurewebsites.net/Bags/Bagcart/"+$scope.scan.BAGCART_ID.BAGCART_ID).then(function (response) {
            $scope.bags = response.data;
    });
    }

    $scope.selectBag = function(){
        $http.get("http://tabaswebservices.azurewebsites.net/Bags/Bagcart/"+$scope.bagcartinfo.BAGCART_ID+"/Acepted").then(function (response) {
            $scope.bags = response.data;
    });
    $scope.client={};
    $scope.client.ID="159357258";
    $scope.client.FNAME="Cloromiro";
    $scope.client.LNAME="Picado";
    $scope.client.UID="2014020308";
    $scope.client.PHONENO="40589632";
    $scope.client.CARDNO="1236547896321458";
    $scope.client.MILES=0;
    $scope.client.EMAIL="CloroPica@gmail.com";
    $scope.client.PASSWRD="1234";
    $scope.client.UNIVERSITY_ID=3;
    $http({
        method: 'POST',
        url:"http://localhost:62489/LoginAPI/Client/insert",
        data: $scope.client
    }).then(function successCallback(response){
        alert("Scanner has created Successfully")
    }, function errorCallback(response){
        alert("Error while created scanner");
    });
    }

    $scope.padLeft =function(n){
        return ("" + n).slice(-2);
      }
});
