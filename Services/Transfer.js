const Transfer = require('../Models/Transfer');
const APIFeatures = require('../utils/apiFeatures');

class TransferService {
  static async create(req) {
    return await Transfer.create(req);
  }

  static async getAll(req, params, popOptions) {
    const features = new APIFeatures(Transfer.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }
}

module.exports = TransferService;
