const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { getDecksByUser, getDeckById, postDeck, putDeck } = require('./db/deckQuery');


const app = express();

app.set("port", (process.env.PORT || 5000));

app.use(cors());

/* User Commands ----------------------------------------------------------- */
app.post("/user/signup", signupUser);

app.post("/user/login", loginUser);

/* Deck Commands ----------------------------------------------------------- */
app.get("/deck/getUserDecks", getDecksByUser);

app.get("/deck/getId", getDeckById);

app.post("/deck/new", bodyParser.json(), postDeck);

app.put("/deck/update", bodyParser.json, putDeck);

// app.delete("/deck/delete");

/* Card Commands ----------------------------------------------------------- */

app.listen(app.get("port"), () => {
    console.log("Listening for connections on port: ", app.get("port"));
});

