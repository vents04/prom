const express = require('express');
const ResponseError = require('../errors/responseError');
const { HTTP_STATUS_CODES, COLLECTIONS, OPTIONS_IDS } = require('../global');
const DbService = require('../services/db.service');
const { votePostValidation } = require('../validation/validation');
const router = express.Router();
const Vote = require('../db/models/vote.model');
const VoteService = require('../services/vote.service');

router.post("/", async (req, res, next) => {
    const { error } = votePostValidation(req.body);
    if (error) return next(new ResponseError(error.details[0].message, HTTP_STATUS_CODES.BAD_REQUEST));

    try {
        const code = await DbService.getOne(COLLECTIONS.CODES, { code: req.body.code });
        if (!code) return next(new ResponseError("Кодът е невалиден", HTTP_STATUS_CODES.NOT_FOUND));
        const vote = await DbService.getOne(COLLECTIONS.VOTES, { code: req.body.code });
        if (vote) return next(new ResponseError("Кодът е вече използван", HTTP_STATUS_CODES.CONFLICT));
        if (!Object.values(OPTIONS_IDS).includes(req.body.optionChosenId)) return next(new ResponseError("Избрана е невалидна опция", HTTP_STATUS_CODES.BAD_REQUEST));

        const newVote = new Vote(req.body);

        await DbService.create(COLLECTIONS.VOTES, newVote);

        res.sendStatus(HTTP_STATUS_CODES.OK);
    } catch (e) {
        return next(new ResponseError(e.message || "Internal server error", e.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
});

router.get("/stats", async (req, res, next) => {
    try {
        const stats = await VoteService.getStats();
        res.status(HTTP_STATUS_CODES.OK).send({
            stats: stats
        })
    } catch (e) {
        return next(new ResponseError(e.message || "Internal server error", e.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
});

module.exports = router;