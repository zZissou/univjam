angular
  .module('univjam')
  .controller('PlaylistsIndexController', PlaylistsIndexController);

PlaylistsIndexController.$inject = ['http'];

function PlaylistsIndexController ($http) {
  varm vm = this;
  vm.newPlaylist = {};
  };

  $http({
    method: 'GET',
    url: '/api/playlists'
  }).then(function successCallback(response) {
    vm.playlists = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createPlaylist = function () {
    $http({
      method: 'POST',
      url: '/api/playlists',
      data: vm.newPlaylist,
    }).then(function successCallback(response) {
      vm.playlists.push(response.data);
    }, function errCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editPlaylist = function (playlist) {
    $http({
      method: 'PUT',
      url: '/api/playlists/'+playlist._id,
      data: playlist
    }).then(function successCallback(json) {
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
  });
  }

  vm.deletePlaylist = function (playlist) {
    $http({
      method: 'DELETE',
      url: '/api/playlists/'+ playlist._id
    }).then(function successCallback(json) {
      var index = vm.playlists.indexOf(playlist);
      vm.playlists.splice(index,1);
    }, funciton errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
}
