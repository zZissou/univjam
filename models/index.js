var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/univjam');


var Playlist = require('./playlist');

module.exports.Playlist = Playlist;
module.exports.Song = require('./song');
