const Fund = require('../Models/Fund');
const APIFeatures = require('../utils/apiFeatures');

class FundService {
  static async createFund(req) {
    return await Fund.create(req);
  }

  static async fetchAll(req, params, popOptions) {
    const features = new APIFeatures(Fund.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }

  static async fetchOne(params) {
    const query = await Fund.findOne(params);
    return await query;
  }
}

module.exports = FundService;
