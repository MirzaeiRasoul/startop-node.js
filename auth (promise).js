const jwt = require('jsonwebtoken')
const secretKey = 'hgjffkhfkah'
const expiryTime = '30s'

const createToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ user }, secretKey, { expiresIn: expiryTime }, (err, token) => {
            resolve(token);
        })
    })
}

const verifyToken = (req) => {
    return new Promise((resolve, reject) => {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            jwt.verify(bearer[1], secretKey, (err, authData) => {
                err ? reject('forbidden ...') : resolve(authData)
            })
        } else { reject('forbidden ...') }
    })
}

module.exports = {
    createToken,
    verifyToken
}