const express = require('express');
const cors = require('cors');
const { getDecksByUser, getDeckById, postDeck } = require('./db/deckQuery');


const app = express();

app.set("port", (process.env.PORT || 5000));

app.use(cors());

/* User Commands ----------------------------------------------------------- */

/* Deck Commands ----------------------------------------------------------- */
app.get("/deck/getUserDecks", getDecksByUser);

app.get("/deck/getId", getDeckById);

app.post("/deck/new", postDeck);

// app.put("/deck/update");

// app.delete("/deck/delete");

/* Card Commands ----------------------------------------------------------- */

app.listen(app.get("port"), () => {
    console.log("Listening for connections on port: ", app.get("port"));
});

