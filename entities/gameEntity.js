const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameEntity = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("game", gameEntity);