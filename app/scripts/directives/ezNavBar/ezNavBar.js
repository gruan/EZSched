/**
 * Created by George Ruan on August 21, 2015.
 *
 * grNavBar defines the navigation bar appearance and functionality.
 *
 * To use: Put the directive into the html file.
 *
 * Ex. <gr-nav-bar></gr-nav-bar>
 *
 * This will create a navigation bar with slide in and out functionality.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .directive('ezNavBar', navBar);

  navBar.$inject = [];

  function navBar() {
    var directive;
    directive = {
      link: link,
      templateUrl: 'scripts/directives/ezNavBar/ezNavBar.html',
      restrict: 'E',
      scope: {}
    };

    return directive;

    function link(scope) {

    }
  }
})();
