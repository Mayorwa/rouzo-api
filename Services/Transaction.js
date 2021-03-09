const Transaction = require('../Models/Transaction');
const APIFeatures = require('../utils/apiFeatures');

class TransactionService {
  static async create(req) {
    return await Transaction.create(req);
  }

  static async getAll(req, params, popOptions) {
    const features = new APIFeatures(Transaction.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }
}

module.exports = TransactionService;
