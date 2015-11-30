/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', 'ezUserData', 'ezSQL'];


    function SettingsCtrl ($scope, ezUserData, ezSQL) {
      // ===== INITIALIZE ======

      // ====== Scoped Functions ======

    }

})();
