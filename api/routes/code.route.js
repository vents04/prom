const express = require('express');
const ResponseError = require('../errors/responseError');
const { HTTP_STATUS_CODES, COLLECTIONS } = require('../global');
const DbService = require('../services/db.service');
const { codeLoginValidation } = require('../validation/validation');
const router = express.Router();

router.post('/login', async (req, res, next) => {
    const { error } = codeLoginValidation(req.body);
    if (error) return next(new ResponseError(error.details[0].message, HTTP_STATUS_CODES.BAD_REQUEST));

    try {
        const code = await DbService.getOne(COLLECTIONS.CODES, { code: req.body.code });
        if (!code) return next(new ResponseError("Кодът е невалиден", HTTP_STATUS_CODES.BAD_REQUEST));
        const vote = await DbService.getOne(COLLECTIONS.VOTES, { code: req.body.code });
        res.status(HTTP_STATUS_CODES.OK).send({
            isUsed: vote ? true : false
        });
    } catch (e) {
        return next(new ResponseError(e.message || "Internal server error", e.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR))
    }
});

module.exports = router;