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

  ezScheduleGenerator.$inject = ['$q', 'ezUserData', 'ezTimeConverter'];

  function ezScheduleGenerator($q, ezUserData, ezTimeConverter) {

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
        return ezUserData.getWeeklySchedule(userID).then(function(weeklySchedule) {
          //console.log(weeklySchedule);
          getInterestingEvents(userID);
        });
      }
    };

    // ====== Helper Functions =======
    /**
     * Gets all events that coincide with the user's (specified by userID) interests
     * @param  {string} userID The userID of the user
     * @return {Promise} A promise containing all the events that coincide with
     * the user's interests. The Promise contains an array of objects of the form
     * {EventName, GroupName, ScheduleTimes}
     */
    function _getInterestingEvents(userID) {
      var attrArr, tableArr, condition;
      attrArr = ['EventName', 'GroupName', 'ScheduleTimes'];
      tableArr = ['Person', 'Looks', 'Organization', 'Event', 'Relates'];
      condition = 'Person.UserID=\'' + userID + '\'+AND+' +
            'Person.UserID=Looks.UserID' + '+AND+' +
            'Looks.Interest=Relates.Interest' + '+AND+' +
            'Relates.GroupID=Organzation.GroupID' + '+AND+' +
            'Organization.GroupID=Event.GroupID';
      console.log(condition);
    }

    return ezScheduleGeneratorObj;
  }
})();
