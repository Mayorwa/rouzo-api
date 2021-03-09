const fundService = require('../../Services/Fund');

class LoadController {
  static async create(req, res) {
    const fundParams = {
      user: req.user,
      business: req.business,
      description: req.body.description,
      category: req.body.category,
      resides_in_lagos: req.body.resides_in_lagos,
      existing_loan: req.body.existing_loan,
      certify_guarantor: req.body.certify_guarantor,
      certify_document: req.body.certify_document,
    };
    const fund = await fundService.createFund(fundParams);

    return res.status(201).json({
      status: 'success',
      message: 'Fund Application created Successfully',
      data: fund,
    });
  }

  static async fetchAll(req, res) {
    const funds = await fundService.fetchAll(req);

    return res.status(201).json({
      status: 'success',
      message: 'Funds Fetched Successfully',
      data: funds,
    });
  }

  static async fetchOne(req, res) {
    const funds = await fundService.fetchOne({ _id: req.params.id });

    return res.status(201).json({
      status: 'success',
      message: 'Fund Fetched Successfully',
      data: funds,
    });
  }
}

module.exports = LoadController;
