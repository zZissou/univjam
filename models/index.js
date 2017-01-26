
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/univjam');

var Playlist = require('./playlist');

module.exports.Playlist = Playlist;
module.exports.Song = require('./song');
