
Angie.directive('gbChannelList', function() {
  return {
    restrict: 'A',
    templateUrl: 'view/directives/channelList.html',
    scope: {
      show: '=show',
      channels: '=channels',
      orderValue: '@orderBy',
      onDelete: '=deleteChannelHandler'
    }
  };
});
