(function () {
    function timer($interval, $document){
        return {
            templateUrl: '/templates/directives/timer.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes){

                scope.isCounting = false;
                scope.activity = "Start Session";
                scope.timerType = "session";
                SESSION_TIME = 5;
                BREAK_TIME = 3;
                LONG_BREAK_TIME = 30*60;
                scope.timer = SESSION_TIME;
                var promise = null;
                
                scope.startSession = function(){
                    if(scope.isCounting){
                        return function(){
                            scope.isCounting = false;
                            scope.activity = "Start Session";
                            scope.timer = SESSION_TIME;
                            $interval.cancel(promise);
                        }();
                    }
                    
                    scope.isCounting = true;
                    console.log(scope.timerType);

                    if (scope.timerType == "break") {
                        scope.timer = BREAK_TIME;
                        scope.activity = "Reset";
                    } else {
                        scope.timer = SESSION_TIME;
                        scope.activity = "Reset";
                    }

                    promise = $interval(function(){
                        scope.timer = scope.timer - 1;
                        if(scope.timer < 1){
                            $interval.cancel(promise);
                            scope.isCounting = false;
                            if (scope.timerType == "session") {
                                scope.timerType = "break";
                                scope.activity = "Start Break";
                            } else {
                                scope.timerType = "session"; 
                                scope.activity = "Start Session"
                            }                              
                        }
                    }, 1000, 0);
                };
                
            }
        };
    }
    
    angular
        .module('bloctime')
        .directive('timer', ['$interval', timer]);
})();