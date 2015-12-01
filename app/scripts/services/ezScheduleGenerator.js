/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that generates schedules for us.
 * Time is stored in two formats:
 *  1. (DAY) String of one 0 bit (character type) at the end, 7 bits for each day of the week MTWRFSU and
 *  then 24 bits for each hours of the day. i.e. Monday at 2AM is 10000000 00100000 00000000 00000000
 *  2. (WEEK) String of seven 24 bit (character type) substrings, where each bit is an hour of the day. Substrings in order
 *  MTWRFSU.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezScheduleGenerator', ezScheduleGenerator);

  ezScheduleGenerator.$inject = ['$q', 'ezUserData', 'ezSQL', 'ezTimeConverter'];

  function ezScheduleGenerator($q, ezUserData, ezSQL, ezTimeConverter) {
    var ezScheduleGeneratorObj = {
      /**
       * Generates the suggested events for a user of 'userType' user
       * @param {string} userID The UserID of the user.
       * @return {Promise} A promise which resolves an array of events.
       */
      generateEvents: function(userID) {
        //TODO
        return ezUserData.getWeeklySchedule(userID).then(function(weeklySchedule) {
          return getInterestingEvents(userID).then(function(interestingEvents) {
            var suggestedEvents = filterConflictingEvents(interestingEvents, weeklySchedule);
            suggestedEvents = chooseRandomEvents(suggestedEvents, 5);

            return $q(function(resolve) {
              resolve(suggestedEvents);
            });
          });
        });
      }
    };

    // ====== Helper Functions =======

    /**
     * Takes an array of 'Interesting Events'
     * {EventName, GroupName, ScheduleTimes(day format)} and converts it to
     * {EventName, GroupName, ScheduleTimes(week format)}
     * @param  {[JSON]} eventArr An array of JSON's in the format
     * {EventName, GroupName, ScheduleTimes(day format)}
     * @return {[JSON]}          An array of JSON's in the format
     * {EventName, GroupName, ScheduleTimes(week format)}
     */
    function toInterestingEventWeekFormat(eventArr) {
      var i;
      for(i = 0; i < eventArr.length; ++i) {
        eventArr[i].ScheduleTimes = ezTimeConverter.dayToWeek(eventArr[i].ScheduleTimes);
      }

      return $q(function(resolve) {
        resolve(eventArr);
      });
    }

    /**
     * Gets all events that coincide with the user's (specified by userID) interests
     * @param  {string} userID The userID of the user
     * @return {Promise} A promise containing all the events that coincide with
     * the user's interests. The Promise contains an array of objects of the form
     * {EventName, GroupName, ScheduleTimes (week format)}
     */
    function getInterestingEvents(userID) {
      var attrArr, tableArr, condition;
      attrArr = ['EventName', 'GroupName', 'ScheduleTimes'];
      tableArr = ['Person', 'Looks', 'Organization', 'Event', 'Relates'];
      condition = 'Person.UserID=\'' + userID + '\'+AND+' +
            'Person.UserID=Looks.UserID' + '+AND+' +
            'Looks.Interest=Relates.Interest' + '+AND+' +
            'Relates.GroupID=Organization.GroupID' + '+AND+' +
            'Organization.GroupID=Event.GroupID';
      return ezSQL.getQuery(attrArr, tableArr, condition)
              .then(toInterestingEventWeekFormat);

    }

    /**
     * Filters events out that conflict with the 'weeklySchedule' (week format)
     * @param  {[JSON]} eventsArr      Array of JSONs in the format
     * {EventName, GroupName, ScheduleTimes (week format)}
     * @param  {string} weeklySchedule A 168 character array of a person's weekly
     * schedule in (week format)
     * @return {[JSON]}           An array of JSONS in the format:
     * {EventName, GroupName, ScheduleTimes (week format)}.
     * These events will not conflict with the 'weeklySchedule'
     */
    function filterConflictingEvents(eventsArr, weeklySchedule) {
      var retVal = [];
      var i;
      for(i = 0; i < eventsArr.length; ++i) {
        if(!ezTimeConverter.weeklyTimesConflict(weeklySchedule, eventsArr[i].ScheduleTimes)) {
          retVal.push(eventsArr[i]);
        }
      }

      return retVal;
    }

    /**
     * Pick an 'avgNumPicked' number of elements of 'arr' and
     * @param  {Array} arr          An array of elements to be picked form
     * @param  {Number} avgNumPicked Average number of elements picked from 'arr'
     * @return {Array}              The array of randomly picked elements. It
     * will contain on average 'avgNumPicked' elements.
     */
    function chooseRandomEvents(arr, avgNumPicked) {
      var probability = avgNumPicked / arr.length,
          retVal = [],
          random, i;
      for( i = 0; i < arr.length; ++i ) {
        random = Math.random();
        if(random < probability) {
          retVal.push(arr[i]);
        }
      }
      return retVal;
    }

    return ezScheduleGeneratorObj;
  }
})();
