app.controller("communityCtrl", function($scope, authFactory) {
    $scope.loginCheck = () => {
        console.log("button clicked");
        let promise = authFactory.login();
        promise.then(data => {
            console.log("login success ", data);
        }, err => {
            console.log("error is ", err);
        });
    };
    $scope.register = () => {
        let promise = authFactory.register();
        promise.then(data =>{
            console.log("register successfull", data)
        }, err => {
            console.log("error is", err);
        });
    };

    $scope.logout = () => {
        let promise = authFactory.logout();
        promise.then(data =>{
            console.log("logout successfull", data)
        }, err => {
            console.log("error is", err);
        });
    };

    $scope.authCheck = () => {
        let promise = authFactory.authCheck();
        promise.then(data =>{
            console.log("register successfull", data)
        }, err => {
            console.log("error is", err);
        });
    }
})