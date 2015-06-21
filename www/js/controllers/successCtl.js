/**
 * Created by benjaminskirlo1 on 20.06.15.
 */
angular.module('starter.controllers')
    .controller('successCtrl', function ($scope, $stateParams, successItem) {
        console.log("asd")
        a = successItem.get()
        console.log(a)

        $scope.item = successItem.get();

        //TODO Expose the item
        //$scope.item = item;

    })
