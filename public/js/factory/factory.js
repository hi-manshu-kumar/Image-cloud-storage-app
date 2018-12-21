app.factory("appFactory", function($http, $q){
    var getJSON = function() {
        var defered = $q.defer();
        $http.get(URL).then(data=>{
            defered.resolve(data);
        }, err => {
            defered.reject(err);
        });

        return defered.promise;
    };
     
    return {
        "otheroffers":"Offers Before April End",
        "getjson":getJSON
    };
});