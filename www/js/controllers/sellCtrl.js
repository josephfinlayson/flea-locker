angular.module('starter.controllers')
    .controller('sellCtrl', function ($scope, getCurrentGeo, $compile, getLocalLockers, Camera) {
        var myLatlng,
        globalMap,
        selectedMarker;
        $scope.data = {"ImageURI": "Select Image"};

        $scope.getPhoto = function () {
            console.log('Getting camera');
            Camera.getPicture().then(function (imageURI) {
                $scope.data.ImageURI = imageURI;


                alert(imageURI);
                $scope.lastPhoto = imageURI;
                //  $scope.upload();
            }, function (err) {
                console.err(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false,
                //  destinationType: Camera.DestinationType.DATA_URL
            });
        };


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
            createMarkers(places);
        }
        function createMarkers(places) {
            places.forEach(dropMarker)
        }

        /**
         * Function takes a marker and places it on a map
         * it then sets the marker on the map
         *
         * Strict truthness is checked because of indexs being passed in
         * create markers function THIS IS BAD CODE
         *
         * @param marker
         * @param clickEvent
         */

        function dropMarker(marker, clickEvent) {
            var location;
            if (clickEvent === true) {
                location = marker.latLng;
            } else {
                location = marker.geometry.location
                var image = {
                    url: marker.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
            }

            var marker = new google.maps.Marker({
                map: globalMap,
                icon: image,
                title: marker.name,
                position: location
            });

            if (clickEvent === true && selectedMarker){
                console.log(clickEvent)
                selectedMarker.setMap(null)
                selectedMarker = marker;
                marker.setMap(globalMap)
                console.log("asd")
            } else if (clickEvent === true) {
                console.log("asdaa")
                selectedMarker = marker;
                marker.setMap(globalMap)
            } else {
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

            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            google.maps.event.addListener(map, 'click', function (event) {
                //infowindow.open(map, marker);
                dropMarker(event, true)
            });

            globalMap = map
            $scope.map = map;
            return map;
        }

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