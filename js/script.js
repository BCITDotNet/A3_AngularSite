// Code goes here
(function () {

    var app = angular.module("reportViewer", []);

    var MainController = function ($scope, $http) {

        var onError = function (reason) {
            alert("Login Failed\n Please enter correct email and password.");
        };

        // function for login
        var onLoginComplete = function (response) {
            $scope.token = response.data;
        };

        $scope.login = function (user) {
            $http.get("http://w11a.3rmao.me/api/Categories/")
                .then(onLoginComplete, onError);
        };

        var onReportError = function (reason) {
            alert("Could not fetch the report");
        }
        var onGetReportComplete = function (response) {
            $scope.result = response.data;
        }
        $scope.getReport = function (report) {
            if (report.month == undefined || report.year == undefined) {
                alert("all fields are required");
            } else {
                $something = report
                $http.get("http://w11a.3rmao.me/api/Categories/")
                    .then(onGetReportComplete, onReportError);
            }
        }

    };

    app.controller("MainController", ["$scope", "$http", MainController]);
}());