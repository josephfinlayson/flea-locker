angular.module('starter.services', [])

.factory('Chats', function() {
})

/**
 * A simple example service that returns some data.
 */
.factory('getCurrentGeo', function($q) {
      return $q(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    });
