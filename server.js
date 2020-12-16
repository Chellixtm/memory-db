const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { checkAuth } = require('./middleware/check-auth');
const { getDecksByUser, getDeckById, postDeck, putDeck } = require('./db/deckQuery');
const { signupUser, loginUser } = require('./db/userQuery');


const app = express();

app.set("port", (process.env.PORT || 5000));

app.use(cors());

/* User Commands ----------------------------------------------------------- */
app.post("/user/signup", bodyParser.json(), signupUser);

app.post("/user/login", bodyParser.json(), loginUser);

/* Deck Commands ----------------------------------------------------------- */
app.get("/deck/getUserDecks", checkAuth, getDecksByUser);

app.get("/deck/getId", getDeckById);

app.post("/deck/new", checkAuth, bodyParser.json(), postDeck);

app.put("/deck/update", checkAuth, bodyParser.json(), putDeck);

// app.delete("/deck/delete");

/* Card Commands ----------------------------------------------------------- */

app.listen(app.get("port"), () => {
    console.log("Listening for connections on port: ", app.get("port"));
});

