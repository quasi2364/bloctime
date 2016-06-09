(function() {
	function Tasks($firebaseArray) {
		//var Tasks = {};

		var ref = new Firebase("https://danbloctime.firebaseio.com/");
		var tasks  = $firebaseArray(ref);

		//var tasks = [1,2,3];

		return {
			all: tasks
		};
	}

	angular
		.module('bloctime')
		.factory('Tasks', ['$firebaseArray', Tasks]);
})();