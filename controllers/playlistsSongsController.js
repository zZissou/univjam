var db = require('../models');

function index(req, res) {
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log('responding with songs:', foundPlaylist.songs);
    res.json(foundPlaylist.songs);
  });
}

//looks good. I wonder about adaptability for other APIs
function create(req, res) {
  console.log("coming from create \n");
  console.log(req.body.items[0].snippet.thumbnails.default.url);
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    console.log(foundPlaylist);
    var newSong = new db.Song();
    newSong.name = req.body.items[0].snippet.title;
    newSong.id = req.body.items[0].id.videoId;
    newSong.thumbnail = req.body.items[0].snippet.thumbnails.default.url;
    newSong.save()
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
