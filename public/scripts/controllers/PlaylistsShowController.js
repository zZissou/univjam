angular
  .module('univjam')
  .controller('PlaylistsShowController', PlaylistsShowController);

PlaylistsShowController.$inject = ['$http', '$routeParams'];


function PlaylistsShowController($http, $routeParams) {
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
    $http({
        method: 'POST',
        url: '/api/playlists/'+$routeParams.id + '/songs',
        data: vm.newSong
    }).then(function successCallback(response) {
        vm.playlist.songs.push(response.data);
    }, function errorCallback(response) {
        console.log('There was an error posting the song', response);
    });
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
}
