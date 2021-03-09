const accountService = require('../../Services/Account');

class LoadController {
  static async createBankDetails(req, res) {
    const bankParams = {
      user: req.user,
      bank: req.body.bank,
      bvn: req.body.bvn,
      account_number: req.body.account_number,
    };
    const banks = await accountService.createBankDetails(bankParams);

    return res.status(201).json({
      status: 'success',
      message: 'Bank Details created Successfully',
      data: banks,
    });
  }

  static async updateBankDetails(req, res) {
    const bankParams = {
      user: req.user,
      bank: req.body.bank,
      bvn: req.body.bvn,
      account_number: req.body.account_number,
    };
    const banks = await accountService.updateBankDetails(bankParams);

    return res.status(201).json({
      status: 'success',
      message: 'Bank Details updated Successfully',
      data: banks,
    });
  }

  static async updateProfile(req, res) {
    const profileParams = {
      id: req.user,
      body: {
        phone: req.body.phone,
        name: req.body.name,
      },
    };
    const data = await accountService.updateProfile(profileParams);

    return res.status(201).json({
      message: 'Profile Updated successfully',
      status: 'success',
      data: data,
    });
  }
}

module.exports = LoadController;
