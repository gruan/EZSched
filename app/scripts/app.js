/**
 * Created by George Ruan on October 17, 2015.
 *
 * Defines the routing behavior for the web application EZSched.
 */

(function() {
  'use strict';

  angular
    .module('EZSched', ['ngRoute'])    // Set up app dependencies
    .config(function($routeProvider) {
      $routeProvider
        /*.when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        })
        */
        .when('/404', {
          templateUrl: '404.html'
        })
        .otherwise({
          redirectTo: '/404'
        });
    });
})();
