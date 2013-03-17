Angie.service('ChannelModel',
  function($http) {
    this.sendChatMessage = function(channelName, memberId, newmessage, chatChannelController_refreshChat_callback) {

    //TODO:  POST /channels/:channelname/messages
     var thechaturl = '/channels/' + channelName + '/messages';
      $http({
          method: 'POST',
          url: thechaturl,
          data: { username: memberId, message: newmessage },
         // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
        success(function(data, status, headers, config) {
        // this callback will be called asynchronously
          // when the response is available
          chatChannelController_refreshChat_callback(); // call the page refresh link
        });

           


    }
    this.getChannelsForUser = function(userId) {
      /*
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user) {
        return [];
      }
      return user.channels;
      */
    };

    this.getChannelByName = function(channelName) {
      // TODO: GET /channels/:channelname   
      var responseData = {};
      $http.get('/channels/' + channelName).success(function(data) {
        responseData.data = data;
      });
      return responseData;
    };
    
    this.getChannelByNameWithCallback = function(channelName,callbackfunction) {
      // TODO: GET /channels/:channelname   
      var responseData = {};
      $http.get('/channels/' + channelName).success(function(data) {
        responseData.data = data;
        callbackfunction(responseData);  // Send the new data to the callback function
      });
      return responseData;
    };    

    this.getChannels = function() {
      // TODO: GET /channel
      var responseData = {};
      $http.get('/channels').success(function(data) {
        responseData.data = data;
      });
      return responseData;

      /*return [
        {
          name: 'bikes',
          ownerId: 'boddi',
          members: []
        },
        {
          name: 'cars',
          ownerId: 'kjartan',
          members: []
       }
      ]*/
      /*
      if  (window.localStorage.length > 0) {
        var userId = window.localStorage.key(0);
        var user = JSON.parse(window.localStorage.getItem(userId));
        if (!user) {
            return [];
        }
      }else{
        return [];
      }
      return user.channels;
      */
    };
    this.addChannel = function(userId, channelName) {
      // TODO: POST /channel

      //var xsrf = $.param({name: channelName, owner: userId });
     
     //var addchannelurl = '/channels/' + channelName;
     var addchannelurl = '/channels';

      $http({
          method: 'POST',
          url: addchannelurl,
          data: {channelname: channelName, username: userId },
       //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })

      /*
      var now = new Date();
      var channel = {
        name: channelName,
        ownerId: userId,
        members: []
      };
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user) {
        user = {
          id: userId,
          channels: []
        };
      }
      user.channels.push(channel);
      window.localStorage.setItem(userId, JSON.stringify(user));
      */
    };
    this.deleteChannel = function(userId, channelName) {
      // TODO: DELETE /channel
      /*
      var user = JSON.parse(window.localStorage.getItem(userId));
      if (!user || !user.channels) {
        return;
      }
      for (var i=0; i<user.channels.length; i++) {
        if (user.channels[i].name === channelName) {
          user.channels.splice(i, 1);
          window.localStorage.setItem(userId, JSON.stringify(user));
          return;
        }
        */
      }


    this.addChannelMember = function(channelName, memberId) {
      // Button was pressed
      // TODO: POST /channel/:channelname/join     body: username=memberId
      //var xsrf = $.param({username: memberId});

      var thejoinurl = '/channels/' + channelName + '/join';
      $http({
          method: 'POST',
          url: thejoinurl,
          data: {username: memberId},
       //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    };

    this.removeChannelMember = function(channelName, memberId) {
      // TODO: DELETE ...
     
      var theleaveurl = '/channels/' + channelName + '/leave';
      $http({
          method: 'POST',
          url: theleaveurl,
          data: {username: memberId},
       //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      
    };

    this.getMessages = function(channelName) {
      // TODO: GET /channels/:channelName/messages
      var responseData = {};
      $http.get('/channels/' + channelName + '/messages').
        success(function(data, status) {
          responseData.data = data;
        }).
        error(function(data, status) {
          //$scope.data = data || "Request failed";
          $scope.getstatus = status;
        }
      );
      return responseData;

    };
    
    this.getMessagesWithCallback = function(channelName,callbackfunction) {
      // TODO: GET /channels/:channelName/messages
      var responseData = {};
      $http.get('/channels/' + channelName + '/messages').
        success(function(data, status) {
          responseData.data = data;
          callbackfunction(responseData); // Send the new data to the callback function
        }).
        error(function(data, status) {
          //$scope.data = data || "Request failed";
          $scope.getstatus = status;  //  Þetta er bara fyrir smá test...
        }
      );
      return responseData;

    };
  /* $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });*/

  }
);
