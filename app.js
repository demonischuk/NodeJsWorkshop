const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/games", { useNewUrlParser: true});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/v1", require("./Routers/GamesRouter"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});