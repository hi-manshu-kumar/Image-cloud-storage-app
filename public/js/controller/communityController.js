app.controller("communityCtrl",function ($scope, authFactory, $location){
    let promise = authFactory.authCheck();
    promise.then(data =>{
        console.log("authCheck successfull", data);  
    }, err => {
        console.log("error is", err);
        $location.path("/login");
    });
    $scope.msg = "Welcome to the Community Page";
});