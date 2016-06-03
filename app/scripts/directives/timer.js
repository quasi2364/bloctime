(function () {
    function timer($interval){
        return {
            templateUrl: '/templates/directives/timer.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes){
                scope.timer = "--:--";
                scope.isCounting = false;
                scope.activity = "Start a Work Session";
                var promise = null;
                scope.startSession = function(time){
                    if(scope.isCounting){
                        return function(){
                            scope.isCounting = false;
                            scope.activity = "Paused";
                            scope.timer = '--:--';
                            $interval.cancel(promise);
                        }();
                    }
                    scope.activity = "Counting";
                    scope.isCounting = true;
                    scope.timer = time;
                    promise = $interval(function(){
                        scope.timer = scope.timer - 1;
                        if(scope.timer < 1){
                            $interval.cancel(promise);
                            scope.isCounting = false;
                            scope.timer = "Done";
                        }
                        console.log(scope.timer);
                    }, 1000, 0);
                };
                
            }
        };
    }
    
    angular
        .module('bloctime')
        .directive('timer', ['$interval', timer]);
})();