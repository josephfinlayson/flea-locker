angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        var hk = window.plugins.healthkit;

        function checkAvailable(func) {
            hk.available(func)
        }

        function onError() {
            console.log(arguments)
            alert("err")
        }

        function onSuccess() {
            console.log(arguments)
            alert("succ")
        }

        //request weight
        hk.requestAuthorization(
            {
                'readTypes': ['HKQuantityTypeIdentifierBodyMass'],
                'writeTypes': ['HKQuantityTypeIdentifierBodyMass']
            },
            onError,
            onSuccess
        )


        $scope.weight = {}

        function convertToKilo(kilos) {
            return kilos;
        }

        $scope.weight.submit = function (weight) {

            hk.saveWeight(
                {
                    'unit': 'kg', // g | kg | oz | lb | st
                    'amount': convertToKilo(kilos),
                    'date': new Date() // optional, default is new Date()
                },
                onSuccess,
                onError
            );
            weight.input="Submitted";
        }



    })

