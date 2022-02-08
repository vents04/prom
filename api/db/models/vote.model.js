const mongoose = require('mongoose');
const { DATABASE_MODELS, OPTIONS_IDS } = require('../../global');

const voteSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dt: {
        type: Number,
        default: Date.now
    },
    optionChosenId: {
        type: String,
        enum: Object.values(OPTIONS_IDS),
        required: true
    }
});

const Vote = mongoose.model(DATABASE_MODELS.VOTE, voteSchema);
module.exports = Vote;