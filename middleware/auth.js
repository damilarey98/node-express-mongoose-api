const jwt = require('jsonwebtoken');
const settings = require('../settings/config');

module.exports = function(request, response, next) {

    // Grab the token from header
    const token = request.headers['x-access-token'] || request.headers['authorization'];

    // Check if token exists
    if (!token) {
        return response.status(401).json({message: "Access denied, no token was provided in headers (x-access-token or authorization)."})
    }

    try {
        const decoded = jwt.verify(token, settings.token_secret);
        request.user = decoded;
        next();
    } catch (ex) {
        response.status(400).json({message: "Invalid Token, try again."})
    }
}