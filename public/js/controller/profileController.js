app.controller("profileCtrl", function ($scope, $location, authFactory) {
    $scope.msg = "this is profile page";

    let promise = authFactory.authCheck();
    promise.then(data => {
        console.log("authcheck successfull", data);
    }).catch( err => {
        console.log("error is ", err);
        $location.path("/login");
    });
});