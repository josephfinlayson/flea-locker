/*
    Class for items. Only for Benji use right now.
 */

angular.module('starter.controllers', [])

.config(function($compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

    .controller('successCtrl', function ($scope) {

    })
