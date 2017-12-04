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
const locationKey = 'locations';

const dbKeys = [dbInitKey, userKey, achievementKey, locationKey];

async function populateDatabase() {
  await AsyncStorage.multiSet([
    [userKey, JSON.stringify(users)],
    [achievementKey, JSON.stringify(achievements)],
    [locationKey, JSON.stringify(locations)],
    [dbInitKey, '1']
  ]).then(() => {
    console.log("Populate DB");
  });
}

export default Db = {
  initDb: function () {
    AsyncStorage.getItem(dbInitKey).then((value) => {

      if (value == null) {
        populateDatabase();
        AsyncStorage.setItem(dbInitKey, "true");
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
  // getLeaderboard: function() {
  //   return leaderboard;
  // },
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

  getUser: function (id) {
    let results = users.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
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
  // getLeaderboardEntry: function(rank) {
  //   let results = leaderboard.sort((a, b) => {
  //     return b.score - a.score;
  //   });
  //
  //   return (results.length > rank - 1) ? results[rank] : null;
  // },
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

  // POST /user/addPoints ?
  // my guess is that this would just be a API call and the logic below would be re-implemented on the server
  addPointsToUser: function (userId, difficulty) {
    let user = this.getUser(userId);
    let point = this.getPoint(difficulty);

    if (user !== null && point !== null) {
      user.score += point.points;

      await this.setUser(userId, user);
    }
  }
};