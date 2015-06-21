/**
 * Created by benjaminskirlo1 on 20.06.15.
 */
angular.module('starter.controllers')
    .controller('successCtrl', function ($scope, $stateParams, successItem, getAddressForLocation) {
        a = successItem.get()
        console.log(a)

        $scope.item = successItem.get();

        /*myLatlng = new google.maps.LatLng(latLong.coords.latitude, latLong.coords.longitude);
         /*/
        var myLatlng = new google.maps.LatLng(52.5194274, 13.423138);
        /**/

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        //TODO Expose the item
        //$scope.item = item;
        globalMap = map;
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


            return marker;
        }

        //getAddressForLocation();

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({
            address: $scope.item.location[0]+"+berlin+germany"
        }, function (a) {
            var marker = new google.maps.Marker({
                map: map,
                position: a[0].geometry.location
            });
            map.setCenter(a[0].geometry.location);
        });


    }).service('getAddressForLocation', function ($q) {
        var geocoder = new google.maps.Geocoder();

        return function (ads) {
            return $q(function (res, ref) {


            })
        }
    })
