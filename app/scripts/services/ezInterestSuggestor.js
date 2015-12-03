/**
 * Created on November 30, 2015 by George Ruan.
 *
 * Service that suggests events to the user of userType 'user'
 */

(function() {
  'use strict';
  angular.module('EZSched')
    .factory('ezInterestSuggestor', ezInterestSuggestor);

  ezInterestSuggestor.$inject = ['$q', 'ezSQL'];

  function ezInterestSuggestor($q, ezSQL) {
    // ====== Global Variables ======
    var userInterestArr = [],   // [UserID, Interest1, Interest2, ...]
        otherInterestArrArr = [],  // [[OtherUserID, Interest1, ...], [...], ...]
        otherInterestArrArrCopy = [];

    var ezInterestSuggestorObj = {
      getSuggestedInterest: function(userID) {
        return getUsersInterests(userID)
                .then(function(arrOfUserInterests) {  // Update userInterestArr
                  userInterestArr = arrOfUserInterests;

                  return getAllOtherUsersInterests(userID)
                    .then(function(arrArrOfOtherInterests) {  // Update otherInterestArr
                      otherInterestArrArr = arrArrOfOtherInterests;
                      otherInterestArrArrCopy = arrArrOfOtherInterests;

                      return getMostRelatedInterest();
                  }); // End .then(function(arrOfOtherInterests))
                }); // End .then(function(arrOfUserInterests))
      }
    };

    // ====== Helper Functions ======
    /**
     * Gathers all the interests of a user into a single array.
     * @param  {[JSON Obj]} userIDAndInterestsArr Array of JSON Objects of
     * the format {UserID, Interest}
     * @return {Promise}   A Promise of an  array of strings. The first
     * entry is the UserID and the subsequent entries are the UserID's Interests.
     * [UserID, Interest1, Interest2, ...]
     */
    function gatherInterests(userIDAndInterestsArr) {
        var retVal = [];
        // Push on UserID
        if(userIDAndInterestsArr.length > 0) {
          retVal.push(userIDAndInterestsArr[0].UserID);
        }

        var i;
        for(i = 0; i < userIDAndInterestsArr.length; ++i) {
          retVal.push(userIDAndInterestsArr[i].Interest);
        }

        return $q(function(resolve) {
          resolve(retVal);
        });
    }

    /**
     * Returns the user's interest in an array.
     * @param  {string} userID The user's userID
     * @return {Promise}  A Promise of an  array of strings. The first
     * entry is the UserID and the subsequent entries are the UserID's Interests.
     * [UserID, Interest1, Interest2, ...]
     */
    function getUsersInterests(userID) {
      var attrArr, tableArr, condition;
      attrArr = ['UserID', 'Interest'];
      tableArr = ['Looks'];
      condition = 'Looks.UserID=\'' + userID + '\'';
      return ezSQL.getQuery(attrArr, tableArr, condition)
              .then(gatherInterests);
    }

    /**
     * Returns an array containing all other user's interests
     * @param  {Array} otherUserIDInterestArr An array of JSON Objects of the format
     * {UserID, Interest}
     * @return {Promise}  A promise of an array of arays of the format
     * [UserID, Interest1, Interest2, ...]
     */
    function gatherOtherUserInterests(otherUserIDInterestArr) {
      var retVal = [];

      // Continue removing user's interests until none are left
      while(otherUserIDInterestArr.length > 0) {
        var otherID = otherUserIDInterestArr[0].UserID,
            otherUserInterestArr = [otherID],
            i;
        // Find all interests for a given user
        for( i = 0; i < otherUserIDInterestArr.length; ++i ) {
          if(otherID === otherUserIDInterestArr[i].UserID) {
            otherUserInterestArr.push(otherUserIDInterestArr[i].Interest);
            otherUserIDInterestArr.splice(i, 1); // Remove element
            i--;  // Stay in the current spot for next iteration after ++i
          }
        }
        // Push the otherUserInterestArr of the format [UserID, Interest1, ...]
        retVal.push(otherUserInterestArr);
      }

      return $q(function(resolve) {
        resolve(retVal);
      });
    }

    /**
     * Returns all other userIDs
     * @param  {string} userID The user's userID
     * @return {Promise}   A Promise of an array of arrays of objects of the format
     * {UserID, Interest}.
     */
    function getAllOtherUsersInterests(userID) {
      var attrArr, tableArr, condition;
      attrArr = ['UserID', 'Interest'];
      tableArr = ['Looks'];
      condition = 'Looks.UserID<>\'' + userID + '\'';
      return ezSQL.getQuery(attrArr, tableArr, condition)
              .then(gatherOtherUserInterests);
    }

    /**
     * Gets the interests with the maximum weight
     * @param  {Object} relatedInterests     Object containing key/value pairs
     * interest: weight
     * @return {Array}   Array of interests with the maximum weight.
     */
    function getMaxInterests(relatedInterests) {
      var maxInterests = [],
          max = 0,
          interest;

      // Find max value.
      for (interest in relatedInterests) {
        if (relatedInterests.hasOwnProperty(interest)) {
          if(relatedInterests[interest] > max) {
            max = relatedInterests[interest];
          }
        }
      }
      // Find all interests with the max value
      for (interest in relatedInterests) {
        if (relatedInterests.hasOwnProperty(interest)) {
          if(relatedInterests[interest] === max) {
            maxInterests.push(interest);
          }
        }
      }

      return maxInterests;
    }

    /**
     * Chooses a random element from the arr. If arr is empty, choose a random interest
     * from otherInterestArrArrCopy.
     * @param  {Array} arr Array of elements
     * @return {Array[0]}   Random element of 'arr'.
     */
    function arrRandomElem(arr) {
      console.log(arr);
      var retVal, randomIndex;
      if(arr.length > 0) {
        randomIndex = Math.floor(Math.random() * arr.length);
        retVal = arr[randomIndex];
      }
      else {  // arr = [];
        randomIndex = Math.floor(Math.random() * otherInterestArrArrCopy.length);
        var interestArr = otherInterestArrArrCopy[randomIndex];
        randomIndex = Math.floor(Math.random() * (interestArr.length - 1)) + 1;
        retVal = interestArr[randomIndex];
      }
      return retVal;
    }

    /**
     * Gets the interest that relate most closely with the user.
     * This is determined through the common interests of other people.
     * @return {Promise}  A promise of a string that is the most related
     * interest
     */
    function getMostRelatedInterest() {
      var relatedInterests = {};

      // Note: userInterestArr is [UserID, Interest1, Interest2, ...]
      //       otherInterestArrArr is [[OtherUserID, Interest1, ...], [...], ...]

      var i, j, k, z,
          countSimilar, weight,
          interest;

      // Loop through all otherUserInterestArrays
      for( i = 0; i < otherInterestArrArr.length; ++i ) {
        countSimilar = 0;
        // Loop through all interests of a given other user
        for( j = 1; j < otherInterestArrArr[i].length; ++j ) {
          // Loop through all the interests of the current user
          for( k = 1; k < userInterestArr.length; ++k ) {
            // Interests match and needs to be removed
            if(otherInterestArrArr[i][j] === userInterestArr[k]) {
              countSimilar++;
              otherInterestArrArr[i].splice(j, 1); // Remove matched element from otherUserInterestArr
              j--;  // To stay at the same index after removing element
              break;  // Move on to the next interest for otherInterestArr
            }
          }
        }
        if(countSimilar > 0) {
          // Calculate weight of each related interest
          weight = 1 * Math.pow(countSimilar, 1.5);
          for( z = 1; z < otherInterestArrArr[i].length; ++z ) {
            interest = otherInterestArrArr[i][z];
            if(interest in relatedInterests) {
              relatedInterests[interest] += weight;
            }
            else {
              relatedInterests[interest] = weight;
            }
          }
        }
      }

      var interestsWithMaxWeight = getMaxInterests(relatedInterests);
      var interestToSuggest = arrRandomElem(interestsWithMaxWeight);

      return $q(function(resolve) {
        resolve(interestToSuggest);
      });
    }



    return ezInterestSuggestorObj;
  }
})();
