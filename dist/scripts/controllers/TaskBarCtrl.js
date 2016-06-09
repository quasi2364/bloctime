(function() {
	function TaskBarCtrl (Tasks, $scope) {
		$scope.tasks = Tasks.all;
		console.log($scope.tasks);

		$scope.addTask = function() {
			$scope.tasks.$add($scope.newTask);
			//console.log($scope.tasks);
		};
	}

	angular
		.module('bloctime')
		.controller('TaskBarCtrl', ['Tasks', '$scope', TaskBarCtrl]);
})(); 