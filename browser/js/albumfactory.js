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
                albumObj.currentAlbum = res.data;
                return res.data;
            })
    }

 
    
   


    albumObj.indexSongs = function (album) {
        album.songs.forEach(function(song, index) {
            song.trackNumber = index;
        });
    }



    return albumObj;

});
