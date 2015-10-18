/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that queries mySQL for us.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezSQL', ezSQL);

  ezSQL.$inject = ['$http', '$q'];

  function ezSQL($http, $q) {
    var ezSQLObj = {};

    // Returns 1 if tupleExists, 0 otherwise.
    // table should be in array format
    function tupleExists(tableArr, attrArr, valueArr) {
      var query_path = '/getQuery';
      var attrStr = listifyArr(attrArr);
      var tableStr = listifyArr(tableArr);

      var condition = '';
      for(var i = 0; i < attrArr.length; ++i) {
        condition = condition + attrArr[i] + '=\'' + valueArr[i] +'\'';
        if(i < attrArr.length - 1) {
           condition += '+AND+'
        }
      }

      var query = query_path + '?query=SELECT+' + attrStr +
                  '+FROM+' + tableStr + '+WHERE+' + condition;

      //httpGET requests return the object with the data. Data is what we want as array of tuples
      return $http({ method: 'GET',
              url: query
            }).then(function successCallback(response) {
                 var exists = response.data.length;
                 return $q(function(resolve){
                   resolve(exists);
                 });
            }, function errorCallback(response) {
              console.log('error');
              return $q.reject(undefined);
            });

    }

    // Concatenates an array into a list with start and end char at the start
    // and end of the string. i.e [a1,a2] turns into 'a1,a2'
    // Returns the concatenated string.
    // Stringify indicates whether to stringify the values of the list with single quotes
    function listifyArr(arr, stringify, startChar, endChar) {
      startChar = startChar ? startChar : '';
      endChar = endChar ? endChar : '';
      var result = startChar;
      for(var i = 0; i < arr.length; ++i) {
        if(stringify) {
          result = result + '\'' + arr[i] + '\'';
        }
        else {
          result += arr[i];
        }

        if(i < arr.length - 1) {
          result += ',';
        }
      }
      result += endChar;
      return result;
    }

    // table should not be in array format
    // InsertQuery shall return 1 on successful insertion. 0 on failure
    function insertQuery(table, attrArr, valueArr) {
      var query_path = '/insertQuery';
      var attrStr = listifyArr(attrArr, false, '(', ')');
      var valueStr = listifyArr(valueArr, true, '(', ')');

      var query = query_path + '?query=INSERT+INTO+' + table + attrStr + '+VALUES' + valueStr;

      var tableArr = [table];
      return tupleExists(tableArr, attrArr, valueArr).then(function(exists) {
        if(!exists) {
          $http({method: 'POST',
            url: query
          }).then(function successCallback(response) {
          }, function errorCallback(response) {
          });
          return $q(function(resolve) {
            resolve(true);
          });
        }
        else {
          return $q(function(resolve) {
            resolve(false);
          });
        }
      })
    }

    // attrArr and tableArr should be Arrays
    // Condition string. Spaces need to be replaced with +
    // Returns array of tuples
    function getQuery(attrArr, tableArr, condition) {
      var query_path = '/getQuery';
      var attrStr = listifyArr(attrArr, false);
      var tableStr = listifyArr(tableArr, false);

      var query = query_path + '?query=SELECT+' + attrStr +
                  '+FROM+' + tableStr + '+WHERE+' + condition;

      return $http({ method: 'GET',
              url: query
            }).then(function successCallback(response) {
                 return $q(function(resolve){
                   resolve(response.data);
                 });
            }, function errorCallback(response) {
              console.log('error');
              return $q.reject(undefined);
            });
    }

    // Table is the to delete tuple from the table
    // condition is the condition in WHERE clause
    function deleteQuery(table, condition) {
      var query_path = '/deleteQuery';
      var query = query_path + '?query=DELETE+FROM+' + table +
                  '+WHERE+' + condition;

      //console.log(query);
      return $http({ method: 'GET',
              url: query
            }).then(function successCallback(response) {
              return $q(function(resolve) {
                resolve(true);
              })
            }, function errorCallback(response) {
              return $q(function(resolve) {
                resolve(false);
              })
            });
    }

    ezSQLObj.tupleExists = tupleExists;
    ezSQLObj.insertQuery = insertQuery;
    ezSQLObj.getQuery = getQuery;
    ezSQLObj.deleteQuery = deleteQuery;

    return ezSQLObj;
  }
})();
