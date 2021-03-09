const savingService = require('../../Services/Saving');
const transactionService = require('../../Services/Transaction');
const investorService = require('../../Services/Investor');
const AppError = require('../../utils/appError');
const Payment = require('../../Helpers/Payment');
const { getSavingsInterest } = require('../../Helpers/Partials');

class LoadController {
  static async create(req, res, next) {
    // ---  start level1  ---
    /*
     * 1.a) Initialize Payment and Verify Reference
     * 1.b) Get Investor
     * */
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
    // ---  end level1  ---

    // ---  start level2  ---
    /*
     * 2.) Create Transaction
     * */
    const amount = verified.data.amount / 100;
    const transactionParams = {
      user: req.user,
      investor: investor,
      amount: amount,
      type: 'credit',
      location: 'saving',
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
    // ---  end level2  ---

    // ---  start level3  ---
    /*
     * 3.a) Credit Investors Stash
     * 3.b) Create Plan for savings
     * 3.c) Create Subscription for savings
     * */

    const planParams = {
      name: verified.data.metadata.custom_fields[0].name,
      amount: amount * 100,
      interval: verified.data.metadata.custom_fields[0].period,
    };
    const createPlan = await payment.plan(planParams);

    /**
     * @param {{plan_code:string}} createPlan.data
     */
    if (createPlan.status === false) {
      return next(new AppError(createPlan.message, 404));
    }

    const subscriptionParams = {
      customer: req.user.email,
      plan: createPlan.data.plan_code,
    };

    const createSubscription = await payment.subscription(subscriptionParams);

    /**
     * @param {{plan_code:string}} createPlan.data
     */
    if (createSubscription.status === false) {
      return next(new AppError(createSubscription.message, 404));
    }
    // ---  end level3  ---

    // ---  start level4  ---
    /*
     *  4.a) calculate return on savings
     *  4.a) calculate when next payment is due
     * */
    let periodLength = 0;
    let nextPayment = null;
    const currentTime = new Date();
    const projectedTime = new Date();
    const projected = new Date(
      projectedTime.setMonth(
        projectedTime.getMonth() +
          verified.data.metadata.custom_fields[0].periodLength
      )
    );

    const diffTime = Math.abs(projected - currentTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeekly = Math.ceil(diffDays / 7);
    const returnsAmount =
      (getSavingsInterest(
        verified.data.metadata.custom_fields[0].periodLength
      ) /
        100) *
      (amount * verified.data.metadata.custom_fields[0].periodLength);

    if (verified.data.metadata.custom_fields[0].period === 'weekly') {
      periodLength = diffWeekly;
      nextPayment = new Date(currentTime.setDate(currentTime.getDate() + 7));
    } else if (verified.data.metadata.custom_fields[0].period === 'daily') {
      periodLength = diffDays;
      nextPayment = new Date(currentTime.setDate(currentTime.getDate() + 1));
    } else {
      // eslint-disable-next-line prefer-destructuring
      periodLength = verified.data.metadata.custom_fields[0].periodLength;
      nextPayment = new Date(currentTime.setMonth(currentTime.getMonth() + 1));
    }
    // ---  end level4  ---
    // ---  start level5  ---
    /*
     * 5.) Save savings in DB
     * */
    const savingsParams = {
      user: req.user,
      investor: investor,
      paystack: {
        plan_code: createPlan.data.plan_code,
        subscription_code: createSubscription.data.subscription_code,
        email_token: createSubscription.data.email_token,
      },
      name: verified.data.metadata.custom_fields[0].name,
      amount: amount,
      interval: {
        period: verified.data.metadata.custom_fields[0].period,
        periodLength: periodLength,
      },
      nextPayment: nextPayment,
      projectedReturn: returnsAmount,
    };

    const saving = await savingService.create(savingsParams);
    // ---  end level5  ---

    return res.status(201).json({
      status: 'success',
      message: 'Savings Successfully',
      data: saving,
    });
  }

  static async getStashInfo(req, res, next) {}
}

module.exports = LoadController;
