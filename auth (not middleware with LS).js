const e = require('express');
const jwt = require('jsonwebtoken');
const secretKey = 'hgjffkhfkah';
const expiryTime = '30s';

const verifyUser = (user) => {
    if (user.username == 'rasoul') {
        if (user.password == '144') return true;
    }
    return false;
}

const createToken = async (user) => {
    if (verifyUser(user)) {
        const token = await jwt.sign({ user }, secretKey, { expiresIn: expiryTime });
        return token;
    }
    throw new Error('نام کاربری یا رمز عبور اشتباه است. لطفا دوباره امتحان کنید.');
}

const verifyToken = async (req) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        try {
            const authData = await jwt.verify(bearer[1], secretKey);
            return authData;
        } catch (err) {
            throw new Error('شناسه کاربری وارد شده معتبر نیست. لطفا وارد حساب کاربری خود شوید.');
        }
    }
    throw new Error('برای دسترسی به اطلاعات ابتدا وارد حساب کاربری خود شوید.');
}

module.exports = {
    createToken,
    verifyToken,
    testMiddleware
};