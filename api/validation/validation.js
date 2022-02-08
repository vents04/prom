const Joi = require('@hapi/joi');

const codeLoginValidation = (data) => {
    const schema = Joi.object({
        code: Joi.string().required().messages({
            "string.empty": "Полето код не трябва да е празно",
            "any.required": "Полето код е задължително поле"
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Полето имейл не трябва да е празно",
            "string.email": "Невалиден имейл",
            "any.required": "Полето имейл е задължително поле"
        })
    });
    return schema.validate(data);
}

const votePostValidation = (data) => {
    const schema = Joi.object({
        code: Joi.string().required().messages({
            "string.empty": "Полето код не трябва да е празно",
            "any.required": "Полето код е задължително поле"
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Полето имейл не трябва да е празно",
            "string.email": "Невалиден имейл",
            "any.required": "Полето имейл е задължително поле"
        }),
        optionChosenId: Joi.string().required().messages({
            "string.empty": "Трябва да изберете опция от офертите",
            "any.required": "Трябва да изберете опция от офертите"
        })
    });
    return schema.validate(data);
}


module.exports = {
    codeLoginValidation,
    votePostValidation
}
