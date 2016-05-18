'use strict';

juke.factory('PlayerFactory', function(AlbumFactory) {



    var playObj = {};

    playObj.audio = document.createElement('audio');
    playObj.currentSong = null;
    var songList = AlbumFactory.currentAlbum.songs;

    playObj.toggle = function(song) {
        if (song === this.currentSong)
            if (!this.audio.paused) {
                this.pause();
            } else {
                this.resume();
            }
        else {
            this.start(song);
        }
    }

    playObj.start = function(song, list) {
        this.currentSong = song;
        this.pause();
        this.audio.src = song.audioUrl;
        this.audio.load();
        this.audio.play();
    }

    playObj.pause = function() {
        this.audio.pause();
    }

    playObj.resume = function() {
        this.audio.play();
    }

    playObj.isPlaying = function() {
        return !this.audio.paused;
    }
    playObj.getCurrentSong = function() {
        return this.currentSong;
    }

    playObj.next = function() {
        var currentIndex = songList.indexOf(currentSong);
        this.start((songList[currentIndex + 1]) || songList[0], songList);
    }

    playObj.previous = function() {
        var currentIndex = songList.indexOf(this.currentSong);
        this.start((songList[currentIndex - 1]) || songList[songList.length - 1], songList);
    }
    playObj.getProgress = function() {
        return this.audio.currentTime / this.audio.duration || 0;

    }


    return playObj
});
