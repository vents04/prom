const mongoose = require('mongoose');
const { DATABASE_MODELS } = require('../../global');

const codeSchema = mongoose.Schema({
    class: {
        type: Number,
        min: 0,
        max: 8,
        required: true
    },
    numberInClass: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
});

const Code = mongoose.model(DATABASE_MODELS.CODE, codeSchema);
module.exports = Code;