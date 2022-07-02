const express = require('express');
const app = require('./app');
const db = require('./db/startop');
const auth = require('./auth');

app.get('/', (req, res) => {
    res.status(200).json('Hello World!');
});

/* APIs: Define v1 API Routes
*************************************************************************************************** */
const router = express.Router();
app.use('/api/v1', router);

// router.get('/startops/', async (req, res) => {
//     const startops = await db.getAllStartops();
//     res.status(200).json(startops);
// });

// router.get('/startops/:id', async (req, res) => {
//     const startop = await db.getStartop(req.params.id);
//     res.status(200).json(startop);
// });

router.post('/auth/login/', async (req, res) => {
    try {
        const message = await auth.createToken(req, res);
        res.status(200).json({
            status: 200,
            message: message,
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get('/profile/', auth.verifyToken, (req, res) => {
    // If verifyToken is passed ...
    const username = req.authData.username;
    res.status(200).json({ username });
});

router.get('/search/', async (req, res) => {
    const startops = await db.getAllStartops();
    res.status(200).json(startops);
});

router.get('/search/:query', async (req, res) => {
    const startops = await db.searchStartop(req.params.query);
    res.status(200).json(startops);
});
