angular
  .module('univjam', ['ngRoute', 'ngYoutubeEmbed'])
  .config(config, ['$sceProvider', function($sceProvider){
  }]);

config.$inject = ['$routeProvider', '$locationProvider', '$sceProvider'];

function config($routeProvider, $locationProvider, $sceProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home',
      controllerAs: 'playlistsIndexCtrl',
      controller: 'PlaylistsIndexController'
    })
    .when('/playlists', {
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

    $sceProvider.enabled(false);
}
