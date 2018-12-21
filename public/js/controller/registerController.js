app.controller("registerCtrl",function ($scope, authFactory, $location){
    $scope.msg = "Welcome to the register Page";

    $scope.callRegister = () => {
        let promise = authFactory.register($scope.email, $scope.password);
        promise.then(data =>{
            console.log("register successfull", data);
            $location.path("/community");
        }, err => {
            console.log("error is", err);
        });
    };
});