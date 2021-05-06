const { Pool } = require("pg"); // import the PG library and destructure out the Pool object and its methods

const pool = new Pool(); // declare a new Pool object named pool

/* pool.query: method to run a query on the
first available idle client and return result */
module.exports = {
    query: (text, params) => pool.query(text, params),
};