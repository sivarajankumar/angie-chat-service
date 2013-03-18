
Angie.controller('UsersController',
  function ($scope, $location, $routeParams, UserModel, ChannelModel) {
    var users = UserModel.getUsers();
    for (var i=0; i<users.length; i++) {
      users[i].channels = ChannelModel.getChannelsForUser(users[i].id);
    }
    $scope.users = users;
    $scope.selecteduserId = $routeParams.userId;
    $scope.onDelete = function(channelId) {
      var confirmDelete = confirm('Are you sure you want to delete this channel?');
      if (confirmDelete) {
        $location.path('/angiedeleteChannel/' + $routeParams.userId + '/' + channelId);
      }
    };
  }
);

Angie.controller('LoginUserController',
  function ($scope, $http, $location, $routeParams, UserModel) {

    var users = UserModel.getUsers();
    $scope.users = users;
    $scope.loggedInUserId = $routeParams.userId;

    var userId = $routeParams.userId;
    
    $scope.loginUser = function() {
      $scope.loggedInUserId = $scope.newuserid; // $routeParams.userId;
      UserModel.loginUser($scope.newuserid);
      $location.path('/angiemain/' + $scope.newuserid);
    }

  }
);
