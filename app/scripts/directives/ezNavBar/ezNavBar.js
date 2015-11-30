/**
 * Created by George Ruan on November 20, 2015.
 *
 * ezNavBar defines the navigation bar appearance and functionality.
 *
 * To use: Put the directive into the html file at the top of each page.
 *
 * Ex. <gr-nav-bar></gr-nav-bar>
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
      function scrollToTop() {
        angular.element('html, body').animate({
          scrollTop: 0
        }, 'slow');
      }

      scope.scrollToTop = scrollToTop;
    }
  }
})();
