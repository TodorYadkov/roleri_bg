import jwt from 'jsonwebtoken';

const verifyJwtToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            throw new Error('The token is invalid');
        }

        return decodedToken;
    });
};

export default verifyJwtToken;