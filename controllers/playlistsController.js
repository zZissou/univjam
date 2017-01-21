//DATABASE

var db = require('../models');

//GET /api/playlists
function index(req, res) {
  db.Playlist.find({},
  function(err, allPlaylists) {
    res.json(allPlaylists);
  });
}

function create(req, res) {
  console.log('body', req.body);

  db.Playlist.create(req.body, function(err, playlist) {
    if (err) {
    console.log('error', err); }
    console.log(playlist);
    res.json(playlist);
  });
}

function show(req, res) {
  db.Playlist.findbyId(req.params.playlistID, function(err, foundPlaylist) {
    if(err) {
      console.log('playlistsController.show error', err); }
      console.log('playlistsController.show responding with', foundPlaylist);
      res.json(foundPlaylist);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Playlist.findById(req.params.playlistId, function(err, foundPlaylist) {
    if(err) {
    console.log('playlistsController.update error', err); }
    foundPlaylist.playlistName = req.body.playlistName;
    foundPlaylist.save(function(err, savedPlaylist) {
      if(err) {
      console.log('saving altered playlist failed'); }
      res.json(savedPlaylist);
    });
  });
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
