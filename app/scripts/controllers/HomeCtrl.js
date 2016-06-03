(function() {
    function HomeCtrl() {
    	console.log('hello');
    }
    
    angular
        .module('bloctime')
        .controller('HomeCtrl', HomeCtrl);
})();