const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAuth = async (req, res, next) => {
    const accessToken = req.header('X-Access-Token');
    if (!accessToken) return res.status(403).json({ message: 'لطفا وارد حساب کاربری خود شوید.' });

    try {
        const authPayload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.authPayload = authPayload;
        next();
    } catch (err) {
        res.clearCookie(process.env.REFRESH_TOKEN_NAME);
        return res.status(401).json({ message: 'شناسه کاربری وارد شده معتبر نیست. لطفا وارد حساب کاربری خود شوید.' });
    }
}

module.exports = verifyAuth;
