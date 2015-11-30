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
      /* ====== Cached ====== */
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
      /* ====== Queries ===== */
      getAlias: function() {
        var attrArr, tableArr, condition;
        if(userType === 'user') {
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
          //console.log(userName);
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
      /**
       * Updates the 'FirstName' in the 'Person' tuple or
       * 'GroupName' in the 'Organization' tuple specified by 'userType'
       * @param  {string} firstName The new alias
       * @return {void}
       */
      setAlias: function(alias) {
        var table, attrArr, valueArr, condition;
        valueArr = [alias];
        if(userType === 'user') { // User
          table = 'Person';
          attrArr = ['FirstName'];
          condition = 'UserID=\'' + userName + '\'';
        }
        else {  // Group
          table = 'Organization';
          attrArr = ['GroupName'];
          condition = 'GroupID=\'' + userName + '\'';
        }
        ezSQL.updateQuery(table, attrArr, valueArr, condition);
      },
      /**
       * Returns a promise of the 'LastName' in the 'Person' tuple.
       * If 'userType' is group, then undefined is returned
       * @return {Promise} A promise with the resolved value being the
       * 'LastName' in the 'Person' tuple
       */
      getLastName: function() {
        // Return undefined if 'userType' is group
        if(userType === 'group') {
          return $q(function(resolve) {
            resolve(undefined);
          });
        }

        // 'userType' must be user
        var attrArr = ['LastName'];
        var tableArr = ['Person'];
        var condition = 'UserID=\'' + userName + '\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result){
          return $q(function(resolve) {
            resolve(result[0].LastName);
          });
        });
      },
      /**
       * Updates the 'LastName' in the 'Person' tuple in the database
       * @param  {string} firstName The new alias
       * @return {void}
       */
      setLastName: function(lastName) {
        var table = 'Person';
        var attrArr = ['LastName'];
        var valueArr = [lastName];
        var condition = 'UserID=\'' + userName + '\'';
        ezSQL.updateQuery(table, attrArr, valueArr, condition);
      },
      /**
       * Updates the 'UserPassword' in the 'Person' tuple or
       * the 'GroupPassword' in the 'Organization' tuple in the database.
       * @param  {string} password The new password
       * @return {void}
       */
      setPassword: function(password) {
        var table, attrArr, valueArr, condition;
        valueArr = [password];
        if(userType === 'user') { // User
          table = 'Person';
          attrArr = ['UserPassword'];
          condition = 'UserID=\'' + userName + '\'';
        }
        else {  // Group
          table = 'Organization';
          attrArr = ['GroupPassword'];
          condition = 'GroupID=\'' + userName + '\'';
        }

        ezSQL.updateQuery(table, attrArr, valueArr, condition);
      },
      getInterests: function() { // Returns an array of interests
        var attrArr, tableArr, condition;
        if(userType === 'user') {
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
      getCourses: function() {
        var attrArr = ['CourseID'];
        var tableArr = ['Takes'];
        var condition = 'UserID=\'' + userName + '\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            courses = result;
            //console.log(result);
            resolve(result);
          });
        });
      },
      getEvents: function() {
        //TODO User version
        var attrArr = ['EventName', 'GroupID', 'ScheduleTimes'];
        var tableArr = ['Event'];
        var condition = 'GroupID=\'' + userName + '\'';
        return ezSQL.getQuery(attrArr, tableArr, condition).then(function(result) {
          return $q(function(resolve) {
            events = result;
            resolve(result);
          });
        });
      }
    };

    return ezUserDataObj;
  }
})();
