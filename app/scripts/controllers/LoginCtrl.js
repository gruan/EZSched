/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$location'];

    function LoginCtrl ($scope, $location) {
      $scope.username = "";
      $scope.password = "";

      function loginAttempt() {
        console.log($scope.username);
        //TODO Add in db query
        $location.path('profile');
      }

      function register() {
        $location.path('register');
      }

      $scope.loginAttempt = loginAttempt;
      $scope.register = register;

      document.getElementById('toggleProfile').addEventListener('click', function() {
        [].map.call(document.querySelectorAll('.profile'), function(el) {
          el.classList.toggle('profile--open');
        });
      })
    }
})();
