app.config(['$routeProvider', '$locationProvider', '$stateProvider', 'LOGIN', 'REGISTER', 'COMMUNITY', function($routeProvider, $locationProvider, $stateProvider, LOGIN, REGISTER, COMMUNITY){
    $locationProvider.hashPrefix('');
    
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

    $stateProvider.state(indexState);  
    $stateProvider.state(loginState);  
    $stateProvider.state(registerState);  
    $stateProvider.state(communityState);  
    
}]);