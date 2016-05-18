'use strict';

juke.factory('PlayerFactory', function() {

    var playObj = {};

    var audio = document.createElement('audio');
    var currentSong = null;

    playObj.start = function(song) {
    	currentSong=song;
        this.pause();
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
	
}

playObj.prev = function() {

}
playObj.getProgress = function() {

}







return playObj
});
