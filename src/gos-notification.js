'use strict';

var angular = require('angular');

var notificationApp = angular.module('notificationApp', [
    require('angular-toastr'),
    require('angular-animate'),
    require('angular-moment')
]);

notificationApp.constant('version', require('../package.json').version);

//Change symbol in order to be compatible with twig
notificationApp.config(['$interpolateProvider', function($interpolateProvider, $rootScope) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
}]);

//Make symfony Request::isMethod('XmlHttRequest') properly work
notificationApp.config(['$sceProvider', '$httpProvider', function($sceProvider, $httpProvider) {
    $sceProvider.enabled(false);
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

notificationApp.service('notificationCenter', require('./service/notificationService'));
notificationApp.service('websocket', require('./service/websocketService'));
notificationApp.controller('toggleCtrl', require('./controller/toggleCtrl'));
notificationApp.controller('boardCtrl', require('./controller/boardCtrl'));
