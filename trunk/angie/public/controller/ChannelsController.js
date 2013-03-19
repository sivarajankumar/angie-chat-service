Angie.controller('StreamMessagesController',
  function ($scope, $location, $routeParams, ChannelModel) {
    $scope.channelName = $routeParams.channelName;
    $scope.loggedInUserId = $routeParams.userId;
    $scope.channelName = $routeParams.channelName;
    $scope.msg = {};

    var handleCallback = function (msg) {
// <<<<<<< .mine
//         $scope.$apply(function () {
//         $scope.msg = JSON.parse(msg.data);

//         // TODO: Tékka hvort loggedInUserId sé í msg.members listanum.   Ef ekki þá skal kicka 
//       });
// =======
        var message = JSON.parse(msg.data);
        if( $scope.channelName === message.channelname) {
          $scope.$apply(function () {
            $scope.msg = message;
          });
        }
//>>>>>>> .r19
    }

//<<<<<<< .mine
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
            $location.path('/angiemain/' + $scope.loggedInUserId);
            //$scope.kickMember($scope.loggedInUserId);  // has already been kicked
            return false;
          }
        }
      }
      return true;  
    }

    $scope.kickMember = function(memberid) {
      ChannelModel.removeChannelMember($scope.channelName, memberid);
    }

//    var source = new EventSource('/channels/' + channelName + '/messages/stream');
//=======
    var source = new EventSource('/channels/' + $scope.channelName + '/messages/stream');
//>>>>>>> .r19
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
Angie.controller('ChatChannelController',
  function ($scope, $location, $routeParams, ChannelModel) {
    var userId = $routeParams.userId;   // BUGBUG!!! 
/*
    var channels = ChannelModel.getChannels();  // Not used
    var messages = ChannelModel.getMessages($routeParams.channelName);
    $scope.currentChannel = {};
    $scope.channelOwner = {};
    var handleCallback_getChannelByName = function (responsedata) {
        $scope.$apply(function () {
        $scope.currentChannel = responsedata; //JSON.parse(msg.data)
        $scope.channelOwner = $scope.currentChannel.data.owner;
      });
    }
    var ok = ChannelModel.getChannelByNameWithCallback($routeParams.channelName,handleCallback_getChannelByName);  // til að sýna members logged in, TODO: það vantar betra function til þess, getChannelMembers(channelName), sem skilar objectum en ekki strengjum.
    $scope.channels = channels; 
    $scope.messages = messages;
    //$scope.channelOwner = currentChannel.data.owner;
    //$scope.currentChannel   = currentChannel;
    */
    $scope.loggedInUserId = $routeParams.userId;
    $scope.channelName = $routeParams.channelName;
  /*
    $scope.return_getChannelByName_callback = function(responsedata) {  // það er kallað í þetta frá SendChatMessageDelivered_callback, þegar getMessage HTTP GET kallið hefur skilað success.
      $scope.currentChannel = responsedata; //.data;  // Hlaða nýjustu messages inn og birta þau
      // $location.path('/angiechannels/' + $scope.channelName + '/chat/' + $scope.loggedInUserId);  // Ekki refresha síðuna fyrir þetta. Það er gert í getMessages...
    }  
    $scope.return_getMessagesDelivered_callback = function(responsedata) {  // það er kallað í þetta frá SendChatMessageDelivered_callback, þegar getMessage HTTP GET kallið hefur skilað success.
      $scope.messages = responsedata; //.data;  // Hlaða nýjustu messages inn og birta þau
      $scope.chatmsg="";  // Hreinsa innsláttarsvæðið fyrir næstu skilaboð
      $location.path('/angiechannels/' + $scope.channelName + '/chat/' + $scope.loggedInUserId);
    }  
*/
    $scope.return_SendChatMessageDelivered_callback = function() {  // það er kallað í þetta frá doChat, (sendChatMessage) fallinu, þegar HTTP POST fallið hefur skilað success.
      //$scope.dummymessages_notused = ChannelModel.getMessagesWithCallback($routeParams.channelName, $scope.return_getMessagesDelivered_callback);
       $scope.chatmsg="";  // Hreinsa innsláttarsvæðið fyrir næstu skilaboð
       $location.path('/angiechannels/' + $scope.channelName + '/chat/' + $scope.loggedInUserId);
    }  

    $scope.doChat = function() {
     // $scope.dummymembers_notused  = ChannelModel.getChannelByNameWithCallback($routeParams.channelName,$scope.return_getChannelByName_callback);  // refresha members
      if ($scope.chatmsg.length == 0){ // Þegar ýtt er á enter hnappinn á ekki að senda message heldur bara að refresha skjáinn.
        // Hér er verið að refresha gögnin á skjánum:   members og messages.
       // $scope.dummymembers_notused  = ChannelModel.getChannelByNameWithCallback($routeParams.channelName,$scope.return_getChannelByName_callback); 
       // $scope.dummymessages_notused = ChannelModel.getMessagesWithCallback($routeParams.channelName, $scope.return_getMessagesDelivered_callback);
      }else{
        ChannelModel.sendChatMessage($scope.channelName, $scope.loggedInUserId, $scope.chatmsg, $scope.return_SendChatMessageDelivered_callback);
      }
      //$location.path('/angiechannels/' + $scope.channelName + '/chat/' + $scope.loggedInUserId);
    }

    $scope.kickMember = function(memberid) {
      ChannelModel.removeChannelMember($scope.channelName, memberid);
      // $location.path('/angiemain/' + $scope.loggedInUserId);
    }

    $scope.leaveChannel = function() {
      ChannelModel.removeChannelMember($scope.channelName, $scope.loggedInUserId);
      $location.path('/angiemain/' + $scope.loggedInUserId);
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
