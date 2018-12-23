app.controller("homeCtrl", function($scope, $location, authFactory) {
    let promise = authFactory.authCheck();
    promise.then(data =>{
        console.log("authCheck successfull", data);  
        $location.path("/community");
    }, err => {
        console.log("error is", err);
    });
});