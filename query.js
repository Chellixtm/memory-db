const { Pool } = require('pg');
const connString = process.env.DATABASE_URL || "postgres://qawpzrjqnhtiaf:a23bf8141cd22e1349efcd30d2d7087cc2008acd3e21c34abe729a62a34c58cd@ec2-54-84-98-18.compute-1.amazonaws.com:5432/d988kso6rlku9m";
const pool = new Pool({connectionString: connString});


//getDeck function for one deck
exports.getDeckById =  function(req, res) {
    const id = req.query.id;
    console.log(`Id of deck: ${id}`);

    getDeckFromDb(id, (err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            const deck = result[0];
            res.status(200).json(deck);
        }
    });
};

function getDeckFromDb(id, callback) {
    console.log("Getting deck from db.");
    const sql = "SELECT * FROM flash_deck WHERE deck_id = $1::int";
    const params = [id];
    pool.query(sql, params, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("Found deck.");

        callback(null, res.rows);
    });
}

// get decks by user
exports.getDecksByUser =  function(req, res) {
    const id = req.query.id;

    getUserDecksFromDb(id, (err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            const decks = result;
            res.status(200).json(decks);
        }
    });
};

function getUserDecksFromDb(id, callback) {
    console.log("Getting deck from db.");
    const sql = "SELECT * FROM flash_deck WHERE creator_id = $1::int";
    const params = [id];
    pool.query(sql, params, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("Found deck.");

        callback(null, res.rows);
    });
}