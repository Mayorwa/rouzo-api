const Portfolio = require('../Models/Portfolio');
const APIFeatures = require('../utils/apiFeatures');

class PortfolioService {
  static async create(req) {
    return await Portfolio.create(req);
  }

  static async getOne(params) {
    const query = await Portfolio.findOne(params);
    return await query;
  }

  static async getAll(req, params, popOptions) {
    const features = new APIFeatures(Portfolio.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }
}

module.exports = PortfolioService;
