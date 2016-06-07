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

                // Initial State
                scope.isCounting = false;
                scope.buttonText = "Start Session";
                scope.sessionType = "session";
                SESSION_TIME = 5;
                BREAK_TIME = 3;
                LONG_BREAK_TIME = 10;
                scope.timer = SESSION_TIME;
                scope.sessionsCompleted = 0;
                var promise = null; 

                //Handles logic for when a user clicks to start or reset a session
                scope.runSession = function(){
                    
                    // Starts a session countdown and handles logic
                    // for when session is done and timer hits zero
                    var startSession = function() {
                        scope.buttonText = "Reset";
                        scope.isCounting = true;
                        scope.mySound = new buzz.sound("/assets/sounds/ding.mp3", {
                            preload: true
                        });

                        //Set session type and session attributes  
                        if (scope.sessionType == "session") {
                            scope.timer = SESSION_TIME;
                        } else if (scope.sessionType == "break") {
                            scope.timer = BREAK_TIME;
                        } else {
                            scope.timer = LONG_BREAK_TIME;
                        }

                        promise = $interval(function(){
                            scope.timer = scope.timer - 1;
                            if(scope.timer < 1){
                                scope.mySound.play();
                                $interval.cancel(promise);
                                scope.isCounting = false;
                                if (scope.sessionType == "session") {
                                    scope.sessionsCompleted++;
                                    if (scope.sessionsCompleted % 2 == 0) {
                                        scope.sessionType = "longBreak";
                                        scope.buttonText = "Start Long Break";
                                    } else {
                                        scope.sessionType = "break";
                                        scope.buttonText = "Start Break"       
                                    }
                                } else {
                                    scope.sessionType = "session"; 
                                    scope.buttonText = "Start Session"
                                }                              
                            }
                        }, 1000, 0);                        
                    };

                    var resetSession = function() {
                        scope.isCounting = false;
                        $interval.cancel(promise);

                        if (scope.sessionType == "session") {
                            scope.timer = SESSION_TIME;
                            scope.buttonText = "Start Session";   
                        } else if (scope.sessionType == "break") {
                            scope.timer = BREAK_TIME;
                            scope.buttonText = "Start Break";  
                        } else {
                            scope.timer = LONG_BREAK_TIME;
                            scope.buttonText = "Start Long Break";
                        }                       
                    };

                    //Call functions to start or reset a session when button is clicked
                    if(scope.isCounting){
                        resetSession();    
                    } else {
                        startSession();
                    }
                };             
            }
        };
    }
    
    angular
        .module('bloctime')
        .directive('timer', ['$interval', timer]);
})();