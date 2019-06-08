var URL = '172.18.120.69'
var myApp = angular.module('myApp', []);

myApp.controller("appController", function ($scope, $http) {



    //Se cargan todas las marcas en el objeto brands para cargar la tabla   !!Cambiar link!!!!
    $http.get('http://tabaswebservices.azurewebsites.net/Bagcarts').then(function (response) { //cambiar link
        $scope.bagcarts = response.data;
    });



});