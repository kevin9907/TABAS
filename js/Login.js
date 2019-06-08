var myApp = angular.module('myApp', []);

myApp.controller("appController", function ($scope, $http) {
    //método de login
    $scope.login = function (employee) {
        $scope.employee = employee;
        localStorage.setItem("id", 'Error');
        $http.get('http://tabaslogin.azurewebsites.net/Login/' + $scope.employee.EmployeeID + '/' + $scope.employee.Passwrd).
            then(function (response) {
                localStorage.setItem("id", response.data);
                setTimeout(() => {
                }, 5000);
                if (localStorage.getItem("id") != 'Error') {
                    $scope.loginInfo = true;
                    document.location.href = "../html/Administrator.html";
                } else {
                    alert("Error al iniciar sesion");
                    $scope.loginInfo = false;
                    document.location.href = "../html/login.html";
                }
            });
    };

});