'use strict';

juke.factory('PlayerFactory', function() {

    var playObj = {};

    var audio = document.createElement('audio');
    var currentSong = null;
    var songList;

    playObj.toggle = function(song) {
    	if (song === currentSong && !audio.paused) {
    		playObj.pause();
    	} else {
    		playObj.start(song);
    	}
    }

    playObj.start = function(song, list) {
    	currentSong = song;
        this.pause();
        songList = list;
        audio.src = song.audioUrl;
        audio.load();
        audio.play();
    }

	playObj.pause = function() {
		audio.pause();
	}

	playObj.resume = function() {
		audio.play();
	}

	playObj.isPlaying = function() {
		return !audio.paused;
	}
	playObj.getCurrentSong = function() {
		return currentSong;
	}

	playObj.next = function() {
		var currentIndex = songList.indexOf(currentSong);
		playObj.start((songList[currentIndex + 1]) || songList[0], songList);
	}

	playObj.previous = function() {
		var currentIndex = songList.indexOf(currentSong);
		playObj.start((songList[currentIndex - 1]) || songList[songList.length - 1], songList);
	}
	playObj.getProgress = function() {
		return audio.currentTime/audio.duration || 0;

	}

return playObj
});
