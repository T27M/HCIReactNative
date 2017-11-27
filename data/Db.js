const Active_user       = require('./Active_user.json');
const users             = require('./users.json');
const locations         = require('./locations.json');
const leaderboard       = require('./leaderboard.json');
const points            = require('./points.json');
const achievements      = require('./achievements.json');
const userAchievements  = require('./user_achievements.json');

export default Db = {

  // ------------- get all --------------------

  // Users
  getActiveUser: function() {
    return Active_user;
  },
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
  getAchievements: function() {
    return achievements;
  },
  getUserAchievements: function() {
    return userAchievements;
  },

  // ------------- get specific record --------------------
  getLdrBrd: function(id) {
    let results = leaderboard.filter((record) => {
      return record.userID === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getActvUser: function(id) {
    let results = Active_user.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getUser: function(id) {
    let results = users.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getLocation: function(id) {
    let results = locations.filter((record) => {
      return record.id === id
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
  getAchievement: function(id) {
    let results = achievements.filter((record) => {
      return record.id === id
    });

    return (results.length === 1) ? results[0] : null;
  },
  getUserAchievement: function(userid, achievementId) {
    let results = userAchievements.filter((record) => {
      return record.user_id === userid && record.achievement_id === achievementId
    });

    return (results.length === 1) ? results[0] : null;
  },

  // ------------- set specific records --------------------
  
  setActiveUser(id){
	let newUser = this.getUser(id);
	let oldUser =this.getActiveUser;
	
		for(var key in oldUser) {
			oldUser.id=newUser.id;
			oldUser.username=newUser.username;
			oldUser.score=newUser.score;
		}
		
	
  }

  setUser: function(id, user) {
    let record = this.getUser(id);

    for (let key in user) {
      if (user.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = user[key];
      }
    }
	
	setLdrBrd: function(id, LDB) {
    let record = this.getLdrBrd(id);

    for (let key in LDB) {
      if (LDB.hasOwnProperty(key) && record.hasOwnProperty(key)) {
        record[key] = LDB[key];
      }
    }

    // TODO figure out how to do this without having to recommit/gitignore the JSON files.
    console.log("Editing Leaderboard " + id + " to: " + JSON.stringify(record));
	console.log("Leaderboard is now: "+ LDB[key])//check statement
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

  // ------------- extra functions --------------------

  // POST /user/addPoints ?
  // my guess is that this would just be a API call and the logic below would be re-implemented on the server
  addPointsToUser: function(userId, difficulty) {
    let user = this.getUser(userId);
    let point = this.getPoint(difficulty);
	let LdrBrd=this.getLdrBrd(userId);
	
    if (user !== null && point !== null) {
      user.score += point.points;
	  console.log("Leaderboard score is: "LdrBrd.score);//check statements
	  LdrBrd.score+=point.points;
	  console.log("Leaderboard score should be: "LdrBrd.score);//check statements
      this.setUser(userId, user);
	  this.setLdrBrd(userID,LdrBrd);
      return true;
    }

    return false;
  }
};