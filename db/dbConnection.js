exports.dbConnect = function() {
    const { Pool } = require('pg');
    const connString = process.env.DATABASE_URL;
    const pool = new Pool({connectionString: connString});
    return pool;
}