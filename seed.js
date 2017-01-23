var db = require("./models");

var playlistList = [];

playlistList.push({
    name: "work playlist"
  });
playlistList.push({
    name: "home playlist"
  });
playlistList.push({
    name: "gym playlist"
  });

var sampleSongs = [];

sampleSongs.push({ name: "song 1"
});
sampleSongs.push({ name: "song 2"
});
sampleSongs.push({ name: "song 3"
});

playlistList .forEach(function(playlist) {
  playlist.songs = sampleSongs;
});

db.Playlist.remove({}, function(err, playlists){

  db.Playlist.create(playlistList, function(err, playlists){
    if (err) { return console.log('ERROR', err); }
    console.log("all playlists:", playlists);
    console.log("created", playlists.length, "playlists");
    process.exit();
  });

});
