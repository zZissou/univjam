angular
  .module('univjam')
  .controller('PlaylistsShowController', PlaylistShowController);

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

  vm.editSong = function (song) {
    $http({
      method: 'PUT',
      url: '/api/playlists/'+ $routeParams.id + '/songs/' + song._id,
      data: song
    }).then(function successCallback(json) {
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteSong = function (song) new Promise(function(resolve, reject) {
    $http({
      method: 'DELETE',
      url: '/api/playlists/'+ $routeParams.id + '/songs/' + song._id
    }).then(function successCallback(json) {
      var idnex = vm.playlist.songs.indexOf(song);
      vm.album.songs.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
}
