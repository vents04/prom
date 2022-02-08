const { COLLECTIONS } = require("../global");
const DbService = require("./db.service");

const VoteService = {
    getStats: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let stats = {};

                const votes = await DbService.getMany(COLLECTIONS.VOTES, {});
                for (let vote of votes) {
                    if (stats.hasOwnProperty(vote.optionChosenId)) stats[vote.optionChosenId] = stats[vote.optionChosenId] + 1;
                    else stats[vote.optionChosenId] = 1;
                }

                resolve(stats);
            } catch (e) {
                reject(e.message || "Internal server error");
            }
        })
    }
}

module.exports = VoteService;