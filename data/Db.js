
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
const userAchievementsKey = 'userAchievements';

const dbKeys = [dbInitKey, userKey, achievementKey, userAchievementsKey];

async function populateDatabase() {
  await AsyncStorage.multiSet([
    [userKey, JSON.stringify(users)],
    [achievementKey, JSON.stringify(achievements)],
    [userAchievementsKey, JSON.stringify(userAchievements)],
    [dbInitKey, '1']
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
    return await AsyncStorage.getItem('users');
  },
  getLocations: function () {
    return locations;
  },
  getPoints: function () {
    return points;
  },
  getAchievements: async function () {
    return JSON.parse(await AsyncStorage.getItem('achievements'));
  },
  getUserAchievements: async function () {
    return JSON.parse(await AsyncStorage.getItem(userAchievementsKey));
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
    await AsyncStorage.setItem(userAchievementsKey, JSON.stringify([])).then(() => {
      console.log("User Achievements reset");
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

  addLocation: function(data) {
    let newLocation = {
      //Increment the id from the latest one in the storage
      "id": 'INCREMENT ME',
      "location": data.locationName,
      "lat": data.region.latitude,
      "long": data.region.longitude,
      "description": data.locationData,
      "img": data.cameraData.path,
      "type": 1,
      "difficulty": 1
    }
    //Add this new json object to the async storage

    console.log("This is adding the new thing \n" + JSON.stringify(newLocation));
  },

  // ------------- extra functions --------------------
  addPointsToUser: async function (userId, difficulty) {
    let point = this.getPoint(difficulty);

    await this.getUser(userId).then(async (user) => {
      if (user !== null && point !== null) {

        console.log(user);

        user.score += point.points;

        this.setUser(userId, user);
      }
    });
  }
};
