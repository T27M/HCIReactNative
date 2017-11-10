const users = require('./users.json');
const locations = require('./locations.json');
const leaderboard = require('./leaderboard.json');
const points = require('./points.json');

export default Db =  {
    getUsers: function() {
        return users;
    },
    getLocations: function() {
        return locations;
    },
    getLeaderboard: function() {
        return leaderboard;
    },
};
