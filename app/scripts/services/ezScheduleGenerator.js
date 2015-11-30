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

  ezScheduleGenerator.$inject = ['$q', 'ezSQL', 'ezTimeConverter'];

  function ezScheduleGenerator($q, ezSQL, ezTimeConverter) {

    var randomBank = [
      {
        eventTime: 'Mon 5PM',
        eventName: 'NOBE Meeting',
        eventLink: 'https://illinois.collegiatelink.net/organization/NOBE'
      },
      {
        eventTime: 'Mon 7PM',
        eventName: 'WebMonkeys Meeting',
        eventLink: 'https://www-s.acm.illinois.edu/sigs/223'
      },
      {
        eventTime: 'Mon 7PM',
        eventName: 'SIGGRAPH Meeting',
        eventLink: 'https://www-s.acm.illinois.edu/sigs/133'
      },
      {
        eventTime: 'Tues 6PM',
        eventName: 'OpenNSM Meeting',
        eventLink: 'https://www-s.acm.illinois.edu/sigs/163'
      },
      {
        eventTime: 'Tues 7PM',
        eventName: 'Gamebuilders',
        eventLink: 'https://www-s.acm.illinois.edu/sigs/23'
      },
      {
        eventTime: 'Wed 5PM',
        eventName: 'SIGCHI Meeting',
        eventLink: 'https://www-s.acm.illinois.edu/sigs/83'
      },
      {
        eventTime: 'Wed 7PM',
        eventName: 'Chess Club Meeting1',
        eventLink: 'https://illinois.collegiatelink.net/organization/illinichessclub'
      },
      {
        eventTime: 'Thurs 6PM',
        eventName: 'Ballroom Dancing',
        eventLink: 'https://publish.illinois.edu/dancing/'
      },
      {
        eventTime: 'Thurs 7PM',
        eventName: 'Ballroom Dancing1',
        eventLink: 'https://publish.illinois.edu/dancing/'
      },
      {
        eventTime: 'Thurs 8PM',
        eventName: 'Ballroom Dancing2',
        eventLink: 'https://publish.illinois.edu/dancing/'
      },
      {
        eventTime: 'Sun 6PM',
        eventName: 'Chess Club Meeting2',
        eventLink: 'https://illinois.collegiatelink.net/organization/illinichessclub'
      },
      {
        eventTime: 'Sun 7PM',
        eventName: 'Chess Club Meeting3',
        eventLink: 'https://illinois.collegiatelink.net/organization/illinichessclub'
      }
    ];

    var ezScheduleGeneratorObj = {
      generateEvents: function() {
        var result = [];

        for(var i = 0; i < randomBank.length; ++i) {
          if(Math.random() > 0.50 && (i === 0 || randomBank[i].eventName !== randomBank[i-1].eventName)) {
            result.push(randomBank[i]);
            while(i+1 < randomBank.length && randomBank[i].eventName === randomBank[i+1].eventName) {
              result.push(randomBank[++i]);
            }
          }
        }
        return $q(function(resolve) {
          resolve(result);
        });
      },
      /**
       * Generates the suggested events for a user of 'userType' user
       * @param {string} userID The UserID of the user.
       * @return {Promise} A promise which resolves an array of events.
       */
      generateRealEvents: function(userID) {
        return getWeeklySchedule(userID).then(function(weeklySchedule) {
          console.log(weeklySchedule);
        });
      }
    };

    // ====== Helper Functions =======

    /**
     * Converts an array of course times in day format to a combined
     * weekly schedule.
     * @param  {[strings]} courseDayTimes Array of schedule day format strings.
     * @return {Promise}  A promise containing a string with a person's weekly schedule
     */
    function courseDayTimesToWeeklySchedule(courseDayTimes) {
      console.log(courseDayTimes);
      var weeklySchedule = [];
      var i, j;
      for(i = 0; i < 24 * 7; ++i) {
        weeklySchedule.push('0');
      }
      var courseWeekTime = '';
      for(i = 0; i < courseDayTimes.length; ++i) {
        courseWeekTime = ezTimeConverter.dayToWeek(courseDayTimes[i].ScheduleTimes);
        for(j = 0; j < courseWeekTime.length; ++j) {
          if(courseWeekTime[j] === '1') {
            weeklySchedule[j] = '1';
          }
        }
      }

      weeklySchedule = weeklySchedule.join('');

      return $q(function(resolve) {
        resolve(weeklySchedule);
      });
    }

    /**
     * Generates the weekly schedule of the user.
     * @param {string} userID The UserID of the suer.
     * @return {Promise} A promise which resolves a string 168 char string
     * containing the person's weekly schedule
     */
    function getWeeklySchedule(userID) {
      var attrArr, tableArr, condition;
      attrArr = ['ScheduleTimes'];
      tableArr = ['Person', 'Takes', 'Course'];
      condition = 'Person.UserID=\'' + userID + '\'+AND+' +
          'Person.UserID=Takes.UserID' + '+AND+' +
          'Takes.CourseID = Course.CourseID';
      return ezSQL.getQuery(attrArr, tableArr, condition)
        .then(courseDayTimesToWeeklySchedule);
    }

    return ezScheduleGeneratorObj;
  }
})();
