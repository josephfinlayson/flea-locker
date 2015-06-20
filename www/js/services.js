angular.module('starter.services', [])


// Camera stuff
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])



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
