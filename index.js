const app = require('./app');
const db = require('./db/startop');
const auth = require('./auth');

app.get('/', (req, res) => {
    res.status(200).json('Hello World!');
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
    try {
        const token = await auth.createToken(req, res);
        res.status(200).json(token);
    } catch (err) {
        // res.status(202).clearCookie('Name').send("cookies cleared")
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

app.get('/profile/', auth.verifyToken, (req, res) => {
    const username = req.authData.user.username;
    // const username = req.authData;
    res.status(200).json({ username });
});