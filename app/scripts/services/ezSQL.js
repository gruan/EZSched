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

    // table should not be in array format
    function insertQuery(table, attrArr, valueArr) {
      var query_path = '/insertQuery';
      var attrStr = '(';
      for(var i = 0; i < attrArr.length; ++i) {
        attrStr += attrArr[i];
        if(i < attrArr.length - 1) {
          attrStr += ',';
        }
      }
      attrStr += ')';

      var valueStr = '(';
      for(var i = 0; i < valueArr.length; ++i) {
        valueStr = valueStr + '\'' + valueArr[i] + '\'';
        if(i < valueArr.length - 1) {
          valueStr += ',';
        }
      }
      valueStr += ')';

      var query = query_path + '?query=INSERT+INTO+' + table + attrStr + '+VALUES' + valueStr;

      return $q.all[(
        $http({
          method: 'GET',
          //url: '/insertQuery?query=INSERT+INTO+Test+VALUES(' + $scope.username + ',' + $scope.password + ');'
          url: query
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        })
      )];
    }

    // attrArr and tableArr should be Arrays
    // Condition string. Spaces need to be replaced with +
    function getQuery(attrArr, tableArr, condition) {
      var query_path = '/getQuery';
      var attrStr = "";
      for(var i = 0; i < attrArr.length; ++i) {
        attrStr += attrArr[i];
        if(i < attrArr.length - 1) {
          attrStr += ',';
        }
      }

      var tableStr = "";
      for(var i = 0; i < tableArr.length; ++i) {
        tableStr += tableArr[i];
        if(i < tableArr.length - 1) {
          tableStr += ',';
        }
      }

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

    ezSQLObj.insertQuery = insertQuery;
    ezSQLObj.getQuery = getQuery;

    return ezSQLObj;
  }
})();
