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
      $scope.alias = '';
      $scope.userType = '';
      $scope.interests = [];
      $scope.courses = [];
      $scope.events = [];
      $scope.hardcodedEvents = [];

      // ng-model variables
      $scope.formData = {
        //interest:
        //course:
        //event: {
          //name:
          //day:
          //time:
        //}
      }

      // ===== INITIALIZE ======
      ezUserData.getUserType().then(function(storedType) {
        $scope.userType = storedType;

        ezUserData.getUserName().then(function(name) {
          $scope.userName = name;
        })

        ezUserData.getAlias().then(function(name) {
          $scope.alias = name;
        });

        ezUserData.getInterests().then(function(interests) {
          $scope.interests = interests;
        });

        if($scope.userType == 'user') {
          ezUserData.getCourses().then(function(courses) {
            $scope.courses = courses;
          });
        }
        else {  // Group
          ezUserData.getEvents().then(function(retrievedEvents) {
            $scope.events = retrievedEvents;
          });
        }
      })

      // ====== SCOPE FUNCTIONS ======
      function deleteInterest(interest) {
        var interestVal = interest.Interest;
        var table, condition;
        // User Deleting Interest
        if($scope.userType == 'user') {
          table = 'Looks';
          condition = 'UserID=\'' + $scope.userName + '\'+AND+' + 'Interest=\'' + interestVal + '\'';
        }
        else {  // Group deleting interest
          table = 'Relates';
          condition = 'GroupID=\'' + $scope.userName + '\'+AND+' + 'Interest=\'' + interestVal + '\'';
        }
        ezSQL.deleteQuery(table, condition).then(function(s) {
          ezUserData.getInterests().then(function(interests) {
            $scope.interests=interests;
          });
        });
      }

      function addInterest() {
        var table, attrArr, valueArr;
        table = 'Interest';
        attrArr = ['Interest'];
        valueArr = [$scope.formData.interest];
        ezSQL.insertQuery(table, attrArr, valueArr);

        // User adding Interest
        if($scope.userType == 'user') {
          table = 'Looks';
          attrArr = ['UserID', 'Interest'];
        }
        else {  // Group adding Interest
          table = 'Relates';
          attrArr = ['GroupID', 'Interest'];
        }
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
        attrArr = ['UserID', 'CourseID'];
        valueArr = [$scope.userName, $scope.formData.course];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
          $scope.formData.course = '';
          ezUserData.getCourses().then(function(courses) {
            $scope.courses = courses;
          })
        });
      }

      function deleteEvent(eventArg) {
        var table = 'Event';
        var condition = 'GroupID=\'' + $scope.userName + '\'+AND+' + 'EventName=\'' + eventArg.EventName + '\'';
        ezSQL.deleteQuery(table, condition).then(function(s) {
          ezUserData.getEvents().then(function(events){
            $scope.events = events;
          });
        });
      }

      function addEvent() {
        var table = 'Event';
        var attrArr = ['GroupID', 'EventName', 'ScheduleTimes'];
        var time = $scope.formData.event.day + $scope.formData.event.hour;
        var valueArr = [$scope.userName, $scope.formData.event.name, time];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(success) {
          $scope.formData.event.name = '';
          $scope.formData.event.day = '';
          $scope.formData.event.hour = '';
          ezUserData.getEvents().then(function(events) {
            $scope.events = events;
          });
        });

      }

      function generateEvents() {
        ezScheduleGenerator.generateEvents().then(function(eventsArr) {
          $scope.hardcodedEvents = eventsArr;
        });
      }

      $scope.deleteInterest = deleteInterest;
      $scope.addInterest = addInterest;
      $scope.deleteCourse = deleteCourse;
      $scope.addCourse = addCourse;
      $scope.deleteEvent = deleteEvent;
      $scope.addEvent = addEvent;
      $scope.generateEvents = generateEvents;
    }

})();
