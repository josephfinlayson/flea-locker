angular.module('starter.controllers', ['starter.services'])
    .controller('buyCtrl', function ($scope) {

        $scope.toggleSearch = function () {
            $scope.buttonIsShown = !$scope.buttonIsShown;
        }
    })
