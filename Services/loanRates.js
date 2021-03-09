const loanRates = require('../Models/LoanRates');
const APIFeatures = require('../utils/apiFeatures');

class LoanRates {
  static async create(req) {
    return await loanRates.create(req);
  }

  static async getOne(params) {
    const query = await loanRates.findOne(params);
    return await query;
  }

  static async getAll(req, params, popOptions) {
    const features = new APIFeatures(loanRates.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }
}

module.exports = LoanRates;
