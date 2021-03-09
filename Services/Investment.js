const Investment = require('../Models/Investment');

class InvestmentService {
  static async create(req) {
    return await Investment.create(req);
  }
}

module.exports = InvestmentService;
