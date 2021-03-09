const Stash = require('../Models/Stash');

class StashService {
  static async create(req) {
    return await Stash.create({
      investor: req.investor,
      total_balance: req.amount,
      available_balance: req.amount,
    });
  }

  static async getOne(params, populate) {
    let query = await Stash.findOne(params);
    if (populate) query = query.populate(populate);
    return await query;
  }

  static async credit(req) {
    const query = await Stash.findOne({ investor: req.investor });

    query.available_balance =
      parseInt(query.available_balance, 10) + parseInt(req.amount, 10);

    query.total_balance =
      parseInt(query.total_balance, 10) + parseInt(req.amount, 10);

    query.paystack.customerId = req.customerId;

    return await query.save();
  }
}

module.exports = StashService;
