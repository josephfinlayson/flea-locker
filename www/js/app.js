angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngAnimate'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
      $ionicConfigProvider.views.transition('android')
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })



  

  // Each tab has its own nav history stack:

  .state('tab.buy', {
    url: '/buy',
    views: {
      'tab-buy': {
        templateUrl: 'templates/tab-buy.html',
        controller: 'buyCtrl'
      }
    }
  })

  .state('tab.sell', {
      url: '/sell',
      views: {
        'tab-sell': {
          templateUrl: 'templates/tab-sell.html',
          controller: 'sellCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'accountCtrl'
      }
    }
  });


  // Camera stuff

  function takePicture() {
    navigator.camera.getPicture(function(imageURI) {

      // imageURI is the URL of the image that we can use for
      // an <img> element or backgroundImage.

    }, function(err) {

      // Ruh-roh, something bad happened

    }, cameraOptions);
  }



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/buy');

});
