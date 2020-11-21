const express = require('express');
const cors = require('cors');
const { getDecksByUser, getDeckById } = require('./query');


const app = express();

app.set("port", (process.env.PORT || 5000));

app.use(cors());

app.get("/deck/getUserDecks", getDecksByUser);

app.get("/deck/getId", getDeckById);

app.listen(app.get("port"), () => {
    console.log("Listening for connections on port: ", app.get("port"));
});

