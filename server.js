var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});

app.get('/api', controllers.api.index);

app.get('/api/playlists', controllers.playlists.index);
app.get('/api/playlists/:playlistId', controllers.playlists.show);
app.post('/api/playlists', controllers.playlists.create);
app.delete('/api/playlists/:playlistId', controllers.playlists.destroy);
app.put('/api/playlists/:playlistId', controllers.playlists.update);

app.get('/api/playlists/:playlistId/songs', controllers.playlistsSongs.index);
app.post('/api/playlists/:playlistId/songs', controllers.playlistsSongs.create);
app.delete('/api/playlists/:playlistId/songs/:songId', controllers.playlistsSongs.destroy);

app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
