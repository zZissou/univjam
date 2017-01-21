var db = require('../models');

//app.get('/api/playlists/:playlistId/songs', controllers.playlistsSongs.index);
function index(req, res) {
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log('responding with songs:', foundPlaylist.songs);
    res.json(foundPlaylist.songs);
  });
}

//POST '/api/playlists/:playlistId/songs'
function create(req, res) {
  dbPlaylist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log(req.body);
    varnewSong = new db.Song(req.body);
    foundPlaylist.songs.push(newSong);
    foundPlaylist.save(function(err, savedPlaylist) {
      console.log('newSong created: ', newSong);
      res.json(newSong);
    });
  });
}

//app.delete('/api/playlists/:playlistId/songs/song:id', controllers.playlistsSongs.destroy);
function destroy(req, res) {
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log(foundPlaylist);
    var correctSong = foundPlaylist.songs.id(req.params.songId);
    if (correctSong) {
      correctSongremove();
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
