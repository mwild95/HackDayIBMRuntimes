angular.module('SocialInsights', [
    'ngRoute',
    'ui.router'
])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('login', {
    	url:'/login',
    	templateUrl:"partials/login.html"
    });

    $stateProvider.state('dashboard', {
        url:'/dashboard',
        templateUrl:"partials/dashboard.html"
    });

    $stateProvider.state('feed', {
        url:'/feed',
        templateUrl:"partials/feed.html"
    });
   
}])

.run(['$rootScope', '$state', 'UserAuth', function($rootScope, $state, UserAuth){
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		if(toState.name != "login"){
			//its going to a page that you need to be logged in to get to
			var test = UserAuth.getUser();
			if(UserAuth.getUser() === null){
				//not authenticated, send to login
				event.preventDefault();
				$state.go('login');
			}
		}
	});
}])

.factory('UserAuth', function(){
	var user = null;//set to null for login
	var availableUsers = [
		{id : 000001, username : "mwild", firstName : "Michael", lastName : "Wild", password : "test"},
		{id : 000002, username : "teza", firstName : "Teslim", lastName : "Ajeigbe", password : "test"}
	];

	var _login = function(userIn){
		for(var i=0 ; i<availableUsers.length ; i++){
			if(availableUsers[i].username == userIn.username){
				if(availableUsers[i].password == userIn.password){
					//log in successful, set user and return user object
					user = availableUsers[i];
					return user;
				}
			}
		}
		return null;
	};

	return {
		getUser: function() {
			return user;
		},

		login: function(userIn) {
			return _login(userIn);
		},
		
		isAuthenticated: function(){
            return user;
        },
        destroy: function(){
            user = null;
        }
    };
})

.controller('appCtrl', ['$rootScope', function($rootScope){
	$rootScope.showTitleBar = false;
}])

.controller('loginCtrl', ['$rootScope', '$scope', 'UserAuth', '$state', function($rootScope, $scope, UserAuth, $state){
	$scope.user = {};
	$scope.error = "";
	$scope.showError = false;
	$scope.login = function(){
		$scope.showError = false;
		if($scope.user.username != '' && $scope.user.password != ''){
			//call the login stuff
			var result = UserAuth.login($scope.user);
			if(result == null){
				//no login was found
				$scope.error = "Login failed. Please check your username and password";
				$scope.password = '';
				$scope.showError = true;
			}else{
				//login was ok
				//redirect to dashboard
				$state.go('dashboard');
			}
		}
	};
}])

.controller('dashboardCtrl', ['$rootScope', function($rootScope){
	$rootScope.showTitleBar = true;
}])

;