Angie.controller('StreamMessagesController',
  function ($scope, $location, $routeParams, ChannelModel) {
    $scope.channelName = $routeParams.channelName;
    $scope.loggedInUserId = $routeParams.userId;
    $scope.msg = {};
    var source = new EventSource('/channels/' + $scope.channelName + '/messages/stream');

    var handleCallback = function (msg) {
        var message = JSON.parse(msg.data);
        if( $scope.channelName === message.channelname) {
          $scope.$apply(function () {
            $scope.msg = message;
          });
        }
    }

    $scope.isActiveMemberinChannel = function() {
      if ($scope.msg.members !== undefined){
        if ($scope.msg.members.length > 0) {
          var kickmember = true;
          for(i=0;i<$scope.msg.members.length;i=i+1){
            if ($scope.msg.members[i] === $scope.loggedInUserId){
             kickmember = false;
            }
          }
          if (kickmember){
            source.removeEventListener('message', handleCallback, false);
            // source.trigger('message', { mykey: 'myvalue' }); 
            $location.path('/angiemain/' + $scope.loggedInUserId);
            //$scope.kickMember($scope.loggedInUserId);  // has already been kicked or left the channel
            return false;
          }
        }
      }
      return true;  
    }

    $scope.kickMember = function(memberid) {
      ChannelModel.removeChannelMember($scope.channelName, memberid);
      // source.removeEventListener('message', handleCallback, false);  // Þetta keyrist sjálfkrafa í isActiveMemberinChannel
    }
    $scope.return_SendChatMessageDelivered_callback = function() {  // það er kallað í þetta frá doChat, (sendChatMessage) fallinu, þegar HTTP POST fallið hefur skilað success.
       $scope.chatmsg="";  // Hreinsa innsláttarsvæðið fyrir næstu skilaboð
       $location.path('/angiechannels/' + $scope.channelName + '/chat/' + $scope.loggedInUserId);
    }  

    $scope.doChat = function() {
      if ($scope.chatmsg.length == 0){ // Þegar ýtt er á enter hnappinn á ekki að senda message heldur bara að refresha skjáinn.
      }else{
        ChannelModel.sendChatMessage($scope.channelName, $scope.loggedInUserId, $scope.chatmsg, $scope.return_SendChatMessageDelivered_callback);
      }
    }

    $scope.kickMember = function(memberid) {
      ChannelModel.removeChannelMember($scope.channelName, memberid);
    }

    $scope.leaveChannel = function() {
      ChannelModel.removeChannelMember($scope.channelName, $scope.loggedInUserId);
    }

    source.addEventListener('message', handleCallback, false);
  }
);

Angie.controller('ListChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;   // BUGBUG!!!   userId is undefined :(
    var channels = ChannelModel.getChannels();
    $scope.channels = channels; 
    $scope.selectedChannelName = $routeParams.channelName;
    $scope.loggedInUserId = $routeParams.userId;

    $scope.joinChannel = function(channelName) {
      ChannelModel.addChannelMember(channelName, userId);
      $location.path('/angiechannels/' + channelName + '/chat/' + $scope.loggedInUserId);
    }
  }
);

Angie.controller('AddChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;
    $scope.cancel = function() {
      $location.path('/angiemain/' + userId);
    }
    $scope.createChannel = function() {
      var testuserid = $scope.loggedInUserId;
      ChannelModel.addChannel(userId, $scope.newchannelname);
      $location.path('/angiemain/' + userId);
    }
  }
);

Angie.controller('DeleteChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;
    ChannelModel.deleteChannel(userId, $routeParams.channelId);
    $scope.selectedUserId = userId;
    $location.path('/angiemain/' + userId);
  }
);
