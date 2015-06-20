angular.module('starter.controllers')
    .controller('sellCtrl', function ($scope, getCurrentGeo, $compile, getLocalLockers) {
        var myLatlng;
        var globalMap;

        $scope.$on('$ionicView.enter', function () {
            getCurrentGeo
                .then(initialize)
                .then(doPlacesSearch)
                .then(placeMarkersOnMap)
        });

        function doPlacesSearch(map) {
            return getLocalLockers(map, myLatlng)
        }

        function placeMarkersOnMap(places) {
            //console.log(places)
            createMarkers(places);
        }

        function createMarkers(places) {

            for (var i = 0, place; place = places[i]; i++) {
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                var marker = new google.maps.Marker({
                    map: globalMap,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location
                });

                marker.setMap(globalMap)
            }
        }


        function initialize(latLong) {
            console.log("initialising")

            myLatlng = new google.maps.LatLng(latLong.coords.latitude, latLong.coords.longitude);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Uluru (Ayers Rock)'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            globalMap = map
            $scope.map = map;
            return map;
        }

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });

        };

        $scope.clickTest = function () {
            alert('Example of infowindow with ng-click')
        };

    }).service('getLocalLockers', function ($q) {
        return function (map, latLong) {
            var request = {
                location: latLong,
                rankBy: google.maps.places.RankBy.DISTANCE,
                radius: 11200,
                query: 'library'
            }

            return $q(function (res, rej) {
                var service = new google.maps.places.PlacesService(map);
                service.textSearch(request, res)
            })

        }
    })


