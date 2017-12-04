const users       = require('./users.json');
const locations   = require('./locations.json');
const leaderboard = require('./leaderboard.json');
const points      = require('./points.json');

export default Db = {

  // ------------- get all --------------------

  // Users
  getUsers: function() {
    return users;
  },
  getLocations: function() {
    return locations;
  },
  getLeaderboard: function() {
    return leaderboard;
  },
  getPoints: function() {
    return points;
  },

  // ------------- get specific record --------------------

  getUser: function(id) {
    let results = users.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getLocation: function(id) {
    let results = locations.filter((record) => {
      return record.title === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getLeaderboardEntry: function(rank) {
    let results = leaderboard.sort((a, b) => {
      return b.score - a.score;
    });

    return (results.length > rank - 1) ? results[rank] : null;
  },
  getMarker: function(title) {
    let results = markers.filter((record) => {
      return record.title === title
    });

    return (results.length === 1) ? results[0] : null;
  },
  getPoint: function(difficulty) {
    let results = points.filter((record) => {
      return record.difficulty === difficulty
    });

    return (results.length === 1) ? results[0] : null;
  },

  // ------------- set specific records --------------------

  setUser: function(id, user) {
    let record = this.getUser(id);

    for (let key in user) {
      if (user.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = user[key];
      }
    }

    // TODO figure out how to do this without having to recommit/gitignore the JSON files.
    console.log("Editing User " + id + " to: " + JSON.stringify(record));
  },
  setLocation: function(id, location) {
    let record = this.getLocation(id);

    for (let key in location) {
      if (location.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = location[key];
      }
    }

    // TODO figure out how to do this without having to recommit/gitignore the JSON files.
    console.log("Editing Location " + id + " to: " + JSON.stringify(record));
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

  // POST /user/addPoints ?
  // my guess is that this would just be a API call and the logic below would be re-implemented on the server
  addPointsToUser: function(userId, difficulty) {
    let user = this.getUser(userId);
    let point = this.getPoint(difficulty);

    if (user !== null && point !== null) {
      user.score += point.points;

      this.setUser(userId, user);

      return true;
    }

    return false;
  }
};
