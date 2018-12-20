app.config(['$routeProvider', '$locationProvider', 'LOGIN', 'REGISTER', function($routeProvider, $locationProvider, LOGIN, REGISTER){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: "home.html",
        controller: "homeCtrl"
    }).when(LOGIN, {
        templateUrl:"login.html",
        controller:"loginCtrl"
    }).when(REGISTER, {
        templateUrl:"register.html",
        controller:"registerCtrl"
    }).otherwise({
        template:"Error Page , No match found" ,
        redirectTo:"/"
    });
}]);