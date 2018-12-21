app.controller("loginCtrl",function($scope, authFactory, $location){
    $scope.pagetitle = "Login Page";

    $scope.callLogin = () => {
        console.log("button clicked");
        let promise = authFactory.login($scope.email, $scope.password);
        promise.then(data => {
            console.log("login success", data);
            $location.path("/community");
        }, err => {
            console.log("error is ", err);
        });
    };
});