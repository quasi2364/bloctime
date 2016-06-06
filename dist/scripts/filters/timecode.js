(function(){
	function timecode () {
		return function(seconds) {
			var seconds = Number.parseFloat(seconds);

			var minutes = Math.floor(seconds/60);

			var seconds = seconds % 60;

			if (minutes < 10) {
				minutes = "0" + minutes;
			} 
			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			return minutes + ":" + seconds;
		};	
	}

	angular
		.module('bloctime')	
		.filter('timecode', timecode);
})();