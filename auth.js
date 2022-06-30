const jwt = require('jsonwebtoken');
const secretKey = 'hg(#@24ed4r43#@r3ff33#@r3ff3h7H&*h7H&*v6vv3#@r3ff3h7H&*66f5rcrs43^#&Z^';
const expiryTime = 60; // Seconds
const tokenName = 'auth-token';

const verifyUser = (user) => {
    if (user.username == 'rasoul') {
        if (user.password == '144') return true;
    }
    return false;
}

const createToken = async (req, res) => {
    const user = req.body.user;
    if (verifyUser(user)) {
        const username = user.username;
        const token = await jwt.sign({ username }, secretKey, { expiresIn: expiryTime });
        res.cookie(tokenName, token, {
            expires: new Date(new Date().getTime() + expiryTime * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });
        return 'ورود با موفقیت انجام شد.';
    } else {
        throw new Error('نام کاربری یا رمز عبور وارد شده صحیح نمی‌باشد.');
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies[tokenName];
        const authData = await jwt.verify(token, secretKey);
        req.authData = authData;
        next();
    } catch (err) {
        res.clearCookie(tokenName);
        res.status(401).json({
            status: 401, // Unauthorized
            message: 'شناسه کاربری وارد شده معتبر نیست. لطفا وارد حساب کاربری خود شوید.',
        });
    }
}

module.exports = {
    createToken,
    verifyToken
};