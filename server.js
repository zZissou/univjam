var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var session = require('express-session');

// middleware
app.use(express.static('public'));
app.use(express.static('views'));
app.use(session({
 saveUninitialized: true,
 resave: true,
 secret: 'SuperSecretCookie',
 cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/simple-login');

var controllers = require('./controllers');


app.get('/', function (req, res) {
 res.render('index.html');
});
// signup route (renders signup view)
app.get('/signup', function (req, res) {
 res.render('index.html');
});

// Sign up route - creates a new user with a secure password
app.post('/users', function (req, res) {
 console.log(req.body)
 // use the email and password to authenticate here
 User.createSecure(req.body.name, req.body.email, req.body.password, function (err, newUser) {
   req.session.userId = newUser._id;
   res.redirect('/playlist');
 });
});

// login route with placeholder response
app.get('/login', function (req, res) {
 res.render('index.html');
});

// authenticate and log in user
app.post('/sessions', function (req, res) {
 // use the email and password to authenticate here
 User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
   if (err){
     console.log('authentication error: ', err);
     res.redirect('/login');
   } else {
     console.log('setting session user id ', loggedInUser._id);
     req.session.userId = loggedInUser._id;
     console.log("SUCCESSFUL LOGIN");
     res.redirect('/playlist.ejs');
   }
 });
});

 // route to the user profile page
 app.get('/playlist', function (req, res) {
 // now find the user currently logged in
 User.findOne({_id: req.session.userId}, function (err, currentUser) {
   res.render('index.html', {user: currentUser})
   });
 });

 // logout route
 app.get('/logout', function (req, res) {
 // remove the session user id
 req.session.userId = null;
 // redirect to login (for now)
 res.redirect('/');
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

// listen on port 3000
app.listen(3000, function () {
 console.log('server started on locahost:3000');
});
