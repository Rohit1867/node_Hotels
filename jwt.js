const jwt=require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // First, check if the request headers have authorization or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    // Extract the JWT token from the request headers
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};



//function to generate JWT token
const generateToken = (userData) =>{
    //genrate a new jwt token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:300000});

} 

module.exports={jwtAuthMiddleware,generateToken}