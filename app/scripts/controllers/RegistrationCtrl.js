/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('RegistrationCtrl', RegistrationCtrl);

    RegistrationCtrl.$inject = ['$scope', '$location', '$timeout', '$q', 'ezSQL'];

    function RegistrationCtrl ($scope, $location, $timeout, $q, ezSQL) {
      $scope.username = "";
      $scope.password = "";
      $scope.cPassword = "";

      $scope.firstName = "";
      $scope.lastName = "";
      $scope.email = "";

      $scope.interest1 = "";
      $scope.interest2 = "";
      $scope.interest3 = "";

      // TODO Add transitionModalNext and transitionModalPrev that transitions between
      // fieldsets upon passing validation.

/*
      var table = 'Interest'
      var attrArr = ['Interest'];
      var valueArr = ['3'];
      ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
        console.log(success);
      });
*/

      function submitRegistration() {
        var queries = [];

        var table = 'Person'
        var attrArr = ['UserID', 'FirstName', 'LastName', 'UserPassword'];
        var valueArr = [$scope.username, $scope.firstName, $scope.lastName, $scope.password];
        queries.push(ezSQL.insertQuery(table, attrArr, valueArr));

        table = 'Interest';
        attrArr = ['Interest'];
        valueArr = [$scope.interest1];
        queries.push(ezSQL.insertQuery(table, attrArr, valueArr));
        valueArr = [$scope.interest2];
        queries.push(ezSQL.insertQuery(table, attrArr, valueArr));

        /*valueArr = [$scope.interest3];
        queries.push(ezSQL.insertQuery(table, attrArr, valueArr));*/

        $q.all(queries).then(function(success) {
          console.log(success);
          table = 'Looks';
          attrArr = ['UserID', 'Interest'];
          valueArr = [$scope.username, $scope.interest1];
          ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
            console.log('1');
            console.log(success);
          });
          valueArr = [$scope.username, $scope.interest2];
          ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
            console.log('2');
            console.log(success);
          });
          /*
          console.log($scope.interest3);
          valueArr = [$scope.username, $scope.interest3];
          ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
            console.log('3');
            console.log(success);
          });*/
        })

        $timeout(function() {
          $location.path('profile');
        }, 300)
      }

      $scope.submitRegistration = submitRegistration;

      //jQuery time
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches

      $(".next").click(function(){
      	if(animating) return false;
      	animating = true;

      	current_fs = $(this).closest("fieldset");
      	next_fs = $(this).closest("fieldset").next();

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

      $(".previous").click(function(){
      	if(animating) return false;
      	animating = true;

      	current_fs = $(this).closest("fieldset");
      	previous_fs = $(this).closest("fieldset").prev();

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
