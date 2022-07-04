const knex = require('./knex');

const getAllStartups = () => {
    return knex('api_startop').select('*');
}

const getStartup = (id) => {
    // return knex('api_startup').where('id', id).select();
    // return knex('api_startup').where('id', id).select().then(result => result[0]);
    return knex('api_startop').where({ id: id }).first().then((row) => row);
}

const searchStartup = (query) => {
    return knex('api_startop').where('title', 'like', `%${query}%`).orWhere('description', 'like', `%${query}%`);
}

module.exports = { getAllStartups, getStartup, searchStartup };
