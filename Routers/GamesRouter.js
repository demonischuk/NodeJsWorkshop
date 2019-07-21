const express = require("express");
const gamesRouter = express.Router();

gamesRouter.route("/games")
    .get((req, res) => {
        return res.status(200).json({
            name: "Satisfactory",
            rating: 10
        });
    });

module.exports = gamesRouter;