'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // state
  $scope.getCurrentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);
  $scope.toggle = PlayerFactory.toggle.bind(PlayerFactory);
  $scope.isPlaying = PlayerFactory.isPlaying.bind(PlayerFactory);


  $scope.next =PlayerFactory.next.bind(PlayerFactory)
  $scope.previous =PlayerFactory.previous.bind(PlayerFactory)


});
