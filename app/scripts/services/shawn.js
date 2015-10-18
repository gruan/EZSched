/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that queries mySQL for us.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezShawn', ezShawn);

  ezShawn.$inject = ['$http', '$q'];

  function ezShawn($http, $q) {
    var ezShawnObj = {};

    function example() {
      //Do stuff and return if needed
    }

    ezShawnObj.example = example;

    return ezShawnObj;
  }
})();
