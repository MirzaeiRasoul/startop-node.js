require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const moragn = require('morgan');

const authRouter = require('./routes/auth.routes');
const searchRouter = require('./routes/search.routes');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrf({
    cookie: {
        key: 'csrf-token',
        sameSite: 'strict',
        httpOnly: true,
        secure: true,
        maxAge: 3600 // 1-hour
    }
}));
app.use(moragn('dev'));

app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);

app.get('/', (req, res) => {
    return res.status(200).json('Hello World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

module.exports = app;
