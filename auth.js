const jwt = require('jsonwebtoken');
const secretKey = 'hgjffkhfkah';
const expiryTime = 30; // Seconds

const verifyUser = (user) => {
    if (user.username == 'rasoul') {
        if (user.password == '144') return true;
    }
    return false;
}

const createToken = async (req, res) => {
    const user = req.body.user;
    if (verifyUser(user)) {
        const token = await jwt.sign({ user }, secretKey, { expiresIn: expiryTime });
        res.cookie('Token', token, {
            expires: new Date(new Date().getTime() + expiryTime * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });
        return token;
    }
    throw new Error('نام کاربری یا رمز عبور اشتباه است. لطفا دوباره امتحان کنید.');
}

const verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log(req.cookies);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        try {
            const authData = await jwt.verify(bearer[1], secretKey);
            req.authData = authData;
            next();
        } catch (err) {
            res.status(403).json({
                status: 403, // Forbidden
                message: 'شناسه کاربری وارد شده معتبر نیست. لطفا وارد حساب کاربری خود شوید.',
            });
        }
    } else {
        res.status(401).json({
            status: 401, // Unauthorized
            message: 'برای دسترسی به اطلاعات ابتدا وارد حساب کاربری خود شوید.',
        });
    }
}

module.exports = {
    createToken,
    verifyToken
};