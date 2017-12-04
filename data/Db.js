import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';

const users = require('./users.json');
const locations = require('./locations.json');
const points = require('./points.json');
const achievements = require('./achievements.json');

const dbInitKey = "init";
const userKey = 'users';
const achievementKey = 'achievements';

const dbKeys = [dbInitKey, userKey, achievementKey];

async function populateDatabase() {
  await AsyncStorage.multiSet([
    [userKey, JSON.stringify(users)],
    [achievementKey, JSON.stringify(achievements)],
    [dbInitKey, '1']
  ]).then(() => {
    console.log("Populate DB");
  });
}

export default Db = {
  initDb: async function () {
    await AsyncStorage.getItem(dbInitKey).then((value) => {
      if (value == null) {
        populateDatabase();
      }
    }).done();
  },
  resetDb: async function () {
    return await AsyncStorage.multiRemove(dbKeys).then(() => {
      console.log("Database reset");
    });
  },

  // ------------- get all --------------------

  // Users
  getUsers: async function () {
    return await AsyncStorage.getItem('users');
  },
  getLocations: function () {
    return locations;
  },
  getPoints: function () {
    return points;
  },
  getAchievements: async function () {
    return await AsyncStorage.getItem('achievements');
  },

  // ------------- get specific record --------------------

  getUser: async function (id) {
    return await AsyncStorage.getItem('users').then((value) => {

      let _users = JSON.parse(value);

      let results = users.filter((record) => {
        return record.id === id
      });

      return (results.length === 1) ? results[0] : null;
    });
  },
  getLocation: function (id) {
    let results = locations.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getMarker: function (title) {
    let results = markers.filter((record) => {
      return record.title === title
    });

    return (results.length === 1) ? results[0] : null;
  },
  getPoint: function (difficulty) {
    let results = points.filter((record) => {
      return record.difficulty === difficulty
    });

    return (results.length === 1) ? results[0] : null;
  },
  getAchievement: function (id) {
    let results = achievements.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  // ------------- set specific records --------------------

  resetAchievements: async function () {
    // reset achievements
    await this.getAchievements().then(async (value) => {
      let _achievements = JSON.parse(value);

      achievements.forEach((el) => {
        el.achieved = false
      });

      await AsyncStorage.setItem(achievementKey, JSON.stringify(_achievements)).then(() => {
        console.log("Achievements reset");
      });
    });
  },

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
  setUser: async function (id, user) {
    await this.getUsers().then(async (value) => {
      let _users = JSON.parse(value);

      for (let key in users[id - 1]) {
        if (users[id - 1].hasOwnProperty(key) && user.hasOwnProperty(key)) {
          console.log("Key " + key + " updated to " + user[key]);
          users[id - 1][key] = user[key];
        }
      }

      await AsyncStorage.setItem(userKey, JSON.stringify(_users)).then(() => {
        console.log("Users updated");
      });
    });
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
