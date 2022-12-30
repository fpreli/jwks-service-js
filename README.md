# jwks-service-js
This project aims to expose a simple jwks API service supporting both EC and RSA algorithm (256). 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The service.js exposes 6 different APIs:
* /rotate/ec: to generate a private/public key pair using the ES-256 algorithm
* /rotate/rsa: to generate a private/public key pair using the RS-256 algorithm
* /jwks/ec: to expose the EC generated previously
* /jwks/rsa: to expose the RSA generated previously
* /token/ec: to generate a JWT signed with the EC generated previously
* /token/rsa: to generate a JWT signed with the RSA generated previously
	
## Technologies
Project is created with:
* Node.js v12.22.12
	
## Setup
To run this project, install it locally using npm:

```
$ npm install fs
$ npm install node-jose
$ npm install jwk-to-pem
$ npm install jsonwebtoken
$ npm install axios
```
Once the dependencies are installed, just run service.js and enjoy your jwks API service.
