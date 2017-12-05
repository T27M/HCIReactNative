
import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';

const users = require('./users.json');
const locations = require('./locations.json');
const points = require('./points.json');
const achievements = require('./achievements.json');
const userAchievements = require('./user_achievements.json');

const dbInitKey = "init";
const userKey = 'users';
const achievementKey = 'achievements';
const locationKey = 'locations';
const logKey = 'log';

const dbKeys = [dbInitKey, userKey, achievementKey, locationKey, logKey];

async function populateDatabase() {
  await AsyncStorage.multiSet([
    [userKey, JSON.stringify(users)],
    [achievementKey, JSON.stringify(achievements)],
    [locationKey, JSON.stringify(locations)],
    [logKey, JSON.stringify({})],
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
    return await AsyncStorage.getItem(userKey);
  },
  getLocations: async function () {
    return await AsyncStorage.getItem(locationKey);
  },
  getPoints: function () {
    return points;
  },
  getAchievements: async function () {
    return await AsyncStorage.getItem(achievementKey);
  },
  getUserAchievements: async function () {
    return userAchievements
  },
  // ------------- get specific record --------------------

  getUser: async function (id) {
    return await AsyncStorage.getItem('users').then((value) => {

      let _users = JSON.parse(value);

      let results = _users.filter((record) => {
        return record.id === id
      });

      return (results.length === 1) ? results[0] : null;
    });
  },
  getLocation: async function (id) {
    return await this.getLocations().then((value) => {
      let _locatons = JSON.parse(value);

      let results = _locatons.filter((record) => {
        return record.id === id
      });

      return (results.length === 1) ? results[0] : null;
    });
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
          _users[id - 1][key] = user[key];
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

  addUserAchievement(userAchievement) {
    console.log("Adding user achievement " + JSON.stringify(userAchievement));
  },

  addLocation: async function (data) {
    await this.getLocations().then(async (value) => {
      let _locatons = JSON.parse(value);
      let new_id = (_locatons[_locatons.length - 1].id) + 1;

      _locatons.push({
        "id": new_id,
        "location": data.locationName,
        "lat": data.region.latitude,
        "long": data.region.longitude,
        "description": data.locationData,
        "img": data.cameraData.path,
        "type": 1,
        "difficulty": 1
      });

      await AsyncStorage.setItem(locationKey, JSON.stringify(_locatons)).then(() => {
        console.log("Locations updated");
      });
    }).catch((e) => {
      console.log(e);
    });
  },

  // ------------- extra functions --------------------
  addPointsToUser: async function (userId, difficulty) {
    let point = this.getPoint(difficulty);

    await this.getUser(userId).then(async (user) => {
      if (user !== null && point !== null) {

        console.log(user);

        user.score += point.points;
        
        await this.setUser(userId, user);
      }
    });
  },
  logEvent: async function(eventType, data) {
    await AsyncStorage.getItem(logKey).then((value) =>{
      let _log = JSON.parse(value);

      let _console_out = {
        "event-type": eventType,
        "created": data.created,
        "other-field": "something" 
      };
      console.log(_console_out);

      // This doesn't work with variable?
      _log.push({
        "event-type": eventType,
        "created": data.created,
        "other-field": "something" 
      });

      await AsyncStorage.setItem(logKey, _log).then(() => {
        console.log("Log updated");
      });
    });
  },
  getLog: async function() {
    return await AsyncStorage.getItem(logKey);
  }
};