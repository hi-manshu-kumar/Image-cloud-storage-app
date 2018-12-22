app.controller("logoutCtrl",function($scope, authFactory, $location){
    $scope.pagetitle = "Logout Page";

    let promise = authFactory.authCheck();
    promise.then(data =>{
        console.log("authCheck successfull", data);  
    }, err => {
        console.log("error is", err);
        $location.path("/login");
    });
    
    $scope.callLogout = () => {
        console.log("button clicked");
        let promise = authFactory.logout($scope.email, $scope.password);
        promise.then(data => {
            console.log("login success", data);
            $location.path("/login");
        }, err => {
            console.log("error is ", err);
        });
    };
});