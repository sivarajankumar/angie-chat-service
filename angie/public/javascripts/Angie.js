var angieConfig = function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'LoginUserController',
      templateUrl: 'view/login.html'
    })
    .when('/angiemain/:userId', {
      controller: 'ListChannelController',
      templateUrl: 'view/main.html'
    })
    .when('/angiemain/:userId/:channelName', {  // smellt á "# members joined",  Til að sýna memberlist
      controller: 'ListChannelController',
      templateUrl: 'view/main.html'
    })
    .when('/angieusers/', {
      controller: 'UsersController',
      templateUrl: 'view/users.html'
    })
    .when('/angieuser/:userId', {
      controller: 'UsersController',
      templateUrl: 'view/users.html'
    })  
    .when('/angiechannels/:channelName/chat/:userId', {
      controller: 'ChatChannelController',
      templateUrl: 'view/channelchat.html'
    })    
    .when('/angieaddChannel/:userId', {
      controller: 'AddChannelController',
      templateUrl: 'view/addChannel.html'
    })
    .when('/angiedeleteChannel/:userId/:channelId', {
      controller: 'DeleteChannelController',
      templateUrl: 'view/addChannel.html'
    })
    .otherwise({redirectTo: '/'});
  ;
};

var Angie = angular.module('Angie', ['ngResource']).config(angieConfig);

// 'onKeyup' directive skynjar þegar ýtt er á Enter lykil í input svæði.  Sjá:   http://jsfiddle.net/bYUa3/2/
Angie.directive('onKeyup', function() {
    return function(scope, elm, attrs) {
        function applyKeyup() {
          scope.$apply(attrs.onKeyup);
        };           
        
        var allowedKeys = scope.$eval(attrs.keys);
        elm.bind('keyup', function(evt) {

          if ((evt.srcElement.value.length > 0)||(evt.srcElement.id == "chatmsg")){ // ekki tékka þegar strengurinn er tómur, þó skal hleypa chatmsg í gegn með tóman streng, vegna refresh.
            //if no key restriction specified, always fire
            if (!allowedKeys || allowedKeys.length == 0) {
                applyKeyup();
            } else {
                angular.forEach(allowedKeys, function(key) {
                    if (key == evt.which) {
                        applyKeyup();
                    }
                });
            }
          }
        });
    };
});
