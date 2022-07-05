const jwt = require('jsonwebtoken');
const auth = require('../utils/auth.utils');
require('dotenv').config();

const csrf = (req, res) => {
    const csrfToken = req.csrfToken();
    return res.status(200).json({ csrfToken });
};

const login = async (req, res) => {
    const username = req.body.username, password = req.body.password;
    if (!username || !password) return res.status(400).json({ message: 'لطفا نام کاربری و رمز عبور خود را وارد کنید.' });

    if (auth.verifyUser(username, password)) {
        // create the access token with the shorter lifespan
        // store information about the user such as username, user role, etc.
        const iatAccess = new Date().getTime();
        const accessPayload = { username, iatAccess };
        const accessToken = await jwt.sign(accessPayload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE)
        });

        // create the refresh token with the longer lifespan
        const iatRefresh = new Date().getTime();
        const refreshPayload = { username, iatRefresh };
        const refreshToken = await jwt.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: parseInt(process.env.REFRESH_TOKEN_LIFE)
        });

        res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
            expires: new Date(new Date().getTime() + parseInt(process.env.REFRESH_TOKEN_LIFE) * 1000),
            sameSite: 'strict',
            httpOnly: true,
            secure: true
        });

        return res.status(200).json({ accessToken });
    } else {
        return res.status(400).json({ message: 'نام کاربری یا رمز عبور وارد شده صحیح نمی‌باشد.' });
    }
};

const logout = (req, res) => {
    res.clearCookie(process.env.REFRESH_TOKEN_NAME);
    return res.status(200).json({ message: 'شما با موفقیت از حساب کاربری خود خارج شدید.' });
};

const refresh = async (req, res) => {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];
    if (!refreshToken) return res.status(403).json({ message: 'لطفا وارد حساب کاربری خود شوید.' });

    try {
        const authPayload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const username = authPayload.username;

        const iatAccess = new Date().getTime();
        const accessPayload = { username, iatAccess };
        const newAccessToken = await jwt.sign(accessPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: parseInt(process.env.ACCESS_TOKEN_LIFE) });

        const iatRefresh = new Date().getTime();
        const refreshPayload = { username, iatRefresh };
        const newRefreshToken = await jwt.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: parseInt(process.env.REFRESH_TOKEN_LIFE) });

        res.cookie(process.env.REFRESH_TOKEN_NAME, newRefreshToken, {
            expires: new Date(new Date().getTime() + parseInt(process.env.REFRESH_TOKEN_LIFE) * 1000),
            sameSite: 'strict',
            httpOnly: true,
            secure: true
        });

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        res.clearCookie(process.env.REFRESH_TOKEN_NAME);
        return res.status(401).json({ message: 'شناسه کاربری وارد شده معتبر نیست. لطفا وارد حساب کاربری خود شوید.' });
    }
};

const profile = (req, res) => {
    const username = req.authPayload.username;
    return res.status(200).json({ username });
};

module.exports = { csrf, login, logout, refresh, profile };
