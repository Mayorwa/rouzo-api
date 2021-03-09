const Bank = require('../Models/Bank');
const APIFeatures = require('../utils/apiFeatures');

class BankService {
  static async create(req) {
    return await Bank.create({
      name: req.name,
      code: req.code,
      long_code: req.long_code,
    });
  }

  static async getOne(params) {
    const query = await Bank.findOne(params);
    return await query;
  }

  static async getAll(req, params, popOptions) {
    const features = new APIFeatures(Bank.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }
}

module.exports = BankService;
