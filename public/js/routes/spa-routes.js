app.config(['$routeProvider', '$locationProvider', '$stateProvider' ,'$urlRouterProvider', 'LOGIN', 'REGISTER', 'COMMUNITY', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider,LOGIN, REGISTER, COMMUNITY, PROFILE){
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    var indexState = {
        name: 'index',
        url: '/',
        templateUrl: "home.html",
        controller: "homeCtrl"
    }

    var loginState = {
        name: 'login',
        url: LOGIN,
        templateUrl: "login.html",
        controller: "loginCtrl"
    }

    var registerState = {
        name: 'register',
        url: REGISTER,
        templateUrl: "register.html",
        controller: "registerCtrl"
    }

    var communityState = {
        name: 'community',
        url: COMMUNITY,
        templateUrl: "community.html",
        controller: "communityCtrl"
    }

    var profileState = {
        name: 'profile',
        url: PROFILE,
        templateUrl: "profile.html",
        controller: "profileCtrl"
    }

    $stateProvider.state(indexState);  
    $stateProvider.state(loginState);  
    $stateProvider.state(registerState);  
    $stateProvider.state(communityState);  
    $stateProvider.state(profileState);  
    
}]);