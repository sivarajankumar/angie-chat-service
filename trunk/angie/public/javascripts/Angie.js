var angieConfig = function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'LoginUserController',
      templateUrl: 'view/login.html'
    })
    .when('/channels/:userId', {
      controller: 'ListChannelController',
      templateUrl: 'view/channels.html'
    })
    .when('/channels/:channelName/stream', {
      controller: 'StreamMessagesController',
      templateUrl: 'view/channel.html'
    })
    .when('/users/', {
      controller: 'UsersController',
      templateUrl: 'view/users.html'
    })
    .when('/user/:userId', {
      controller: 'UsersController',
      templateUrl: 'view/users.html'
    })
    .when('/addChannel/:userId', {
      controller: 'AddChannelController',
      templateUrl: 'view/addChannel.html'
    })
    .when('/deleteChannel/:userId/:channelId', {
      controller: 'DeleteChannelController',
      templateUrl: 'view/addChannel.html'
    })
    .otherwise({redirectTo: '/'});
  ;
};

var Angie = angular.module('Angie', ['ngResource']).config(angieConfig);
