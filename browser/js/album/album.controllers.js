'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, AlbumFactory, StatsFactory, PlayerFactory) {

    AlbumFactory.fetchAll()
        .then(function(res) {
            $scope.albums = res;
            console.log($scope.albums);
            $scope.albums.forEach(function(album) {
                album.imageUrl = '/api/albums/' + album.id + '/image';
            });
        });




    AlbumFactory.fetchById(5)
    .then(function (album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';
      $scope.albumSongs = $album.songs;
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.albumIndex = i;
      });
      $scope.album = album;
      return StatsFactory.totalTime($scope.album);
    })
    .then(function (duration) {
      $scope.album.duration = Math.ceil(duration / 60) + ' minutes';
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound

   
    // incoming events (from Player, toggle, or skip)
    // $scope.$on('pause', pause);
    // $scope.$on('play', play);
    // $scope.$on('next', next);
    // $scope.$on('prev', prev);

    // $scope.toggle = PlayerFactory.toggle;

    // function pause() {
    //     $scope.playing = false;
    // }

    // function play(event, song) {
    //     $scope.playing = true;
    //     $scope.currentSong = song;
    // };
    // $scope.start = function(song){
    //     PlayerFactory.start(song);
    // }

    $scope.toggle = PlayerFactory.toggle.bind(PlayerFactory);
    $scope.isPlaying = PlayerFactory.isPlaying.bind(PlayerFactory);
    $scope.getCurrentSong = PlayerFactory.getCurrentSong.bind(PlayerFactory);



    // a "true" modulo that wraps negative to the top of the range
    function mod(num, m) {
        return ((num % m) + m) % m;
    };

    // jump `interval` spots in album (negative to go back, default +1)
    function skip(interval) {
        if (!$scope.currentSong) return;
        var index = $scope.currentSong.albumIndex;
        index = mod((index + (interval || 1)), $scope.album.songs.length);
        $scope.currentSong = $scope.album.songs[index];
        if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
    };

    function next() { skip(1); };

    function prev() { skip(-1); };

});



juke.controller('AlbumsCtrl', function($scope, $rootScope, $log, AlbumFactory, StatsFactory, PlayerFactory) {


    AlbumFactory.fetchAll()
        .then(function(res) {
            $scope.albums = res;
          
            $scope.albums.forEach(function(album) {
                album.imageUrl = '/api/albums/' + album.id + '/image';
                
                    AlbumFactory.fetchById(album.id)
                    .then(function(thisAlbum) {
                      album.numSongs = thisAlbum.songs.length
                    })
            });



        })
});
