/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('RegistrationCtrl', RegistrationCtrl);

    RegistrationCtrl.$inject = ['$scope', '$location', '$timeout', 'ezSQL', 'ezUserData'];

    function RegistrationCtrl ($scope, $location, $timeout, ezSQL, ezUserData) {
      $scope.input = {
        username: '',
        password: '',
        cPassword: '',

        interest1: '',
        interest2: '',
        userType: '',

        email: '',
        // Group
        groupName: '',
        affiliation:'',
        // User
        firstName: '',
        lastName: '',
      };

      /**
       * Navigates the user back to the login screen.
       * @return {void}
       */
      function backToLogin() {
        $timeout(function() {
          $location.path('/');
        }, 300);
      }

      /**
       * Submits a registration attempt and navigates the user to the profile
       * page.
       * If the new user is of 'userType' user:
       * - A new 'Person' tuple will be created
       * - Their interests will be updated in the 'Looks' table and new tuples
       *   will be inserted in the 'Interest' table if their interests DNE.
       * If the new user is of 'userType' group:
       * - A new 'Organization' tuple will be created
       * - Their interests will be updated in the 'Relates' table and new tuples
       *   will be inserted in the 'Interest' table if their interests DNE.
       * @return {void}
       */
      function submitRegistration() {
        var table, attrArr, valueArr;

        // User Specific Registration
        if($scope.input.userType === 'user') {
          table = 'Person';
          attrArr = ['UserID', 'FirstName', 'LastName', 'UserPassword'];
          console.log('First %s Last %s', $scope.input.firstName, $scope.input.lastName);
          valueArr = [$scope.input.username, $scope.input.firstName, $scope.input.lastName, $scope.input.password];
          ezSQL.insertQuery(table, attrArr, valueArr);
        }
        else { // Group Specific Registration
          table = 'Organization';
          attrArr = ['GroupID', 'GroupName', 'GroupPassword'];
          valueArr = [$scope.input.username, $scope.input.groupName, $scope.input.password];
          ezSQL.insertQuery(table, attrArr, valueArr);
        }

        // General Registration
        table = 'Interest';
        attrArr = ['Interest'];
        valueArr = [$scope.input.interest1];
        ezSQL.insertQuery(table, attrArr, valueArr);
        valueArr = [$scope.input.interest2];
        ezSQL.insertQuery(table, attrArr, valueArr);

        // User Specific Registration
        if($scope.input.userType === 'user') {
          table = 'Looks';
          attrArr = ['UserID', 'Interest'];
        }
        else { // Group Specific Registration
          table = 'Relates';
          attrArr = ['GroupID', 'Interest'];
        }

        // Do not allow blank interests.
        if($scope.input.interest1 !== '') {
          valueArr = [$scope.input.username, $scope.input.interest1];
          ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
            console.log('1');
            console.log(success);
          });
        }

        // Only Insert second interest if it is different from the first
        if($scope.input.interest2 !== $scope.input.interest1) {
          valueArr = [$scope.input.username, $scope.input.interest2];
          ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
            console.log('2');
            console.log(success);
          });
        }


        ezUserData.setUserName($scope.input.username);
        ezUserData.setUserType($scope.input.userType);
        $timeout(function() {
          $location.path('profile');
        }, 300);
      }

      // ===== Scoped Functions =====
      $scope.backToLogin = backToLogin;
      $scope.submitRegistration = submitRegistration;

      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches

      $('.next').click(function(){
      	if(animating) { return false; }
      	animating = true;

      	current_fs = $(this).closest('fieldset');
      	next_fs = $(this).closest('fieldset').next();

      	//show the next fieldset
      	next_fs.show();
      	//hide the current fieldset with style
      	current_fs.animate({opacity: 0}, {
      		step: function(now, mx) {
      			//as the opacity of current_fs reduces to 0 - stored in "now"
      			//1. scale current_fs down to 80%
      			scale = 1 - (1 - now) * 0.2;
      			//3. increase opacity of next_fs to 1 as it moves in
      			opacity = 1 - now;
      			current_fs.css({'transform': 'scale('+scale+')'});
      			next_fs.css({'opacity': opacity});
      		},
      		duration: 600,
      		complete: function(){
      			current_fs.hide();
      			animating = false;
      		},
      		//this comes from the custom easing plugin
      		easing: 'easeInOutBack'
      	});
      });

      $('.previous').click(function(){
      	if(animating) { return false; }
      	animating = true;

      	current_fs = $(this).closest('fieldset');
      	previous_fs = $(this).closest('fieldset').prev();

      	//de-activate current step on progressbar
      	//$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      	//show the previous fieldset
      	previous_fs.show();
      	//hide the current fieldset with style
      	current_fs.animate({opacity: 0}, {
      		step: function(now, mx) {
      			//as the opacity of current_fs reduces to 0 - stored in "now"
      			//1. scale previous_fs from 80% to 100%
      			scale = 0.8 + (1 - now) * 0.2;
      			//3. increase opacity of previous_fs to 1 as it moves in
      			opacity = 1 - now;
      			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
      		},
      		duration: 600,
      		complete: function(){
      			current_fs.hide();
      			animating = false;
      		},
      		//this comes from the custom easing plugin
      		easing: 'easeInOutBack'
      	});
      });
    }
})();
