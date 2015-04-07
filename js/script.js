// Code goes here
(function () {

    var app = angular.module("reportViewer", []);

    var MainController = function ($scope, $http) {

        var onError = function (reason) {
            alert("Login Failed\n Please enter correct email and password.");
        };
        var onNoError = function (reason) {
        };

        var ages = null;
        var status = null;
        var gender = null;
        var program = null;
        // function for login
        var onLoginComplete = function (response) {
            $scope.years = response.data;
            $http.get("http://a2.3rmao.me/api/ages/")
               .then(onYearsComplete, onNoError);
            $http.get("http://a2.3rmao.me/api/programs/")
               .then(onProgramsComplete, onNoError);
            $http.get("http://a2.3rmao.me/api/genders/")
               .then(onGendersComplete, onNoError);
            $http.get("http://a2.3rmao.me/api/status/")
               .then(onStatusComplete, onNoError);
        };

        var onYearsComplete = function (response) {
            ages = response.data;
            
        }
        var onProgramsComplete = function (response) {
            program = response.data;
            
        }
        var onGendersComplete = function (response) {
            gender = response.data;
            
        }
        var onStatusComplete = function (response) {
            status = response.data;
            
        }
        var resetData = function () {
            ages.forEach(function (item) {
                item.count = 0;
            })

            program.forEach(function (item) {
                item.count = 0;
            })
            gender.forEach(function (item) {
                item.count = 0;
            })
            status.forEach(function (item) {
                item.count = 0;
            })
        }

        $scope.login = function (user) {
            $http.get("http://a2.3rmao.me/api/report/getyearlist/")
                .then(onLoginComplete, onError);
        };

        

        var onReportError = function (reason) {
            alert("Could not fetch the report");
        }
        var onGetReportComplete = function (response) {
            resetData();
            $scope.result = null;
            if (program == null || ages == null || gender == null || status == null)
                alert("failed to fetch reports. Please reload and try again");
            else {
                var result = response.data;
                if (result.length < 1) {
                    alert("There is no data with the specified date.")
                } else {
                    result.forEach(function (client) {
                        status.forEach(function (item) {
                            if (item.Status == client.status) {
                                item.count++;
                            }
                        })
                        program.forEach(function (item) {
                            if (item.Type == client.program) {
                                item.count++;
                            }
                        })
                        gender.forEach(function (item) {
                            if (item.Type == client.gender) {
                                item.count++;
                            }
                        })
                        ages.forEach(function (item) {
                            if (item.Range == client.age) {
                                item.count++;
                            }
                        })

                    })
                    $scope.result = "@@";
                }
            }
            $scope.status = status;
            $scope.programs = program;
            $scope.ages = ages;
            $scope.genders = gender;
        }
        $scope.getReport = function (report) {
            if (report.month == undefined || report.year == undefined) {
                alert("all fields are required");
            } else {
                $something = report
                $http.get("http://a2.3rmao.me/api/report/getreport/"+report.month+"/"+report.year)
                    .then(onGetReportComplete, onReportError);
            }
        }

    };

    app.controller("MainController", ["$scope", "$http", MainController]);
}());