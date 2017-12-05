
import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';

const users                      = require('./users.json');
const locations                  = require('./locations.json');
const points                     = require('./points.json');
const achievements               = require('./achievements.json');
const userAchievements           = require('./user_achievements.json');

const dbInitKey                  = "init";
const userKey                    = 'users';
const locationKey                = 'locations';
const userAchievementsKey        = 'user_achievements';
const userAchievementEventLogKey = "user_achievement_event_log";

const dbKeys = [dbInitKey, userKey, locationKey, userAchievementsKey, userAchievementEventLogKey];

async function populateDatabase() {
  await AsyncStorage.multiSet([
    [userKey,                     JSON.stringify(users)],
    [userAchievementsKey,         JSON.stringify(userAchievements)],
    [userAchievementEventLogKey,  JSON.stringify([])],
    [locationKey,                 JSON.stringify(locations)],
    [dbInitKey,                   '1']
  ]).then(async () => {
    console.log("Populate DB");
  });
}

export default Db = {
  initDb: async function () {
    await AsyncStorage.getItem(dbInitKey).then(async (value) => {
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
    return JSON.parse(await AsyncStorage.getItem(userKey));
  },
  getLocations: async function () {
    return JSON.parse(await AsyncStorage.getItem(locationKey));
  },
  getPoints: function () {
    return points;
  },
  getAchievements: function () {
    return achievements;
  },
  getUserAchievements: async function () {
    return JSON.parse(await AsyncStorage.getItem(userAchievementsKey));
  },
  getUserAchievementEventLog: async function () {
    return JSON.parse(await AsyncStorage.getItem(userAchievementEventLogKey));
  },

  // ------------- get specific record --------------------

  getUser: async function (id) {
    return await this.getUsers().then((_users) => {
      let results = _users.filter((record) => {
        return record.id === id
      });

      return (results.length === 1) ? results[0] : null;
    });
  },
  getLocation: async function (id) {
    return await this.getLocations().then((_locatons) => {
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
    await AsyncStorage.setItem(userAchievementsKey, JSON.stringify([])).then(() => {
      console.log("User Achievements reset");
    });
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

  async addUserAchievement(userAchievement) {
    userAchievements = await this.getUserAchievements();
    let alreadyExists = false;
    for (let userAchievementTemp in userAchievements) {
      if (userAchievement.user_id === userAchievementTemp.user_id && userAchievement.achievement_id === userAchievementTemp.achievement_id) {
        alreadyExists = true;
      }
    }

    if (!alreadyExists) {
      console.log("Adding user achievement " + JSON.stringify(userAchievement));

      userAchievements.push(userAchievement);
      await AsyncStorage.setItem(userAchievementsKey, JSON.stringify(userAchievements)).then(() => {
        console.log("Added user achievement");
      });
    }
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
        console.log("Adding " + point.points + " points to user " + userId);

        user.score += point.points;

        await this.setUser(userId, user);
      }
    });
  },
  logUserAchievementEvent: async function(eventType, userId, data) {
    let log = await this.getUserAchievementEventLog();
    log     = JSON.parse(log);

    data.event_type   = eventType;
    data.user_id      = userId;
    data.created      = Date.now();

    log.push(data);

    await AsyncStorage.setItem(userAchievementEventLogKey, log);
  },

  getCurrentUserId: function () {
    // TODO get user id
    return 6;
  },
};
