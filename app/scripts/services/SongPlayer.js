(function() {
    function SongPlayer() {
        var SongPlayer = {};
        
        var currentSong = null;
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }  
            /**
            * @desc Buzz object audio file
            * @type {Object}
            */
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        /**
        * @function playSong
        * @desc Starts playing the currently selected song and sets the song.playing Boolean flag
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        /**
        * @method SongPlayer.play
        * @desc Checks to see if the song clicked was already the selected song.  If not, then sets the clicked song to the current song and plays it. If is the selected song and is paused then resumes playing.
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
            
        };
        /**
        * @method SongPlayer.pause
        * @desc Pauses the currently playing song and clears the song.playing Boolean flag
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();