angular
  .module('univjam', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/playlist',
      controllerAs: 'playlistsIndexCtrl',
      controller: 'PlaylistsIndexController'
    })
    .when('/playlist', {
      templateUrl: '/templates/playlist',
      controllerAs: 'playlistsIndexCtrl',
      controller: 'PlaylistsIndexController'
    })
    .when('/playlists/:id', {
          templateUrl: '/templates/playlists-show',
          controllerAs: 'playlistsShowCtrl',
          controller: 'PlaylistsShowController'
        })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}
