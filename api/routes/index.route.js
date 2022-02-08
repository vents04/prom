const express = require('express');
const router = express.Router();

const codeRoute = require('./code.route');
const voteRoute = require('./vote.route');

router.use("/code", codeRoute);
router.use("/vote", voteRoute);

module.exports = router;