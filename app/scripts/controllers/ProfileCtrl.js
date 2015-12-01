/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', 'ezUserData', 'ezSQL', 'ezScheduleGenerator', 'ezTimeConverter'];


    function ProfileCtrl ($scope, ezUserData, ezSQL, ezScheduleGenerator, ezTimeConverter) {
      //$scope.userName = ''
      //$scope.alias = '';
      //$scope.userType = '';
      //$scope.interests = [];
      //$scope.courses = [];
      //$scope.events = [];
      //$scope.eventsReadable = [];
      $scope.suggestedEventsFormatted = [];
      $scope.suggestedEventsRaw = [];

      // ng-model variables
      $scope.formData = {
        //interest:
        //course:
        //event: {
          //name:
          //day:
          //time:
        //}
      };

      // ===== INITIALIZE ======
      getUserData();

      /**
       * Retrieves the userData from the singleton ezUserData.
       * @return {void}
       */
      function getUserData() {
        ezUserData.getUserType().then(function(storedType) {
          $scope.userType = storedType;

          getUserName();
          getAlias();
          getInterests();

          if($scope.userType === 'user') {
            getCourses();
          }
          else {  // Group
            getEvents();
          }
        });
      }

      /**
       * Gets the userName of the user. Note: This is the username used in the
       * database and not what the user is referred by.
       * @return {void}
       */
      function getUserName() {
        ezUserData.getUserName().then(function(name) {
          $scope.userName = name;
        });
      }

      /**
       * Gets the alias of the user. This is what will be used
       * to refer to the user in the front-facing application.
       * @return {void}
       */
      function getAlias() {
        ezUserData.getAlias().then(function(name) {
          $scope.alias = name;
        });
      }

      /**
       * Gets the interests of the user.
       * @return {void}
       */
      function getInterests() {
        ezUserData.getInterests().then(function(interests) {
          $scope.interests = interests;
        });
      }

      /**
       * Gets the courses of the user
       * @return {void}
       */
      function getCourses() {
        ezUserData.getCourses().then(function(courses) {
          $scope.courses = courses;
        });
      }

      /**
       * Gets the events hosted by the user
       * @return {void}
       */
      function getEvents() {
        ezUserData.getEvents().then(function(retrievedEvents) {
          //console.log(retrievedEvents);
          $scope.events = retrievedEvents;
          $scope.eventsReadable = [];
          for(var i = 0; i < $scope.events.length; ++i) {
            $scope.eventsReadable.push({
              EventName: $scope.events[i].EventName,
              GroupID: $scope.events[i].GroupID,
              ScheduleTimes: ezTimeConverter.dayToReadable($scope.events[i].ScheduleTimes)
            });
          }

          //console.log($scope.eventsReadable);
          //console.log($scope.events);
        });

      }

      // ====== SCOPE FUNCTIONS ======
      /**
       * Deletes the specified interest from the 'Looks' User table
       * or the 'Relates' Group table based on the 'userType'.
       * @param  {Interest JSON Obj} interest Interest tuple from the database
       * @return {void}
       */
      function deleteInterest(interest) {
        var interestVal = interest.Interest;
        var table, condition;
        // User Deleting Interest
        if($scope.userType === 'user') {
          table = 'Looks';
          condition = 'UserID=\'' + $scope.userName + '\'+AND+' + 'Interest=\'' + interestVal + '\'';
        }
        else {  // Group deleting interest
          table = 'Relates';
          condition = 'GroupID=\'' + $scope.userName + '\'+AND+' + 'Interest=\'' + interestVal + '\'';
        }
        ezSQL.deleteQuery(table, condition).then(function(/* success */) {
          // Update interest list
          getInterests();
        });
      }

      /**
       * Depending on the 'userType', add an interest for a
       * Group in the 'Relates' table or add an interest for a User
       * in the 'Looks' table
       */
      function addInterest() {
        var table, attrArr, valueArr;
        // Insert into the interest table if the interest DNE
        table = 'Interest';
        attrArr = ['Interest'];
        valueArr = [$scope.formData.interest];
        ezSQL.insertQuery(table, attrArr, valueArr);

        // User adding Interest
        if($scope.userType === 'user') {
          table = 'Looks';
          attrArr = ['UserID', 'Interest'];
        }
        else {  // Group adding Interest
          table = 'Relates';
          attrArr = ['GroupID', 'Interest'];
        }
        valueArr = [$scope.userName, $scope.formData.interest];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(/* success */) {
          // Reset form and update interest list
          $scope.formData.interest = '';
          getInterests();
        });
      }

      /**
       * Let a user delete a course
       * @param  {Course JSON Obj} course A course tuple from the database
       * @return {void}
       */
      function deleteCourse(course) {
        var courseID = course.CourseID;
        var table = 'Takes';
        var condition = 'UserID=\'' + $scope.userName + '\'+AND+' + 'CourseID=\'' + courseID +'\'';
        ezSQL.deleteQuery(table, condition).then(function(/* success */) {
          // Update course list
          getCourses();
        });
      }

      /**
       * Let a user add a course.
       */
      function addCourse() {
        var table, attrArr, valueArr;
        // Insert into Course table if DNE
        table = 'Course';
        attrArr = ['CourseID'];
        valueArr = [$scope.formData.course];
        ezSQL.insertQuery(table, attrArr, valueArr);

        table = 'Takes';
        attrArr = ['UserID', 'CourseID'];
        valueArr = [$scope.userName, $scope.formData.course];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(/* success */) {
          // Reset form and update course list
          $scope.formData.course = '';
          getCourses();
        });
      }

      /**
       * Deletes the specified event from the event table. This will be done from
       * the group 'userType'.
       * In addition, if there are any 'Person's who 'Attend' the 'eventArg', the
       * tuple in 'Attend' will be deleted
       * @param  {Event JSON Obj} eventArg Tuple from Event table in database
       * @return {void}
       */
      function deleteEvent(eventArg) {
        //console.log(eventArg);
        var table, condition, eventTime;
        table = 'Event';
        eventTime = ezTimeConverter.readableToDay(eventArg.ScheduleTimes);
        condition = 'EventName=\'' + eventArg.EventName + '\'+AND+' +
            'GroupID=\'' + $scope.userName + '\'+AND+' +
            'ScheduleTimes=\'' + eventTime + '\'';
        ezSQL.deleteQuery(table, condition).then(function(/* success */) {
          getEvents();
        });

        // Remove all of the deleted 'events' from the 'Attends' table.
        table = 'Attends';
        condition = 'EventName=\'' + eventArg.EventName + '\'+AND+' +
                    'GroupID=\'' + eventArg.GroupID + '\'+AND+' + 'ScheduleTimes=\'' + eventTime + '\'';
        ezSQL.deleteQuery(table, condition).then(function(/* success */) {
          // Do nothing
        });
      }

      /**
       * Adds the specified event to the 'Event' table in the database
       * @return {void}
       */
      function addEvent() {
        var table, attrArr, time, valueArr;
        time = $scope.formData.event.day + $scope.formData.event.hour;

        table = ['Event'];
        attrArr = ['EventName', 'GroupID', 'ScheduleTimes'];
        valueArr = [$scope.formData.event.name, $scope.userName, time];
        ezSQL.insertQuery(table, attrArr, valueArr).then(function(/* success */) {
          $scope.formData.event.name = '';
          $scope.formData.event.day = '';
          $scope.formData.event.hour = '';
          getEvents();
        });
      }

      /**
       * Generate a list of potential events to attend for the user.
       * @return {void}
       */
      function generateEvents() {
        ezScheduleGenerator.generateEvents($scope.userName).then(function(eventsArr) {
          $scope.suggestedEventsRaw = eventsArr;
          var i;
          for( i = 0; i < eventsArr.length; ++i ) {
            eventsArr[i].ScheduleTimes = ezTimeConverter.weekToDay(eventsArr[i].ScheduleTimes);
            eventsArr[i].ScheduleTimes = ezTimeConverter.dayToReadable(eventsArr[i].ScheduleTimes);
          }
          $scope.suggestedEventsFormatted = eventsArr;
        });
      }

      // ====== Scoped Functions ======
      $scope.deleteInterest = deleteInterest;
      $scope.addInterest = addInterest;
      $scope.deleteCourse = deleteCourse;
      $scope.addCourse = addCourse;
      $scope.deleteEvent = deleteEvent;
      $scope.addEvent = addEvent;
      $scope.generateEvents = generateEvents;
    }

})();
