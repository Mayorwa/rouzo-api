const Business = require('../Models/Business');

class BusinessService {
  static async createBusiness(req) {
    return await Business.create({
      user: req.user,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      score: req.scoreParams.score,
      slug: req.body.slug,
    });
  }

  static async getOne(params, withUser) {
    let query = await Business.findOne(params);
    if (withUser)
      query = query.populate({
        path: 'user',
      });
    return await query;
  }
}

module.exports = BusinessService;
