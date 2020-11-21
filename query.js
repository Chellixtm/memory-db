const { Pool } = require('pg');
const connString = process.env.DATABASE_URL || "postgres://qawpzrjqnhtiaf:a23bf8141cd22e1349efcd30d2d7087cc2008acd3e21c34abe729a62a34c58cd@ec2-54-84-98-18.compute-1.amazonaws.com:5432/d988kso6rlku9m";
const pool = new Pool({connectionString: connString});

exports.getTest =  function(req, res) {
    getDecksFromDb((err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            const decks = result;
            res.status(200).json(decks);
        }
    });
};

function getDecksFromDb(callback) {
    console.log("Getting decks from db.");
    const sql = "SELECT * FROM flash_deck";
    pool.query(sql, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("Found decks.");

        callback(null, res.rows);
    });
}