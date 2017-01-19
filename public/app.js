var univJam = angular.module('univJam', ['ngRoute', 'ngAnimate']);

univJam.config(['$routeProvider', function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'SongController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'SongController'
    })
    .when('/signup', {
      templateUrl: 'signup.html'
    })
    .when('/signin', {
      templateUrl: 'views/signin.html'
    }).otherwise({
      directTo: '/home'
    });
}]);

univJam.controller('SongController', ['$scope', '$http', function ($scope, $http){

  $scope.removeSong = function(song){
    var removedSong = $scope.songs.indexOf(song);
    $scope.songs.splice(removedSong, 1);
  };

  $scope.addSong = function(){
    $scope.songs.push({
      name: $scope.newsong.name,
      artist: $scope.newsong.artist,
    });

    $scope.newsong.name = "";
    $scope.newsong.artist = "";
  };

$scope.removeAll = function(){
  $scope.songs = [];
};

$http.get('data/songs.json').then(function(response){
  $scope.songs = response.data;
});

}]);

univJam.controller('ContactController', ['$scope', '$location', function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success');
  };

}]);
