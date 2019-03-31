app.controller("communityCtrl",function ($scope, authFactory, $location){
    let promise = authFactory.authCheck();
    promise.then(data =>{
    }, err => {
        $location.path("/login");
    });
    $scope.msg = "Welcome to the Community Page";
    
    let getPostPromise = authFactory.getPost();
    getPostPromise.then(data => {
        $scope.$watch(data.data, () => {
            $scope.imagePath = data.data
        })
        $scope.imagePath = data.data;
    }).catch( err => {
        // $location.path("/login");
        console.log(err);
    });
});