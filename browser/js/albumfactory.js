juke.factory('AlbumFactory', function($http) {
    var albumObj = {};

    albumObj.fetchAll = function() {
        return $http.get('/api/albums/')
            .then(function(res) {
                return res.data;
            })
    }

    albumObj.fetchById = function(id) {
        return $http.get('/api/albums/' + id)
            .then(function(res) {
                return res.data;
            })
    }

    // albumObj.displayNumSongs = function(album) {

    //     return AlbumFactory.fetchById(album.id)
    //         .then(function(album) {
    //             album.numSongs = album.songs.length;
    //         });
            
    // }
    albumObj.indexSongs = function (album) {
        album.songs.forEach(function(song, index) {
            song.trackNumber = index;
        });
    }

    return albumObj;

});
