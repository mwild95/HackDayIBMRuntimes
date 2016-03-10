angular.module('SocialInsights', [
    'ngRoute',
    'ui.router'
])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('login', {
    	url:'/login',
    	templateUrl:"partials/login"
    });

    $stateProvider.state('dashboard', {
        url:'/dashboard',
        templateUrl:"partials/dashboard.html"
    });
   
}])

.controller('appCtrl', ['$rootScope', function($rootScope){

}])

;