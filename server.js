const express = require('express');
const app = express();
const { getDecksByUser, getDeckById } = require('./query');

app.set("port", (process.env.PORT || 5000));

app.get("/deck/getUserDecks", getDecksByUser);

app.get("/deck/getId", getDeckById);

app.listen(app.get("port"), () => {
    console.log("Listening for connections on port: ", app.get("port"));
});

