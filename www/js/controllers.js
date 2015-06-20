/*
    Class for items. Only for Benji use right now.
 */

angular.module('starter.controllers', [])

.config(function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})


.controller('sellCtrl', function($scope, Camera) {
  //takePicture();
  $scope.data = { "ImageURI" :  "Select Image" };

  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture().then(function(imageURI) {
      $scope.data.ImageURI =  imageURI;


      alert(imageURI);
      $scope.lastPhoto = imageURI;
    //  $scope.upload();
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false,
    //  destinationType: Camera.DestinationType.DATA_URL
    });
  };


})


.controller('accountCtrl', function($scope) {

})
