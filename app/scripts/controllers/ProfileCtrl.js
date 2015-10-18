/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$q', 'ezUserData', 'ezSQL', 'ezScheduleGenerator', 'ezTimeConverter'];


    function ProfileCtrl ($scope, $q, ezUserData, ezSQL, ezScheduleGenerator, ezTimeConverter) {
      //$scope.userName = ''
      //$scope.alias = '';
      //$scope.userType = '';
      //$scope.interests = [];
      //$scope.courses = [];
      //$scope.events = [];
      //$scope.eventsReadable = [];
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
      getUserType();

      function getUserType() {
        ezUserData.getUserType().then(function(storedType) {
          $scope.userType = storedType;

          getUserName();
          getAlias();
          getInterests();

          if($scope.userType == 'user') {
            getCourses();
          }
          else {  // Group
            getEvents();
          }
        });
      }

      function getUserName() {
        ezUserData.getUserName().then(function(name) {
          $scope.userName = name;
        })
      }

      function getAlias() {
        ezUserData.getAlias().then(function(name) {
          $scope.alias = name;
        });
      }

      function getInterests() {
        ezUserData.getInterests().then(function(interests) {
          $scope.interests = interests;
        });
      }

      function getCourses() {
        ezUserData.getCourses().then(function(courses) {
          $scope.courses = courses;
        });
      }

      function getEvents() {
        ezUserData.getEvents().then(function(retrievedEvents) {
          console.log(retrievedEvents);
          $scope.events = retrievedEvents;

          $scope.eventsReadable = [];
          for(var i = 0; i < $scope.events.length; ++i) {
            $scope.eventsReadable.push({
              EventName: $scope.events[i].EventName,
              ScheduleTimes: ezTimeConverter.dayToReadable($scope.events[i].ScheduleTimes)
            });
          }

          console.log($scope.eventsReadable);
          console.log($scope.events);
        });

      }

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
          getInterests();
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
          getInterests();
        });
      }

      function deleteCourse(course) {
        var courseID = course.CourseID;
        var table = 'Takes';
        var condition = 'UserID=\'' + $scope.userName + '\'+AND+' + 'CourseID=\'' + courseID +'\'';
        ezSQL.deleteQuery(table, condition).then(function(s) {
          getCourses();
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
          getCourses();
        });
      }

      function deleteEvent(eventArg) {
        var table = 'Event';
        var condition = 'GroupID=\'' + $scope.userName + '\'+AND+' + 'EventName=\'' + eventArg.EventName + '\'';
        ezSQL.deleteQuery(table, condition).then(function(s) {
          getEvents();
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
          getEvents();
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
