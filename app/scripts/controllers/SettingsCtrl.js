/**
 * Created by George Ruan on October 17, 2015.
 *
 * HomeCtrl defines the behavior of the Home Page.
 */

(function() {
  'use strict';

  angular.module('EZSched')
    .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', 'ezUserData', '$timeout'];


    function SettingsCtrl ($scope, ezUserData, $timeout) {
      $scope.formData = {
        username: '',
        password: '',

        firstName: '',
        lastName: '',

        groupName: ''
      };
      //$scope.userType;
      $scope.submitted = false;

      var oldCopyData = {
        username: '',
        password: '',

        firstName: '',
        lastName: '',

        groupName: ''
      };

      // ===== INITIALIZE ======
      initializeFormData();

      // ====== Helper Functions ======
      /**
       * Initializes the 'formData' and populates the '$scope.userType'
       * @return {void}
       */
      function initializeFormData() {
        getUserName();

        ezUserData.getUserType().then(function(storedType) {
          $scope.userType = storedType;

          if($scope.userType === 'user') {  // User
            getFirstName();
            getLastName();
          }
          else {  // Group
            getGroupName();
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
          oldCopyData.username = name;
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
          oldCopyData.firstName = alias;
        });
      }

      /**
       * Updates the 'FirstName' in the Person's tuple
       * @param {string} firstName The new firstname
       */
      function setFirstName(firstName) {
        ezUserData.setAlias(firstName);
      }

      /**
       * Gets the lastName of the user and stores it in
       * '$scope.formData.lastName'
       * @return {void}
       */
      function getLastName() {
        ezUserData.getLastName().then(function(lastName) {
          $scope.formData.lastName = lastName;
          oldCopyData.lastName = lastName;
        });
      }

      /**
       * Updates the 'LastName' in the Person's tuple
       * @param {string} lastName The new lastName
       * @return {void}
       */
      function setLastName(lastName) {
        ezUserData.setLastName(lastName);
      }

      /**
       * Gets the GroupName of the user and stores it in
       * '$scope.formData.groupName'
       * @return {void}
       */
      function getGroupName() {
        ezUserData.getAlias().then(function(alias) {
          $scope.formData.groupName = alias;
          oldCopyData.groupName = alias;
        });
      }

      /**
       * Updates the 'GroupName' in the Organization tuple
       * @return {void}
       */
      function setGroupName(groupName) {
        ezUserData.setAlias(groupName);
      }

      /**
       * Updates the 'UserPassword' or 'GroupPassword' in the
       * 'Person' or 'Organization' tuple.
       * @param {string} password The new password
       */
      function setPassword(password) {
        ezUserData.setPassword(password);
      }

      /**
       * Shows a message for a few seconds indicating that the changes have
       * been submitted
       * @param {number} delay The duration in milliseconds that the message should
       * be shown.
       * @return {void}
       */
      function showSubmitted(delay) {
        $scope.submitted = true;
        $timeout(function() {
          $scope.submitted = false;
        }, delay);
      }
      // ====== Scoped Functions =======

      $scope.submitUserChanges = submitUserChanges;
      $scope.submitGroupChanges = submitGroupChanges;

      /**
       * Submits the changes to a user with 'userType' user to the database
       * @return {void}
       */
      function submitUserChanges() {
        var changes = false;
        if($scope.formData.firstName !== oldCopyData.firstName) {
          setFirstName($scope.formData.firstName);
          oldCopyData.firstName = $scope.formData.firstName;
          changes = true;
        }
        if($scope.formData.lastName !== oldCopyData.lastName) {
          setLastName($scope.formData.lastName);
          oldCopyData.lastName = $scope.formData.lastName;
          changes = true;
        }
        if($scope.formData.password !== oldCopyData.password) {
          setPassword($scope.formData.password);
          oldCopyData.password = $scope.formData.password;
          $scope.formData.password = '';
          changes = true;
        }

        if(changes) {
          showSubmitted(1000);
        }
      }

      /**
       * Submits the changes to a user with 'userType' group to the database
       * @return {void}
       */
      function submitGroupChanges() {
        var changes = false;
        if($scope.formData.groupName !== oldCopyData.groupName) {
          setGroupName($scope.formData.groupName);
          oldCopyData.groupName = $scope.formData.groupName;
          changes = true;
        }
        if($scope.formData.password !== oldCopyData.password) {
          setPassword($scope.formData.password);
          oldCopyData.password = $scope.formData.password;
          $scope.formData.password = '';
          changes = true;
        }

        if(changes) {
          showSubmitted(1000);
        }
      }
    }
})();
