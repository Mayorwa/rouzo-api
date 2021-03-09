const Eligibility = require('../Models/Eligibility');
const Partials = require('../Helpers/Partials');

class EligibilityService {
  static async create(req) {
    return await Eligibility.create(req);
  }

  static score(body) {
    const scores = [];

    const scoreParams = [];

    for (const [key, value] of Object.entries(body)) {
      let i;
      const options = Partials.eligibilityOptions(key);
      for (i = 0; i < options.length; i += 1) {
        if (options[i].id === parseInt(value, 10)) {
          scores.push(options[i].score);
          scoreParams[key] = options[i].name;
        }
      }
    }
    const score = scores.reduce((a, b) => a + b, 0);
    scoreParams.score = score;
    scoreParams.slug =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return scoreParams;
  }
}

module.exports = EligibilityService;
