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
    var userName = 'admin';
    var interests = [];
    var courses = [];
    var events = [];

    // group if group
    // user if user
    var userType ='user';

    var ezUserDataObj = {
      getUserType: function() {
        return $q(function(resolve) {
          resolve(userType);
        });
      },
      setUserType: function(newType) {
        userType = newType;
        return $q(function(resolve) {
          resolve(userName);
        });
      },
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
        var attrArr, tableArr, condition;
        if(userType == 'user') {
          attrArr = ['Interest'];
          tableArr =['Looks'];
          condition = 'UserID=\'' + userName +'\'';
        }
        else { // Group
          attrArr = ['Interest'];
          tableArr = ['Relates'];
          condition = 'GroupID=\'' + userName + '\'';
        }
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            interests = result;
            resolve(result);
            //console.log(result);
          });
        });
      },
      getAlias: function() {
        var attrArr, tableArr, condition;
        if(userType == 'user') {
          attrArr = ['FirstName'];
          tableArr =['Person'];
          condition = 'UserID=\'' + userName +'\'';

          return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
            return $q(function(resolve) {
              resolve(result[0].FirstName);
            });
          });
        }
        else { // Group
          console.log(userName);
          attrArr = ['GroupName'];
          tableArr =['Organization'];
          condition = 'GroupID=\'' + userName + '\'';

          return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
            return $q(function(resolve) {
              resolve(result[0].GroupName);
            });
          });
        }
      },
      getCourses: function() {
        var attrArr = ['CourseID'];
        var tableArr = ['Takes'];
        var condition = 'UserID=\'' + userName + '\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            courses = result;
            console.log(result);
            resolve(result);
          });
        });
      },
      getEvents: function() {
        //TODO User version
        var attrArr = ['EventName', 'EventLocation', 'ScheduleTimes'];
        var tableArr = ['Event'];
        var condition = 'GroupID=\'' + userName + '\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            events = result;
            console.log(result);
            resolve(result);
          });
        });
      }
    }

    return ezUserDataObj;
  }
})();
