/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$q', 'ezUserData', 'ezSQL', 'ezScheduleGenerator'];


    function ProfileCtrl ($scope, $q, ezUserData, ezSQL, ezScheduleGenerator) {
      $scope.userName = ''
      $scope.firstName = '';
      $scope.interests = [];
      $scope.courses = [];
      $scope.events = [];

      $scope.formData = {
        //interest:
        //course:
      }

      // ===== INITIALIZE ======
      ezUserData.getFirstName().then(function(name) {
        $scope.firstName = name;
      });
      ezUserData.getInterests().then(function(interests) {
        $scope.interests = interests;
      });
      ezUserData.getUserName().then(function(name) {
        $scope.userName = name;
      })
      ezUserData.getCourses().then(function(courses) {
        $scope.courses = courses;
      })

      // ====== SCOPE FUNCTIONS ======
      function deleteInterest(interest) {
        var interestVal = interest.Interest;
        var table = 'Looks';
        var condition = 'UserID=\'' + $scope.userName + '\'+AND+' + 'Interest=\'' + interestVal + '\'';
        ezSQL.deleteQuery(table, condition).then(function(s) {
          ezUserData.getInterests().then(function(interests) {
            $scope.interests=interests;
          });
        });
      }

      function addInterest() {
        var table = 'Interest';
        var attrArr = ['Interest'];
        var valueArr = [$scope.formData.interest];
        ezSQL.insertQuery(table, attrArr, valueArr);

        table = 'Looks';
        attrArr = ['UserID', 'Interest'];
        valueArr = [$scope.userName, $scope.formData.interest];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
          $scope.formData.interest = '';
          ezUserData.getInterests().then(function(interests) {
            $scope.interests=interests;
          });
        });
      }

      function deleteCourse(course) {
        var courseID = course.CourseID;
        var table = 'Takes';
        var condition = 'UserID=\'' + $scope.userName + '\'+AND+' + 'CourseID=\'' + courseID +'\'';
        ezSQL.deleteQuery(table, condition).then(function(s) {
          ezUserData.getCourses().then(function(courses) {
            $scope.courses = courses;
          });
        });
      }

      function addCourse() {
        var table = 'Course';
        var attrArr = ['CourseID'];
        var valueArr = [$scope.formData.course];
        ezSQL.insertQuery(table, attrArr, valueArr);

        table = 'Takes';
        attrArr =['UserID', 'CourseID'];
        valueArr = [$scope.userName, $scope.formData.course];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
          $scope.formData.course = '';
          ezUserData.getCourses().then(function(courses) {
            $scope.courses = courses;
          })
        });
      }

      function generateEvents() {
        ezScheduleGenerator.generateEvents().then(function(eventsArr) {
          $scope.events = eventsArr;
        });
      }

      $scope.deleteInterest = deleteInterest;
      $scope.addInterest = addInterest;
      $scope.deleteCourse = deleteCourse;
      $scope.addCourse = addCourse;
      $scope.generateEvents = generateEvents;
    }

})();
