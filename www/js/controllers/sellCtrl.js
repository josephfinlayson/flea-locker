angular.module('starter.controllers')
    .controller('sellCtrl', function ($scope,
                                      getCurrentGeo,
                                      $compile,
                                      getLocalLockers,
                                      $state,
                                      Camera,
                                      toBase64,
                                      getAddressForLocation,
                                      postForm) {
        var myLatlng,
            globalMap,
            selectedMarker;

        $scope.form = {};
        $scope.data = {"ImageURI": "Select Image"};

        $scope.submitForm = function (form) {
            console.log(toBase64);
            toBase64(form.lastPhoto).then(
                function (b64) {
                    form.image = b64 || 'asd'
                    postForm(form).then(function(){
                        $state.go('tab.success-sell', {item: $scope.form}) ;
                    })
                }
            )
            //NICE WORK GEORG!
            console.log($scope.form);
        };


        $scope.getPhoto = function () {
            console.log('Getting camera');
            Camera.getPicture()
                .then(function (imageURI) {

                    $scope.data.ImageURI = imageURI;
                    $scope.form.lastPhoto = imageURI;

                    console.log(imageURI)
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
                .then(initialize) //this passes the map
                .then(doPlacesSearch) //this consumes it
                .then(placeMarkersOnMap) //this doesn't need to see the map
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

            if (clickEvent === true && selectedMarker) {
                selectedMarker.setMap(null)
                selectedMarker = marker;
                marker.setMap(globalMap)
            } else if (clickEvent === true) {
                selectedMarker = marker;
                marker.setMap(globalMap)
            } else {
                marker.setMap(globalMap)
            }


            return marker;
        }

        function initialize(latLong) {
            //Hardcodeswitch! Yeah!
            //TODO Remove that thing to show the actual address

            /*myLatlng = new google.maps.LatLng(latLong.coords.latitude, latLong.coords.longitude);
             /*/
            myLatlng = new google.maps.LatLng(52.5194274, 13.423138);
            /**/


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
                console.log('marler');
                var marker = dropMarker(event, true)
                getAddressForLocation(marker.getPosition())
                    .then(function (loc) {
                        $scope.form.location = loc
                    })
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
    }).service('getAddressForLocation', function ($q) {
        var geocoder = new google.maps.Geocoder();

        return function (latLng) {
            return $q(function (res, ref) {
                geocoder.geocode({
                    latLng: latLng
                }, function (a) {
                    res(a[0].formatted_address)
                });

            })
        }
    }).service('postForm', function ($http, endPointAddress) {

        return function (form) {
            return $http.post(endPointAddress + '/postItem', form)
                .then(function (res) {
                    return res.data;
                    //return $q(function(){
                    //
                    //})
                    //$timeout(function(){
                    //    res.data
                    //
                    //})
                //console.log("response from ruby", )
            })
        }
    }).service('toBase64', function ($q) {
            return function (url, outputFormat) {
                return $q(function (res, rej) {

                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);
                    var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
                    res(dataURL);
                    canvas = null;
                };
                img.src = url || 'https://upload.wikimedia.org/wikipedia/commons/3/38/JPEG_example_JPG_RIP_010.jpg';
                });
            }
    })
