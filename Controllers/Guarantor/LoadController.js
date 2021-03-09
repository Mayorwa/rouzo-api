const guarantorService = require('../../Services/Guarantor');

class LoadController {
  static async createGuarantor(req, res) {
    const guarantorParams = {
      business: req.business,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      relationship: req.body.relationship,
      bvn: req.body.bvn,
    };
    const guarantor = await guarantorService.createGuarantor(guarantorParams);

    return res.status(201).json({
      status: 'success',
      message: 'Guarantor Details created Successfully',
      data: guarantor,
    });
  }
}

module.exports = LoadController;
