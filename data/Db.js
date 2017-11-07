const users = require('./users.json');
const locations = require('./leaderboard.json');
const leaderboard = require('./locations.json');

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