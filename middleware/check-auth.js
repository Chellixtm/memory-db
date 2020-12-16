const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, 'secret_testing_auth_for_jwt_for_project_2');
        next();
    } catch (error) {
        res.status(401).json({ message: "Auth Failed!", data: error});
    }
};