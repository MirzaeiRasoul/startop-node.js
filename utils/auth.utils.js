const jwt = require('jsonwebtoken');

const verifyUser = (username, password) => {
    if (username == 'rasoul') {
        if (password == '144') return true;
    }
    return false;
}

const generateTokens = async (res, username) => {
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

    return accessToken;
}

module.exports = { verifyUser, generateTokens };
