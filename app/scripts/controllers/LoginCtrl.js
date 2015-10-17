/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$location', '$timeout', '$http'];

    function LoginCtrl ($scope, $location, $timeout, $http) {
      $scope.username = "";
      $scope.password = "";

      function loginAttempt() {
        //TODO Add in db query

        

      function register() {
        $timeout(function() {
          $location.path('register');
        }, 300)
      }

      $scope.loginAttempt = loginAttempt;
      $scope.register = register;

      document.getElementById('toggleProfile').addEventListener('click', function() {
        [].map.call(document.querySelectorAll('.profile'), function(el) {
          el.classList.toggle('profile--open');
        });
      })

      var current;
      var scale, opacity;
      var animating;
      $(".login").click(function(){
        if(animating) return false;
        animating = true;

        current = $('#login > .profile');
        current.animate({opacity: 0}, {
          step: function(now, mx) {
            scale = 1 - (1 - now) * 0.2;
            current.css({'transform': 'scale('+scale+')'});
          },
          duration: 600,
          complete: function(){
            current.hide();
            animating = false;
          },
          //this comes from the custom easing plugin
          easing: 'easeInOutBack'
        });
      });
    }
})();
