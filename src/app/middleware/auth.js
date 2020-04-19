const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (userModel) =>{
    return {
        authenticate: () => {
            return (request, response, next) => {
                const {email, password} = request.body;
                return userModel.find(email)
                .then((user) => {
                    if(!user){
                        return response.status(401).json({
                            status: 'error',
                            error: 'Unauthorised'
                        })
                    }
                    return bcrypt.verify(password, user.password)
                    .then((valid) => {
                        if(!valid){
                            return response.status(401).json({
                                status: 'error',
                                error: 'Invalid credentials provided'
                            })
                        }
                        next();
                    }).catch((error) => {throw error})
        
                }).catch((error) => {throw error})
            };
        },
        authorize: () => {
            return (request, response, next) => {
                const authHeader = request.headers.authorization;
                if (authHeader) {
                    const token = authHeader.split(' ')[1];
                    jwt.verify(token, process.env.SECRET_KEY || 'secret', (error, decoded) => {
                        if (error) {
                            return response.status(403).json({
                                status: 'error',
                                error: 'Forbidden'
                            });
                        }
                        next();
                    });
                } else {
                    return response.status(401).json({
                        status: "error",
                        error: "Unauthorised"
                    });
                }
            } 
        },
    }
}