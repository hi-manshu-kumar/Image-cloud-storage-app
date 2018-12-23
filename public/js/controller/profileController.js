app.controller("profileCtrl", function ($scope, $location, $cookies, Upload, authFactory) {
    $scope.msg = "this is profile page";

    let promise = authFactory.authCheck();
    promise.then(data => {
        console.log("authcheck successfull", data);
    }).catch( err => {
        console.log("error is ", err);
        $location.path("/login");
    });

    $scope.callPost = function() {
        if ($scope.postform.myImage.$valid && $scope.myImage) {
            $scope.upload($scope.myImage);
        }
      };

    $scope.upload = function (img){
        Upload.upload({
            url: '/post',
            method: 'POST',
            data: {myImage: img, 'title': $scope.title, 'description': $scope.description, 'communityFlag': $scope.communityFlag},
            headers: {
                'x-auth': $cookies.get('token')
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.myImage.name + 'uploaded. Response: ' + resp.data);
            // $scope.url = `http:/localhost:1234/${resp.data.path}`;
            $scope.url=resp.data.path;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.myImage.name);
        });
    };



});