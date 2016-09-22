'use strict';

var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngAria']);

app.config(function ($mdThemingProvider, $sceDelegateProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('light-blue');

    $mdThemingProvider.theme('contrast').primaryPalette('blue-grey').accentPalette('light-blue').dark();

    $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.gravatar.com/avatar/**']);
});

app.factory('socket', function () {
    return io();
});

app.factory('toast', function ($mdToast) {

    function message(msg, delay) {
        delay = _.isNil(delay) ? 3000 : delay;
        $mdToast.show($mdToast.simple().textContent(msg).position('top right').hideDelay(delay).action('Ok'));
    }

    return message;
});

app.controller('SiteController', function ($scope, $mdSidenav, $log, socket, toast, $mdToast) {

    $scope.toggleNav = function () {
        $mdSidenav('primary-nav').toggle().then(function () {
            $log.debug('primary nav toggled');
        });
    };

    socket.on('status', function (data) {
        $log.debug('data received on status ' + JSON.stringify(data));
    });

    var errorCount = 0;
    socket.on('connect_error', function () {
        errorCount++;
        $log.debug('connection_error', errorCount);
        if (errorCount >= 2) {
            $log.debug('toasting connection error');
            toast('There was an issue connecting to the platform.', 0);
        }
    });

    socket.on('connect', function () {
        errorCount = 0;
    });
});

app.filter('gravatar', function () {
    return function (input) {
        if (_.isNil(input)) {
            return '';
        }
        return md5(input.trim());
    };
});

app.directive('focusOnShow', function ($timeout) {
    return {
        restrict: 'A',
        link: function link($scope, $element, $attr) {
            if ($attr.ngShow || $attr.ngHide) {
                $scope.$watch($attr.ngShow || $attr.ngHide, function (newValue) {
                    if (newValue) {
                        $timeout(function () {

                            var inputElement = $element.is('input') ? $element : $element.find('input');

                            inputElement.focus();
                        }, 0);
                    }
                });
            }
        }
    };
});