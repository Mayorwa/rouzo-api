const Saving = require('../Models/Saving');
const APIFeatures = require('../utils/apiFeatures');

class SavingService {
  static async create(req) {
    return await Saving.create(req);
  }

  static async getAll(req, params, popOptions) {
    const features = new APIFeatures(Saving.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (popOptions) features.query = features.query.populate(popOptions);
    return await features.query;
  }
}

module.exports = SavingService;
