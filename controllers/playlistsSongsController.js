var db = require('../models');

function index(req, res) {
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log('responding with songs:', foundPlaylist.songs);
    res.json(foundPlaylist.songs);
  });
}

function create(req, res) {
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log(req.body);
    var newSong = new db.Song(req.body);
    newSong.link = "https://www.youtube.com/embed?listType=search;list=" + req.params.song.name;
    foundPlaylist.songs.push(newSong);
    foundPlaylist.save(function(err, savedPlaylist) {
      console.log('newSong created: ', newSong);
      res.json(newSong);
    });
  });
}

function destroy(req, res) {
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log(foundPlaylist);
    var correctSong = foundPlaylist.songs.id(req.params.songId);
    if (correctSong) {
      correctSong.remove();
      foundPlaylist.save(function(err, saved) {
        console.log('REMOVED ', correctSong.name, 'FROM', saved.songs);
        res.json(correctSong);
      });
    } else {
      res.send(404);
    }
  });
}

module.exports = {
  index: index,
  create: create,
  destroy: destroy
};
