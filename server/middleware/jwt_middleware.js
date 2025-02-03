import jwt from 'jsonwebtoken'

// token is stored  locally as 'jwtToken' 
// As the following is included in the AuthContext: 
// localStorage.setItem('jwtToken', token)

export default function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(`Auth Header: ${authHeader}`);


    if (authHeader) {
        const token = authHeader.split(' ')[1]; 
        console.log(`Token after split: ${token}`)

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);  // Token is invalid
            }


            console.log(`Decoded User: ${JSON.stringify(user)}`)
            req.user = user;  
            next(); 
        });
    } else {
        console.log('No authorization header')
        res.sendStatus(401);  // No token provided
    }
}


