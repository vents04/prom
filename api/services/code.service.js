const randomstring = require("randomstring");
const mongoose = require("mongoose");
const { COLLECTIONS } = require("../global");
const DbService = require("../services/db.service");
const Code = require("../db/models/code.model");

const studentsInClassIndex = {
    0: 30,
    1: 26,
    2: 27,
    3: 26,
    4: 29,
    5: 28,
    6: 28,
    7: 26,
    8: 27
}

const CodeService = {
    generateCodes: () => {
        return new Promise(async (resolve, reject) => {
            for (let classIndex = 0; classIndex < 9; classIndex++) {
                console.log(classIndex + "\n");
                for (let studentIndex = 0; studentIndex < studentsInClassIndex[classIndex]; studentIndex++) {
                    const code = randomstring.generate(10);
                    const newCode = new Code({
                        class: classIndex,
                        numberInClass: studentIndex + 1,
                        code: code,
                    });
                    await DbService.create(COLLECTIONS.CODES, newCode);
                    console.log((studentIndex + 1) + ":" + code);
                }
                console.log("\n");
            }
        });
    },

    deleteCodes: () => {
        return new Promise(async (resolve, reject) => {
            const codes = await DbService.getMany(COLLECTIONS.CODES, {});
            for (let code of codes) {
                await DbService.delete(COLLECTIONS.CODES, { _id: mongoose.Types.ObjectId(code._id) });
            }
            resolve();
        });
    }
}

module.exports = CodeService;