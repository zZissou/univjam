//index Controller
var univJam = angular.module('univJam', ['ngRoute', 'ngAnimate']);

//main controller
univJam.controller('UnivJamController', ['$scope', function($scope){

  $scope.playlists = [
    {
      name: "Work Playlist",
      length: "1.5 hours"
    },
    {
      name: "Home Playlist",
      length: "8 hours"
    },
    {
      name: "FOTM Playlist",
      length: "18 hours"
    }
  ];

}]);










// univJam.config(['$routeProvider', function($routeProvider){
//
//   $routeProvider
//     .when('/home', {
//       templateUrl: 'views/home.ejs'
//     })
//     .when('/signup', {
//       templateUrl: 'signup.html'
//     })
//     .when('/signin', {
//       templateUrl: 'views/signin.html'
//     }).otherwise({
//       directTo: '/home'
//     });
// }]);
//
// univJam.controller('PlaylistController', ['$scope', '$http', function($scope, $http){
//   $scope.addPlaylist = function({
//     $scope.playlists.push({
//       name: $scope.newplaylist.name,
//       songs:[]
//     });
//
//     $scope.newplaylist.name = "";
//   )};
//
//     $scope.removePlaylist = function(playlist){
//       var removedPlaylist = $scope.playlists.indexOf(playlist);
//       $scope.playlists.splice(removedSong, 1);
//     };
// )}];
//
// univJam.controller('SongController', ['$scope', '$http', function ($scope, $http){
//
//   $scope.removeSong = function(song){
//     var removedSong = $scope.songs.indexOf(song);
//     $scope.songs.splice(removedSong, 1);
//   };
//
//   $scope.addSong = function(){
//     $scope.songs.push({
//       name: $scope.newsong.name,
//       artist: $scope.newsong.artist,
//     });
//
//     $scope.newsong.name = "";
//     $scope.newsong.artist = "";
//   };
//
//   $scope.removeAll = function(){
//     $scope.songs = [];
//   };
//
//   $http.get('data/songs.json').then(function(response){
//     $scope.songs = response.data;
//   });
// }]);
