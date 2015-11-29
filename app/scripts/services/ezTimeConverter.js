/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that generates schedules for us.
 * Time is stored in two formats:
 *  1. String of one 4 groups of 8 bits. The first group denotes each day of
 *  the week, in MTWRFSU order. The 8th bit is 0 and acts as a placeholder.
 *  The other 3 groups of 8 bits represents each hour of the day. Starting at 0:00 and going to 23:00.
 *  i.e. Monday at 2AM is 10000000 00100000 00000000 00000000
 *  2. String of seven 24 bit substrings, where each bit is an hour of the day. Substrings in order
 *  MTWRFSU.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezTimeConverter', ezTimeConverter);

  ezTimeConverter.$inject = [];

  function ezTimeConverter() {

    var ezTimeConverterObj = {
      // Converts day (format 1) to week (format 2)
      // @param array is 32 bit char array in format 1 above.
      // @return Returns a 168 bit char array in format 2 above.
      dayToWeek: function(array) {
        var time = [];
        var i;
        for(var d = 0; d < 7; ++d) {
        	if(array[d] === 0) {
        		for(i = 0; i < 24; ++i) {
        			time.push('0');
            }
        	}
        	else {
        		for(i = 8; i < 32; ++i) {
        			time.push(array[i]);
            }
        	}
        }
        time = time.join('');
        return time;
      },
      // Converts day (format 1) to readable format Day Time(AM/PM)
      // @param time is 32 bit char array in format 1 above.
      // @return string that is readable.
      dayToReadable: function(time) {
        //console.log("dayToReadable %s", time);
        var str = [];
        // Determine the string of the day
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
        // Determine the time. i needs to be offset by 8 bits that represent
        // the day of the week
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
      }
    };

    return ezTimeConverterObj;
  }
})();
