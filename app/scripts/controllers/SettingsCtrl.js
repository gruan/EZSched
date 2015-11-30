/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', 'ezUserData', 'ezSQL'];


    function SettingsCtrl ($scope, ezUserData, ezSQL) {
      // ===== INITIALIZE ======
      $scope.formData = {
        username: '',
        password: '',

        firstName: '',
        lastName: '',

        groupName: ''
      };
      $scope.userType = 'user';

      // ====== Scoped Functions ======
      /**
       * Initializes the 'formData' and populates the '$scope.userType'
       * @return {void}
       */
      function initializeFormData() {
        ezUserData.getUserType().then(function(storedType) {
          $scope.userType = storedType;

          if($scope.userType === 'user') {  // User

          }
          else {  // Group

          }
        });


      }

      /**
       * Gets the username (ID) of the user and stores it in
       * '$scope.formData.username'
       */
      function getUserName() {
        ezUserData.getUserName().then(function(name) {
          $scope.formData.username = name;
        });
      }

      /**
       * Gets the firstName of the user and stores it in
       * '$scope.formData.firstName'
       * @return {void}
       */
      function getFirstName() {
        ezUserData.getAlias().then(function(alias) {
          $scope.formData.firstName = alias;
        });
      }

      /**
       * Updates the 'alias' in ezUserData and the 'FirstName' in the Person's
       * tuple
       * @param {string} firstName The new firstname
       */
      function setFirstName(firstName) {
        ezUserData.setAlias(firstName);
      }

      function getLastName() {

      }

      function setLastName(lastName) {

      }

      function getGroupName() {

      }

      function setGroupName(groupName) {

      }

      function getPassword() {

      }

      function setPassword(password) {

      }
    }

})();
