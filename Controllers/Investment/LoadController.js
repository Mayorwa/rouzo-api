const investmentService = require('../../Services/Investment');
const stashService = require('../../Services/Stash');
const transactionService = require('../../Services/Transaction');
const investorService = require('../../Services/Investor');
const portfolioService = require('../../Services/Portfolio');
const partials = require('../../Helpers/Partials');
const AppError = require('../../utils/appError');
const Payment = require('../../Helpers/Payment');

class LoadController {
  static async create(req, res, next) {
    // ---  start level1  ---
    /*
     * 1.) validate investor, stash and portfolio existence
     * */
    const investor = await investorService.getOne({ user: req.user });

    if (investor === null) {
      return next(new AppError('Investor Not Found!', 404));
    }
    const portfolio = await portfolioService.getOne({
      _id: req.body.portfolio,
    });

    if (portfolio === null) {
      return next(new AppError('Portfolio Not Found!', 404));
    }

    const stash = await stashService.getOne({
      investor: investor,
    });

    if (stash === null) {
      return next(new AppError('Stash Not Found!', 404));
    }
    let investment;
    if (req.body.payment_method === 'stash') {
      let transactionParams;
      const calc =
        parseFloat(stash.available_balance) -
          1000 -
          parseFloat(req.body.amount) <
        0;
      const reference =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      if (calc) {
        transactionParams = {
          reference: reference,
          user: req.user,
          investor: investor,
          amount: req.body.amount,
          type: 'credit',
          location: 'investment',
          message: 'Transaction Failed',
          status: 'failed',
        };
      } else {
        transactionParams = {
          reference: reference,
          user: req.user,
          investor: investor,
          amount: req.body.amount,
          type: 'credit',
          location: 'investment',
          message: 'Transaction Successful',
          status: 'success',
        };
      }

      /*
       * 2.) Log transaction in DB
       * */

      await transactionService.create(transactionParams);
      if (calc) {
        return next(new AppError('Insufficient Funds', 400));
      }
      const unitsBought =
        parseFloat(req.body.amount) / parseFloat(portfolio.amountPerUnit);

      const roi =
        ((parseFloat(
          partials.getPortfolioInterest(
            portfolio.name,
            parseInt(req.body.period, 10)
          )
        ) -
          parseFloat(portfolio.managementFee)) /
          100) *
        parseFloat(req.body.amount);

      const investmentParams = {
        user: req.user,
        investor: investor,
        portfolio: portfolio,
        payment_method: 'stash',
        amount: req.body.amount,
        period: req.body.period,
        units_bought: unitsBought,
        roi: roi,
        date_purchased: new Date(),
      };
      portfolio.sizeRemaining -= parseFloat(req.body.amount);
      await portfolio.save();

      stash.total_balance -= parseFloat(req.body.amount);
      stash.available_balance -= parseFloat(req.body.amount);
      await stash.save();

      investment = await investmentService.create(investmentParams);
    } else {
      const payment = new Payment(req.body.gateway);
      const verified = await payment.verify(req.body.reference);
      /**
       * @param {{gateway_response:string}} verified.data
       */
      if (verified.status === false) {
        return next(new AppError(verified.message, 404));
      }

      const amount = parseFloat(verified.data.amount) / 100;

      const transactionParams = {
        user: req.user,
        investor: investor,
        amount: amount,
        type: 'credit',
        location: 'investment',
        message: verified.data.gateway_response,
        status: verified.data.status,
        reference: verified.data.reference,
      };

      await transactionService.create(transactionParams);
      if (verified.data.status !== 'success') {
        return next(new AppError(verified.data.gateway_response, 400));
      }
      const unitsBought = amount / parseFloat(portfolio.amountPerUnit);

      const roi =
        ((parseFloat(
          partials.getPortfolioInterest(
            portfolio.name,
            parseInt(verified.data.metadata.custom_fields[0].period, 10)
          )
        ) -
          parseFloat(portfolio.managementFee)) /
          100) *
        amount;

      const investmentParams = {
        user: req.user,
        investor: investor,
        portfolio: portfolio,
        payment_method: 'bank',
        amount: amount,
        period: verified.data.metadata.custom_fields[0].period,
        units_bought: unitsBought,
        roi: roi,
        date_purchased: new Date(),
      };
      portfolio.sizeRemaining -= amount;
      await portfolio.save();
      investment = await investmentService.create(investmentParams);
    }

    return res.status(201).json({
      status: 'success',
      message: 'Investment Created Successfully',
      data: investment,
    });
  }
}

module.exports = LoadController;
