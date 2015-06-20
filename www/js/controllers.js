angular.module('starter.controllers', [])
    .controller('buyCtrl', function ($scope) {

            $scope.toggleSearch = function () {
                $scope.buttonIsShown = !$scope.buttonIsShown;
            }
    })

    .controller('sellCtrl', function ($scope) {

    })
    .controller('accountCtrl', function ($scope) {

    })
