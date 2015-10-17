/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('LoginCtrl', LoginCtrl);

    //homeCtrl.$inject = ['$scope', '$interval', 'UserData'];

    function LoginCtrl () {
      document.getElementById('toggleProfile').addEventListener('click', function() {
        [].map.call(document.querySelectorAll('.profile'), function(el) {
          el.classList.toggle('profile--open');
        });
      })
    }
})();
