app.factory("authFactory", function($http, $cookies, $q){
    const object = {
        login () {
            let defered = $q.defer();
            $http.post('user/login', {
                "email": 'himanshu@gmail.com',
                "password": '123456789'
            }).then(data => {
                let xAuth = data.headers()['x-auth'];
                let expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);       //1day cookie
                $cookies.put('token', xAuth, {'expires': expireDate, 'samesite': 'lax'});

                defered.resolve(data);
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        },

        register () {
            let defered = $q.defer();
            $http.post('user/', {
                "email": 'himanshui@gmail.com',
                "password": '123456789'
            }).then(data => {
                let xAuth = data.headers()['x-auth'];
                let expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);       //1day cookie
                $cookies.put('token', xAuth, {'expires': expireDate, 'samesite': 'lax'});

                defered.resolve(data);
            }, err => {
                defered.reject(err);
            });

            return defered.promise;
        },

        logout () {
            console.log($cookies.get('token'));
            let defered = $q.defer();
            $http.delete('user/me/token',{
                headers: {
                    'x-auth': $cookies.get('token')
                }
            }).then(data => {
                defered.resolve(data);
            }, err => {
                defered.resolve(err);
            });
            
            return defered.promise;
        },

        authCheck() {
            let defered = $q.defer();
            $http.get('user/me',{
                headers: {
                    'x-auth': $cookies.get('token')
                }
            }).then(data => {
                defered.resolve(data);
            }, err => {
                defered.resolve(err);
            });
            
            return defered.promise;
        }
    }

    return object;
})