const Investor = require('../Models/Investor');

class InvestorService {
  static async createInvestor(req) {
    return await Investor.create({
      user: req.user,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      preference: req.body.preference,
    });
  }

  static async getOne(params, withUser) {
    let query = await Investor.findOne(params);
    if (withUser)
      query = query.populate({
        path: 'user',
      });
    return await query;
  }
}

module.exports = InvestorService;
