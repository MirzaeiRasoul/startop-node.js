const app = require('./app');
const db = require('./db/startop');
const auth = require('./auth');

app.get('/', (req, res) => {
    res.json('Hello World!');
    // res.cookie('Token', 'Rahul Ahire2', {
    //     path: '/',
    //     expires: new Date(new Date().getTime() + 100 * 1000),
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'None',
    // }).json('Hello World!');
});

app.get('/startops', async (req, res) => {
    const startops = await db.getAllStartops();
    res.status(200).json(startops);
});

app.get('/startops/:id', async (req, res) => {
    const startop = await db.getStartop(req.params.id);
    res.status(200).json(startop);
});

app.get('/search/', async (req, res) => {
    const startops = await db.getAllStartops();
    res.status(200).json(startops);
});

app.get('/search/:query', async (req, res) => {
    const startops = await db.searchStartop(req.params.query);
    res.status(200).json(startops);
});

app.post('/login', async (req, res) => {
    const user = req.body.user;
    try {
        const token = await auth.createToken(user);
        res.json(token);
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

app.get('/profile/', async (req, res) => {
    try {
        const authData = await auth.verifyToken(req);
        const username = authData.user.username;
        res.status(200).json({username});
    } catch (err) {
        res.status(403).json({
            status: 403,
            message: err.message,
        })
    }
});