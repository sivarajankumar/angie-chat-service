Angie.service('UserModel',
  function($http) {
    this.getUsers = function() {
      // TODO:  GET /user
      var responseData = {};

      $http.get('/users').success(function(data) {
        responseData.users = data;
      });

      return responseData;
    };
    this.loginUser = function(userId) {
      // TODO: POST /users
      var theurl = '/users/';
/*
      $http({
            method: 'POST', 
            url: theurl,
            data: { username: userId },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           }).
        success(function(data, status, headers, config) {
        // this callback will be called asynchronously
          // when the response is available
        }).
          error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
           // or server returns response with an error status.
      });*/

      $http({
          method: 'POST',
          url: theurl,
          data: { username: userId }
        //  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
/*
      var now = new Date();
      var channel = {
        id: now
      };
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user) {
        user = {
          id: userId
          //channels: []
        }
        //user.push(user);
        window.localStorage.setItem(userId, JSON.stringify(user));
      }else{
        return; // RETURN FALSE!  No login, already logged in.
      }
      */
    };
    this.logoutUser = function(userId) {
      // TODO: DELETE /user/:id
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