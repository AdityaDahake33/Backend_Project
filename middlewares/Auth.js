const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/user/login');
    }
};
