app.controller("loginCtrl",function($scope, authFactory, $location){
    $scope.pagetitle = "Login Page";

    let promise = authFactory.authCheck();
    promise.then(data =>{
        console.log("authCheck successfull", data);
        $location.path("/community");
    }, err => {
        console.log("error is", err);
    });

    $scope.callLogin = function() {
        if ($scope.loginform.email.$valid && $scope.email && $scope.password) {
            $scope.login();
        }else if(!$scope.loginform.email.$valid){
            swal ( "Oops" ,  "Pls provide valid email " ,  "error" );            
        }
        else{
            swal ( "Oops" ,  "Pls provide email and password..." ,  "error" );
        }
    };

    $scope.login = () => {
        let promise = authFactory.login($scope.email, $scope.password);
        promise.then(data => {
            console.log("login success", data);
            $location.path("/community");
        }, err => {
            console.log("error is ", err);
            swal ( "Oops" ,  "Login Unsuccessfull!Pls try again with valid email and password..." ,  "error" )
        });
    };
});