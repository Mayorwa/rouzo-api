const Referral = require('../Models/Referral');

class ReferralService {
  static async create(req) {
    return await Referral.create(req);
  }
}

module.exports = ReferralService;
