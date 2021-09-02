const knex = require('./knex');

const getAllStartops = () => {
    return knex('api_startop').select('*');
}

const getStartop = (id) => {
    // return knex('api_startop').where('id', id).select();
    // return knex('api_startop').where('id', id).select().then(result => result[0]);
    return knex('api_startop').where({ id: id }).first().then((row) => row);
}

const searchStartop = (query) => {
    return knex('api_startop').where('title', 'like', `%${query}%`).orWhere('description', 'like', `%${query}%`);
}

module.exports = {
    getAllStartops,
    getStartop,
    searchStartop
};