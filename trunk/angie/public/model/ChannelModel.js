Angie.service('ChannelModel',
  function($http) {
    this.sendChatMessage = function(channelName, memberId, newmessage, chatChannelController_refreshChat_callback) {
     var thechaturl = '/channels/' + channelName + '/messages';
      $http({
          method: 'POST',
          url: thechaturl,
          data: { username: memberId, message: newmessage },
         // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).
        success(function(data, status, headers, config) {
          chatChannelController_refreshChat_callback(); // call the page refresh link
      }).
        error(function(data, status, headers, config) {
          //$scope.data = data || "Request failed";
          $scope.getstatus = status;
      });

    }
    this.getChannelsForUser = function(userId) {
    };

    this.getChannelByName = function(channelName) {  
      var responseData = {};
      $http.get('/channels/' + channelName).success(function(data) {
        responseData.data = data;
      });
      return responseData;
    };
    
    this.getChannelByNameWithCallback = function(channelName,callbackfunction) { 
      var responseData = {};
      $http.get('/channels/' + channelName).success(function(data, status) {
        responseData.data = data;
        callbackfunction(responseData);  // Send the new data to the callback function
      }).
        error(function(data, status) {
          //$scope.data = data || "Request failed";
          $scope.getstatus = status;
      });
      return responseData;
    };    

    this.getChannels = function() {
      var responseData = {};
      $http.get('/channels').success(function(data) {
        responseData.data = data;
      });
      return responseData;
    };

    this.addChannel = function(userId, channelName) {
     var addchannelurl = '/channels';
      $http({
          method: 'POST',
          url: addchannelurl,
          data: {channelname: channelName, username: userId },
       //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    };
    this.deleteChannel = function(userId, channelName) {
      // TODO: DELETE /channel
      }


    this.addChannelMember = function(channelName, memberId) {
      var thejoinurl = '/channels/' + channelName + '/join';
      $http({
          method: 'POST',
          url: thejoinurl,
          data: {username: memberId},
       //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
    };

    this.removeChannelMember = function(channelName, memberId) {
      var theleaveurl = '/channels/' + channelName + '/leave';
      $http({
          method: 'POST',
          url: theleaveurl,
          data: {username: memberId},
       //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      
    };

    this.getMessages = function(channelName) {
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
  }
);
