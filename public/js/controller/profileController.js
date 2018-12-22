app.controller("profileCtrl", function ($scope, $location, authFactory) {
    $scope.msg = "this is profile page";

    let promise = authFactory.authCheck();
    promise.then(data => {
        console.log("authcheck successfull", data);
    }).catch( err => {
        console.log("error is ", err);
        $location.path("/login");
    });

    $scope.callLogin = () => {
        console.log("button clicked");
        let postPromise = authFactory.addPost($scope.myImage, $scope.title, $scope.description);
        postPromise.then(data => {
            console.log("login success", data);
            $location.path("/community");
        }, err => {
            console.log("error is ", err);
        });
    };
});