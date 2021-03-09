const Account = require('../Models/Account');
const User = require('../Models/User');

class AccountService {
  static async createBankDetails(req) {
    return await Account.create({
      user: req.user,
      bank: req.bank,
      bvn: req.bvn,
      account_number: req.account_number,
    });
  }

  static async updateBankDetails(params) {
    return await Account.findOneAndUpdate({ user: params.user }, params.body, {
      new: true,
      runValidators: true,
    });
  }

  static async updateProfile(params) {
    return await User.findByIdAndUpdate(params.id, params.body, {
      new: true,
      runValidators: true,
    });
  }
}

module.exports = AccountService;
