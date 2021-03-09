const bankService = require('../../Services/Bank');

class LoadController {
  static async create(req, res) {
    const data = await bankService.create(req.body);

    return res.status(201).json({
      message: 'Bank Created successfully',
      status: 'success',
      data: data,
    });
  }

  static async getAll(req, res) {
    const banks = await bankService.getAll(req, {});

    return res.status(201).json({
      status: 'success',
      message: 'Banks Fetched Successfully',
      data: banks,
    });
  }

  static async getOne(req, res) {
    const bank = await bankService.getOne({ _id: req.params.id });

    return res.status(201).json({
      status: 'success',
      message: 'Bank Fetched Successfully',
      data: bank,
    });
  }
}

module.exports = LoadController;
