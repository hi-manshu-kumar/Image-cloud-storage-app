# image-cloud-storage-app

> restful api for uploading images 

This example shows how we can upload our images from nodejs application to mongodb database. 


## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install
```


## Usage

```js
$ npm start

This will start the application at port 1234
```


## API

```js
METHOD   URL                            HEADERS         DESCRIPTION                                                PARAMETERS
GET      localhost:1234/                                --> returns index.html

GET      localhost:1234/post            x-auth          --> returns all post that was shared to community
POST     localhost:1234/post            x-auth          --> adds new POST with image file and ask for              title, description, imagefile, communityflag
                                                        sharing of image to community tab and returns image url
GET      localhost:1234/post/:id                        --> returns the post having same 'id' in the url 

POST     localhost:1234/user                            --> adds user to the db with email and username and        email, password
                                                        x-auth token in header for authentication
GET      localhost:1234/user/me         x-auth          --> used for authetication of user 
POST     localhost:1234/user/login                      --> returns x-auth token and used for user login form      email, password
DELETE   localhost:1234/user/me/token   x-auth          --> used for logout form and removes JWT token from db 
```

## See Also

- [`morgan`](https://github.com/expressjs/morgan)
- [`multer`](https://github.com/expressjs/multer)
- [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken)

## License

ISC

