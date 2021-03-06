const dbCon = require('./dbConnection');
const pool = dbCon.dbConnect(); 

//getDeck function for one deck
exports.getDeckById =  (req, res) => {
    const id = req.query.id;

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
exports.getDecksByUser =  (req, res) => {
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
    console.log("Getting deck from db...");
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

// post new deck by user
exports.postDeck = (req, res) => {
    const deck_name = req.body.deck_name;
    const creator_id = req.body.creator_id;

    createNewDeck(deck_name, creator_id, (err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            res.status(200).json(result);
        }
    })
}

function createNewDeck(deck_name, creator_id, callback) {
    console.log("Creating new deck...")
    const sql = "INSERT INTO flash_deck VALUES (default, $1::text, $2::int)";
    const params = [deck_name, creator_id];
    pool.query(sql, params, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("New deck created.");

        callback(null, res.rowCount);
    });
}

// update deck
exports.putDeck = (req, res) => {
    const id = req.params.id;
    const deck_name = req.body.deck_name;

    updateDeck(id, deck_name, (err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            res.status(200).json(result);
        }
    });
}

function updateDeck(id, deck_name, callback) {
    console.log("Updating deck.");
    const sql = "UPDATE flash_deck SET deck_name = $2::text WHERE deck_id = $1::int";
    const params = [id, deck_name];
    pool.query(sql, params, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("Deck updated.");

        callback(null, res);
    });
}

// Delete deck
exports.deleteDeck = (req, res) => {
    const id = req.query.id;

    deleteDeckFromDb(id, (err, result) => {
        if (err) {
            res.status(500).json({success: false, data: err});
        } else {
            res.status(200).json(result);
        }
    });
}

function deleteDeckFromDb(id, callback) {
    console.log("Deleting deck.");
    const sql = "DELETE FROM flash_deck WHERE deck_id = $1::int";
    const params = [id];
    pool.query(sql, params, (err, res) => {
        if (err) {
            console.log("Error in query: ");
            console.log(err);
            callback(err, null);
        }

        console.log("Deck updated.");

        callback(null, res);
    });
}