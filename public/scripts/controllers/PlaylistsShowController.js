angular
  .module('univjam')
  .controller('PlaylistsShowController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  var vm = this;
  vm.newSong = {};

  $http({
    method: 'GET',
    url: '/api/playlists/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.playlist = json.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createSong = function (song) {
    search();
    // $http({
    //     method: 'POST',
    //     url: '/api/playlists/'+$routeParams.id + '/songs',
    //     data: song
    // }).then(function successCallback(response) {
    //     vm.playlist.songs.push(response.data);
    // }, function errorCallback(response) {
    //     console.log('There was an error posting the song', response);
    // });
  }

function search(){

  q = $('#query').val();

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyAIYjJ-kpwYLGD-uQL7_WaGxZ_GwyT5Gv0'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data.items[0].id.videoId,
          data.items[0].snippet.title,
          data.items[0].snippet.thumbnails.default.url);

        $http({
            method: 'POST',
            url: '/api/playlists/'+ $routeParams.id + '/songs',
            data: data
        }).then(function successCallback(response) {
            vm.playlist.songs.push(response.data);
        }, function errorCallback(response) {
            console.log('There was an error posting the song', response);
        });
      }
    );

  }

  function getOutput(item) {
    var videoId = data.items[0].id.videoId;
    var title = data.items[0].snippet.title;
    var thumbnail = data.items[0].snippet.thumbnails.default.url
  }

  vm.deleteSong = function (song) {
    $http({
      method: 'DELETE',
      url: '/api/playlists/'+$routeParams.id + '/songs/'+song._id
    }).then(function successCallback(json) {
        var index = vm.playlist.songs.indexOf(song);
        vm.playlist.songs.splice(index, 1)
      console.log("hello darkness my old friend");
    }, function errorCallback(response) {
      console.log('There was an error deleting the song', response);
    });
  }
}]);
