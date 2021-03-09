const userService = require('../../Services/User');
const investorService = require('../../Services/Investor');
const couponService = require('../../Services/Coupon');
const stashService = require('../../Services/Stash');
const savingService = require('../../Services/Saving');
const transferService = require('../../Services/Transfer');
const transactionService = require('../../Services/Transaction');
const referralService = require('../../Services/Referral');
const partials = require('../../Helpers/Partials');
const Email = require('../../utils/email');

class LoadController {
  static async create(req, res) {
    req.body.type = 'email';
    req.body.role = 'investor';
    req.body.amount = 0.0;

    req.body.slug =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    req.user = await userService.createUser(req.body);
    req.investor = await investorService.createInvestor(req);
    /**
     * @param {{coupon:string}} req.body
     */
    if (req.body.coupon !== undefined) {
      const couponParams = {
        code: req.body.coupon,
      };
      req.body.amount += parseInt(await couponService.verify(couponParams), 10);
    }
    /**
     * @param {{referral:string}} req.body
     */
    if (req.body.referral !== undefined) {
      const getUserParams = {
        slug: req.body.referral,
      };
      /**
       * @param {{REFERRAL_AMOUNT:string}} process.env
       */
      const getUser = await userService.getUser(getUserParams);

      if (getUser !== null) {
        const createReferral = {
          type: 'investor',
          investor: {
            referer: getUser,
            user: req.user,
            amount: parseInt(process.env.REFERRAL_AMOUNT, 10),
            hasSignUp: true,
          },
        };

        await referralService.create(createReferral);
        const getRefInv = await investorService.getOne({ user: getUser._id });
        if (getRefInv !== null) {
          const getRefStash = await stashService.getOne(getRefInv.investor);

          getRefStash.total_balance =
            parseInt(getRefStash.total_balance, 10) +
            parseInt(process.env.REFERRAL_AMOUNT, 10);

          getRefStash.available_balance =
            parseInt(getRefStash.available_balance, 10) +
            parseInt(process.env.REFERRAL_AMOUNT, 10);

          await getRefStash.save();
        }
      }
    }

    const stashParams = {
      investor: req.investor,
      amount: req.body.amount,
    };
    req.investor.stash = await stashService.create(stashParams);
    const url = `${req.protocol}://${req.get('host')}/api/v1/verify/${
      req.body.slug
    }`;
    await new Email(req.user, url).investor();

    return userService.createSendToken(req.user, 201, res);
  }

  static async getStashDetails(req, res) {
    const stash = await stashService.getOne({ investor: req.investor });

    let totalBalance = stash.total_balance;

    const transactions = await transactionService.getAll(req, {
      user: req.user,
    });

    const savings = await savingService.getAll(req, { user: req.user });

    let creditAmount = 0.0;
    let debitAmount = 0.0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].status === 'success') {
        if (transactions[i].type === 'credit') {
          creditAmount += transactions[i].amount;
        } else {
          debitAmount += transactions[i].amount;
        }
      }
    }

    let cred = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < savings.length; i++) {
      if (savings[i].active === true) {
        let monthsPaid;
        if (savings[i].interval.period === 'weekly') {
          const roi =
            (partials.getSavingsInterest(
              Math.floor(savings[i].interval.periodLength / 4)
            ) /
              100) *
            ((savings[i].interval.periodLength / 4) * savings[i].amount);

          monthsPaid = roi / savings[i].interval.periodLength / 4;
        } else if (savings[i].interval.period === 'monthly') {
          const roi =
            (partials.getSavingsInterest(savings[i].interval.periodLength) /
              100) *
            (savings[i].interval.periodLength * savings[i].amount);

          monthsPaid = roi / savings[i].interval.periodLength;
        } else {
          const roi =
            (partials.getSavingsInterest(
              Math.floor(savings[i].interval.periodLength / 30)
            ) /
              100) *
            (Math.floor(savings[i].interval.periodLength / 30) *
              savings[i].amount);

          monthsPaid = roi / savings[i].interval.periodLength / 30;
        }
        cred +=
          monthsPaid * savings[i].interval.periodPaid +
          savings[i].amount * savings[i].interval.periodPaid;
      }
    }
    totalBalance += cred;

    const transfers = await transferService.getAll(req, {
      investor: req.investor,
    });
    const data = {
      total_balance: totalBalance,
      available_balance: stash.available_balance,
      tranX: { credit: creditAmount, debit: debitAmount },
      transactions: transactions,
      savings: savings,
      transfers: transfers,
    };
    return res.status(201).json({
      message: 'Stash Details Retrieved successfully',
      status: 'success',
      data: data,
    });
  }
}

module.exports = LoadController;
