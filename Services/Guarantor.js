const Guarantor = require('../Models/Guarantor');

class GuarantorService {
  static async createGuarantor(req) {
    return await Guarantor.create({
      business: req.business,
      name: req.name,
      email: req.email,
      phone: req.phone,
      relationship: req.relationship,
      bvn: req.bvn,
    });
  }
}

module.exports = GuarantorService;
