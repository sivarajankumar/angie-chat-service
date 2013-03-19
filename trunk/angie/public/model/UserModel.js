Angie.service('UserModel',
  function($http) {
    this.getUsers = function() {
      var responseData = {};
      $http.get('/users').success(function(data) {
        responseData.users = data;
      });

      return responseData;
    };
    this.loginUser = function(userId, callback) {
      var theurl = '/users/';
      var responseData = {};

      $http({
          method: 'POST',
          url: theurl,
          data: { username: userId }
        //  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data, status) {
        callback(data);
      }).error(function(data, status) {
        callback(data);
      });
    };
    this.logoutUser = function(userId) {
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user ) {
        return;
      }
      for (var i=0; i<user.length; i++) {
        if (user[i].id === userId) {
          //user.splice(i, 1);
          window.localStorage.removeItem(userId);
          return;
        }
      }
    };
  }
);