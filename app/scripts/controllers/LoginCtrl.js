/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$location', '$route', '$timeout', 'ezSQL', 'ezUserData'];

    // TODO Create a fade modal function and have it called in loginAttempt after
    // passing validation

    function LoginCtrl ($scope, $location, $route, $timeout, ezSQL, ezUserData) {
      $scope.username = "";
      $scope.password = "";

      function loginAttempt() {
        var attrArr = ['UserID', 'UserPassword'];
        var table = ['Person'];
        var condition = 'UserID=\'' + $scope.username + '\'+AND+UserPassword=\''+ $scope.password + '\'';
        ezSQL.getQuery(attrArr, table, condition).then(function(result) {
          console.log(result);
          if(result.length !== 0) { // Succeeded log in
            console.log('Succeed Login');
            ezUserData.setUserName($scope.username);
            ezUserData.setUserType('user');
            $timeout(function() {
              $location.path('profile');
            }, 300)
          }
          else { // Failed to log in
            attrArr = ['GroupID', 'GroupPassword'];
            table = ['Organization'];
            condition = 'GroupID=\'' + $scope.username + '\'+AND+GroupPassword=\''+$scope.password+'\'';
            ezSQL.getQuery(attrArr, table, condition).then(function(result) {
              if(result.length !== 0) {
                console.log('Group Succeed Login');
                ezUserData.setUserName($scope.username);
                ezUserData.setUserType('group');
                $timeout(function() {
                  $location.path('profile');
                }, 300)
              }
              else {
                console.log('Failed Login');
                $timeout(function() {
                  $route.reload();
                }, 300)
                return;
              }
            });
          }
        }, function(error) {
          console.log(error);
        });

      }


      function register() {
        $timeout(function() {
          $location.path('register');
        }, 300)
      };

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
