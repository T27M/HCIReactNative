<<<<<<< Updated upstream
export default Db = {
  get achievements() {
    return require('./achievements.json');
  },
  get users() {
    return require('./users.json');
  },
  get points() {
    return require('./points.json');
  },
  get locations() {
    return require('./locations.json');
=======
import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';

const users = require('./users.json');
const locations = require('./locations.json');
// const leaderboard       = require('./leaderboard.json');
const points = require('./points.json');
const achievements = require('./achievements.json');

const dbInitKey = "init";

function populateDatabase() {
  console.log("Populate DB");
}

export default Db = {
  initDb: function () {
    AsyncStorage.getItem(dbInitKey).then((value) => {

      if(value == null)
      {
        populateDatabase();
        AsyncStorage.setItem(dbInitKey, "true");
      }
    }).done();
>>>>>>> Stashed changes
  },

  // ------------- get all --------------------

  // Users
<<<<<<< Updated upstream
  getUsers: function() {
    return this.users;
  },
  getLocations: function() {
    return this.locations;
=======
  getUsers: function () {
    return users;
  },
  getLocations: function () {
    return locations;
>>>>>>> Stashed changes
  },
  // getLeaderboard: function() {
  //   return leaderboard;
  // },
<<<<<<< Updated upstream
  getPoints: function() {
    return this.points;
  },
  getAchievements: function() {
    return this.achievements;
=======
  getPoints: function () {
    return points;
  },
  getAchievements: function () {
    return achievements;
>>>>>>> Stashed changes
  },

  // ------------- get specific record --------------------

<<<<<<< Updated upstream
  getUser: function(id) {
    let results = this.users.filter((record) => {
=======
  getUser: function (id) {
    let results = users.filter((record) => {
>>>>>>> Stashed changes
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
<<<<<<< Updated upstream
  getLocation: function(id) {
    let results = this.locations.filter((record) => {
=======
  getLocation: function (id) {
    let results = locations.filter((record) => {
>>>>>>> Stashed changes
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  // getLeaderboardEntry: function(rank) {
  //   let results = leaderboard.sort((a, b) => {
  //     return b.score - a.score;
  //   });
  //
  //   return (results.length > rank - 1) ? results[rank] : null;
  // },
<<<<<<< Updated upstream
  getMarker: function(title) {
    let results = this.markers.filter((record) => {
=======
  getMarker: function (title) {
    let results = markers.filter((record) => {
>>>>>>> Stashed changes
      return record.title === title
    });

    return (results.length === 1) ? results[0] : null;
  },
<<<<<<< Updated upstream
  getPoint: function(difficulty) {
    let results = this.points.filter((record) => {
=======
  getPoint: function (difficulty) {
    let results = points.filter((record) => {
>>>>>>> Stashed changes
      return record.difficulty === difficulty
    });

    return (results.length === 1) ? results[0] : null;
  },
<<<<<<< Updated upstream
  getAchievement: function(id) {
    let results = this.achievements.filter((record) => {
=======
  getAchievement: function (id) {
    let results = achievements.filter((record) => {
>>>>>>> Stashed changes
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  // ------------- set specific records --------------------

  setAchievement: function (id, achievement) {
    let record = this.getAchievement(id);

    for (let key in achievement) {
      if (achievement.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = achievement[key];
      }
    }

    // TODO figure out how to do this without having to recommit/gitignore the JSON files.
    console.log("Editing achievement " + id + " to: " + JSON.stringify(record));
  },
  setUser: function (id, user) {
    let record = this.getUser(id);

    for (let key in user) {
      if (user.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = user[key];
      }
    }

    // TODO figure out how to do this without having to recommit/gitignore the JSON files.
    console.log("Editing User " + id + " to: " + JSON.stringify(record));
  },
  setLocation: function (id, location) {
    let record = this.getLocation(id);

    for (let key in location) {
      if (location.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = location[key];
      }
    }

    // TODO figure out how to do this without having to recommit/gitignore the JSON files.
    console.log("Editing Location " + id + " to: " + JSON.stringify(record));
  },

  // ------------- extra functions --------------------

  // POST /user/addPoints ?
  // my guess is that this would just be a API call and the logic below would be re-implemented on the server
  addPointsToUser: function (userId, difficulty) {
    let user = this.getUser(userId);
    let point = this.getPoint(difficulty);

    if (user !== null && point !== null) {
      user.score += point.points;

      this.setUser(userId, user); 0

      return true;
    }

    return false;
  }
};
