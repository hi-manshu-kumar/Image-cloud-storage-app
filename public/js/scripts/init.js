app.run(["$location", "authFactory", function($location, authFactory) {
    let promise = authFactory.authCheck();
    promise.then(data =>{
        console.log("login successfull", data);  
        // $location.path("/community");
    }, err => {
        console.log("error is", err);
    });
}])