

Angie.controller('ListChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;   // BUGBUG!!!   userId is undefined :(
    var channels = ChannelModel.getChannels();
    $scope.channels = channels; 
    $scope.loggedInUserId = $routeParams.userId;

    $scope.joinChannel = function(channelName) {
      ChannelModel.addChannelMember(channelName, userId);
      $location.path('/channels/' + userId);
    }


  }
);

Angie.controller('AddChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;
    $scope.cancel = function() {
      $location.path('/channels/' + userId);
    }
    $scope.createChannel = function() {
      ChannelModel.addChannel(userId, $scope.channel.content);
      $location.path('/channels/' + userId);
    }
  }
);

Angie.controller('DeleteChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;
    ChannelModel.deleteChannel(userId, $routeParams.channelId);
    $scope.selectedUserId = userId;
    $location.path('/channels/' + userId);
  }
);
