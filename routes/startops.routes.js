const express = require('express');
const router = express.Router();

const db = require('../db/startop');

router.get('/', async (req, res) => {
    const startups = await db.getAllStartups();
    return res.status(200).json({ startups });
});

router.get('/:id', async (req, res) => {
    const startup = await db.getStartup(req.params.id);
    return res.status(200).json({ startup });
});

module.exports = router;
