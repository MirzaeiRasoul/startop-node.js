const jwt = require('jsonwebtoken');
const auth = require('../utils/auth.utils');

const csrf = (req, res) => {
    const csrfToken = req.csrfToken();
    return res.status(200).json({ csrfToken });
};

const login = async (req, res) => {
    const username = req.body.username, password = req.body.password;
    if (!username || !password) return res.status(400).json({ message: 'لطفا نام کاربری و رمز عبور خود را وارد کنید.' });

    if (auth.verifyUser(username, password)) {
        const accessToken = await auth.generateTokens(res, username);
        return res.status(200).json({ accessToken });
    } else {
        res.clearCookie(process.env.REFRESH_TOKEN_NAME);
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
        const refreshPayload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const username = refreshPayload.username;

        const accessToken = await auth.generateTokens(res, username);
        return res.status(200).json({ accessToken });
    } catch (err) {
        res.clearCookie(process.env.REFRESH_TOKEN_NAME);
        return res.status(401).json({ message: 'شناسه کاربری شما معتبر نیست. لطفا وارد حساب کاربری خود شوید.' });
    }
};

const profile = (req, res) => {
    const username = req.accessPayload.username;
    return res.status(200).json({ username });
};

module.exports = { csrf, login, logout, refresh, profile };
