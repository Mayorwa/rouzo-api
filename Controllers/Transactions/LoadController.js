const Payment = require('../../Helpers/Payment');

class LoadController {
  static async initialize(req, res) {
    const payment = new Payment(req.body.gateway);
    const initializeParams = {
      amount: req.body.amount * 100,
      email: req.user.email,
    };
    const initializeData = await payment.initialize(initializeParams);
    return res.status(201).json({
      status: 'success',
      message: 'Transaction Initialized Successfully',
      data: initializeData,
    });
  }
}

module.exports = LoadController;
