const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');

/**
 * @param {Object} model - the model that facilitates the authentication
 * and authorization functionality of this middleware.
 */
module.exports = (userModel) =>{
    return {
        /*authenticate: async(request, response, next) => {
                const {email, password} = request.body;
                return userModel.find(email)
                .then((user) => {
                    return  user && user.hasOwnProperty("password") ?
                    bcrypt.compare(password, user.password)
                    .then((valid) => {
                        return valid ? 
                        next()
                        : response.status(401).json({
                            status: 'error',
                            error: 'Invalid credentials provided'
                        })
                    }).catch((error) => {throw error})
                    : response.status(401).json({
                        status: 'error',
                        error: 'Unauthorised'
                    })
                }).catch((error) => {throw error})
        },*/

         /**
          * @param {Object} request - http request object.
          * @param {Object} response - http response object.
          * @param {function} next - callback function for this middleware.
          * 
          * This middleware checks for the existence of a token in the authorization
          * header of a request and verifies the token's validity. It calls next on successful
          * authorization or returns a failure http code if the provided token is invalid or 
          * completely no-existent
          */
        authorize: async (request, response, next) => {
            const authHeader = request.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                return jwt.verify(token, process.env.SECRET_KEY || 'secret', (error, decoded) => {
                    return error ? 
                    response.status(403).json({
                        status: 'error',
                        error: 'Forbidden'
                    })
                    : next();
                });
            } else {
                return response.status(401).json({
                    status: "error",
                    error: "Unauthorised"
                });
            }
        },
    }
}