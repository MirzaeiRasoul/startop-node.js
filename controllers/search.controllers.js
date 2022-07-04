const db = require('../db/startop');

const rootSearch = async (req, res) => {
    const startups = await db.getAllStartups();
    return res.status(200).json({ startups });
};

const querySearch = async (req, res) => {
    const startups = await db.searchStartup(req.params.query);
    return res.status(200).json({ startups });
};

module.exports = { rootSearch, querySearch };
