# jwks-service-js
This project aims to expose a simple jwks API service (on the port 3000) supporting both EC and RSA algorithm (256). 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
The service.js exposes 6 different APIs:
* */rotate/ec*: to generate a private/public key pair using the ES-256 algorithm
* */rotate/rsa*: to generate a private/public key pair using the RS-256 algorithm
* */jwks/ec*: to expose the EC generated previously
* */jwks/rsa*: to expose the RSA generated previously
* */token/ec*: to generate a JWT signed with the EC generated previously
* */token/rsa*: to generate a JWT signed with the RSA generated previously
* */verify/ec*: to verify a JWT against a public key exposed by /jwks/ec
	* The API is expecting a token as part of the POST API body (Content-Type: application/json)
* */verify/rsa*: to verify a JWT against a public key exposed by /jwks/rsa
	* The API is expecting a token as part of the POST API body (Content-Type: application/json)

Here an example of /verify/rsa call
```
curl -X POST "<YOUR_IP>:3000/verify/rsa" -H "Content-Type: application/json" -d '{"token":"eyJ0eXAiOiJqd3QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkJXVUFxMWZrT1oyY2tjYWFNdUdUa19OSnZjR1lBTE9hTDVUS1FDcFRNaG8ifQ.eyJzdWIiOiJhcGlnZWUtdGVzdC1zdWJqZWN0IiwiYXVkIjoiYXBpZ2VlLXRlc3QtYXVkIn0.oOgmL1YUewtNY_mDwgN290lDsqNfqQE78-0hMxI3PbvE4sY5K-CDh8ZX7X89u6KzTLDZd08FqgpSQ7pjEed9mIDrEJSnNWtKRiZMh5JPrNlMV-IVl0EFHEE99D1D0ePMpAz8lUo1LH9kM8WwiNMCxLZkmj294f-j3GFNiYU7sFPfFSTJiuyQ-VLwUZVY1Aqe8uOS_h-HP2SRe_Ps4KSaGd02VJpAW6G1XN5rwsuYi70oCVeSxU9Se1v6djB_3meyZ09ASgXDXPxk0K0uEN2NGHCYi4V6Jd78oCwOqMzeUFKG-kQDi7EJz4jzXJc0zxiqjALIX0cQ_QDu2Rp8URHGxQ"}'
```

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
