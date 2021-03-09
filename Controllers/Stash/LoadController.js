const stashService = require('../../Services/Stash');
const transactionService = require('../../Services/Transaction');
const investorService = require('../../Services/Investor');
const AppError = require('../../utils/appError');
const Payment = require('../../Helpers/Payment');

class LoadController {
  static async credit(req, res, next) {
    const payment = new Payment(req.body.gateway);
    const verified = await payment.verify(req.body.reference);
    /**
     * @param {{gateway_response:string}} verified.data
     */
    if (verified.status === false) {
      return next(new AppError(verified.message, 404));
    }
    const investor = await investorService.getOne({ user: req.user });

    if (investor === null) {
      return next(new AppError('Investor Not Found!', 404));
    }
    const amount = verified.data.amount / 100;
    const transactionParams = {
      user: req.user,
      investor: investor,
      amount: amount,
      type: 'credit',
      location: 'stash',
      message: verified.data.gateway_response,
      status: verified.data.status,
      reference: verified.data.reference,
    };

    await transactionService.create(transactionParams);
    if (verified.data.status !== 'success') {
      return next(new AppError(verified.data.gateway_response, 400));
    }
    /**
     * @param {{customer_code:string}} verified.data.customer
     */
    const stashParams = {
      investor: investor,
      amount: amount,
      customerId: verified.data.customer.customer_code,
    };

    const stash = await stashService.credit(stashParams);
    return res.status(201).json({
      status: 'success',
      message: 'Stash Credited Successfully',
      data: stash,
    });
  }
}

module.exports = LoadController;
