const express = require('express');
const path = require('path');
const moragn = require('morgan');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth.routes');
const searchRouter = require('./routes/search.routes');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../../React/startop/build')));
app.use(moragn('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../React/startop/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

module.exports = app;
