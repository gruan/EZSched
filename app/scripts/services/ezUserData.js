/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that stores user data for us.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezUserData', ezUserData);

  ezUserData.$inject = ['$q', 'ezSQL'];

  function ezUserData($q, ezSQL) {
    var ezUserDataObj = {};

    var userName = 'admin';

    var interests = [];

    var ezUserDataObj = {
      getUserName: function() {
        return $q(function(resolve){
          resolve(userName);
        });
      },
      setUserName: function(uid) {
        userName = uid;
        return $q(function(resolve) {
          resolve(userName);
        });
      },
      getInterests: function() { // Returns an array of interests
        var attrArr = ['Interest'];
        var tableArr =['Looks'];
        var condition = 'UserID=\'' + userName +'\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            interests = result;
            resolve(result);
            //console.log(result);
          });
        });
      },
      getFirstName: function() {
        var attrArr = ['FirstName'];
        var tableArr =['Person'];
        var condition = 'UserID=\'' + userName +'\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            resolve(result[0].FirstName);
            //console.log(result[0].FirstName);
          });
        });
      },
      getCourses: function() {
        var attrArr = ['CourseID'];
        var tableArr = ['Takes'];
        var condition = 'UserID=\'' + userName + '\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            console.log(result);
            resolve(result);
          });
        });
      }
    }

    return ezUserDataObj;
  }
})();
