/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that generates schedules for us.
 * Time is stored in two formats:
 *  1. [DAY FORMAT] String of 4 groups of 8 chars representing bits.
 *  The first group denotes each day of the week, in MTWRFSU order. The 8th bit is 0 and acts as a placeholder.
 *  The other 3 groups of 8 bits represents each hour of the day. Starting at 0:00 and going to 23:00.
 *  i.e. Monday at 2AM is 10000000 00100000 00000000 00000000
 *  2. [WEEK FORMAT] String of seven 24 bit substrings, where each bit is an hour of the day. Substrings in order
 *  MTWRFSU.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezTimeConverter', ezTimeConverter);

  ezTimeConverter.$inject = [];

  function ezTimeConverter() {

    var ezTimeConverterObj = {
      /**
       * Conerts day (format 1) to week (format 2)
       * @param  {string} dayTime 32 char array in format 1 above.
       * @return {string}       168 char array in format 2 above.
       */
      dayToWeek: function(dayTime) {
        var time = [];
        var i;
        for(var d = 0; d < 7; ++d) {
        	if(dayTime[d] === '0') {
        		for(i = 0; i < 24; ++i) {
        			time.push('0');
            }
        	}
        	else {
        		for(i = 8; i < 32; ++i) {
        			time.push(dayTime[i]);
            }
        	}
        }
        time = time.join('');
        return time;
      },
      /**
       * Converts week (format 2) to day (format 1).
       * Note: The week format must have ONLY ONE HOUR OF TIME. i.e Mon 3 PM
       * IT CANNOT OCCUPY MORE THAN ONE HOUR OF TIME.
       * @param  {string} weekSchedule 168 char array in format 2 above.
       * @return {string}              32 char array in format 1 above.
       */
      weekToDay: function(weekSchedule) {
        // Sanity check the length of weeklySchedule.
        if(weekSchedule.length !== 24 * 7) {
          return undefined;
        }

        var time = [],
            countTimes = 0,
            i;
        for( i = 0; i < weekSchedule.length; ++i ) {
          if(weekSchedule[i] === '1') {
            countTimes++;
            if(countTimes > 1) {
              return undefined;
            }

            var hour = i % 24;
            var day = i / 24;

            // Push on the chars that represent the day.
            var j;
            for( j = 0; j < day - 1; ++j) {
              time.push('0');
            }
            time.push('1');
            for(; j < 8; ++j) { // 8 chars are used to represent the day
              time.push('0');
            }

            // Push on the chars that represent the hours of the day.
            for( j = 0; j < hour - 1; ++j) {
                time.push('0');
            }
            time.push('1');
            for(; j < 24; ++j) {
              time.push('0');
            }
          }
        }
        time = time.join('');
        return time;
      },
      /**
       * Converts the day (format 1) to a readable format Day Time AM/PM
       * @param  {string} time Time is a 32 char array with only 1's and 0's.
       * See format 1 above for more details
       * @return {string} The human readable string of the date in format
       * Day Time AM/PM
       */
      dayToReadable: function(time) {
        //console.log("dayToReadable %s", time);
        var str = [];
        if(time[0] === '1') {
        	str.push('Mon');
        }
        else if(time[1] === '1') {
        	str.push('Tue');
        }
        else if(time[2] === '1') {
        	str.push('Wed');
        }
        else if(time[3] === '1') {
        	str.push('Thu');
        }
        else if(time[4] === '1') {
        	str.push('Fri');
        }
        else if(time[5] === '1') {
        	str.push('Sat');
        }
        else if(time[6] === '1') {
        	str.push('Sun');
        }
        str.push(' ');
        for(var i = 0; i < 24; ++i) {
        	if(time[i+8] === '1') {
        		var p = i;
            if(p > 12) {
              p -= 12;
            }
            if(p === 0) {
              p = 12;
            }
        		if(p >= 10) {
        			str.push('1');
            }
        		var n = p%10;
        		str.push(n.toString());
            str.push(' ');

        		if(i > 11) {
        			str.push('P');
            }
        		else {
        			str.push('A');
            }
        		str.push('M');
        	}
        }
        str = str.join('');
        //console.log(str);
        return str;
      },
      /**
       * Converts a readable string to day (format 1).
       * Note: Only works for EVENTS
       * @param  {string} readableTime A string in a human readable date format
       * @return {string} The day (format 1) string conversion.
       */
      readableToDay: function(readableTime) {
        var retval = [];
        var tempArr = readableTime.split(' ');
        var day = tempArr[0];
        var time = tempArr[1];
        var halfOfDay = tempArr[2];

        switch(day) {
          case 'Mon':
            retval.push('10000000');
            break;
          case 'Tue':
            retval.push('01000000');
            break;
          case 'Wed':
            retval.push('00100000');
            break;
          case 'Thu':
            retval.push('00010000');
            break;
          case 'Fri':
            retval.push('00001000');
            break;
          case 'Sat':
            retval.push('00000100');
            break;
          case 'Sun':
            retval.push('00000010');
            break;
        }

        if(halfOfDay === 'PM') {
          retval.push('000000000000');
        }

        switch(time) {
          case '12':
            retval.push('100000000000');
            break;
          case '1':
            retval.push('010000000000');
            break;
          case '2':
            retval.push('001000000000');
            break;
          case '3':
            retval.push('000100000000');
            break;
          case '4':
            retval.push('000010000000');
            break;
          case '5':
            retval.push('000001000000');
            break;
          case '6':
            retval.push('000000100000');
            break;
          case '7':
            retval.push('000000010000');
            break;
          case '8':
            retval.push('000000001000');
            break;
          case '9':
            retval.push('000000000100');
            break;
          case '10':
            retval.push('000000000010');
            break;
          case '11':
            retval.push('000000000001');
            break;
        }

        if(halfOfDay === 'AM') {
          retval.push('000000000000');
        }

        retval = retval.join('');
        return retval;
    },
    /**
     * Determines whether userSchedule (weekly format) and eventSchedule (weekly format)
     * conflict with each other.
     * Returns true if either weekly schedule is invalid
     * @param  {string} userSchedule A 168 character array of the user's schedule in weekly format
     * @param  {string} eventSchedule A 168 character array of the event's schedule in weekly format
     * @return {Boolean} True if the schedules conflict.
     * False if they don't conflict
     */
    weeklyTimesConflict: function(userSchedule, eventSchedule) {
      // Check to make sure both are valid weeklySchedules.
      // 24 * 7 is the number of characters in a TimeSchedule weekly format
      if(userSchedule.length !== eventSchedule.length || userSchedule.length !== 24 * 7) {
        return true;
      }

      // Check if eventSchedule is valid. That is, it is scheduled on some day
      // and time.
      var eventScheduleValid = false;
      var i;
      for(i = 0; i < eventSchedule.length; ++i) {
        if(eventSchedule[i] === '1') {
          eventScheduleValid = true;
        }
      }
      if(!eventScheduleValid) {
        return true;
      }

      // Check if the schedules conflict.
      for(i = 0; i < userSchedule.length; ++i) {
        if(userSchedule[i] === '1' && eventSchedule[i] === '1') {
          return true;
        }
      }
      return false;
    }
  };

    return ezTimeConverterObj;
  }
})();
