/**
 * Created on October 18, 2015 by George Ruan.
 *
 * Service that queries mySQL for us.
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezSQL', ezSQL);

  ezSQL.$inject = ['$http'];

  function ezSQL($http) {
    var ezSQL;
    command = "INSERT+INTO",
        table = "Test"

    $http({
      method: 'GET',
      //url: '/insertQuery?query=INSERT+INTO+Test+VALUES(' + $scope.username + ',' + $scope.password + ');'
      url:"/insertQuery?query=INSERT+INTO+Test(UID,Password)+VALUES('" + $scope.username + "','" + $scope.password + "')"
    }).then(function successCallback(response) {
      console.log("yay!");
      $timeout(function() {
        $location.path('profile');
      }, 300)
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

    return ezSQL;
  }
})();
