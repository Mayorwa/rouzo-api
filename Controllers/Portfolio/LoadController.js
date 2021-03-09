const portfolioService = require('../../Services/Portfolio');
const loanRatesService = require('../../Services/loanRates');

class LoadController {
  static async create(req, res) {
    // ---  start level1  ---
    /*
     * 1.a) create portfolio slug
     * 1.b) save portfolio details
     * */

    const slug =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const portfolioParams = {
      name: req.body.name,
      description: req.body.description,
      returnInPer: req.body.returnInPer,
      trustee: req.body.trustee,
      riskLevel: req.body.riskLevel,
      size: req.body.size,
      sizeRemaining: req.body.size,
      unique_code: slug,
      amountPerUnit: req.body.amountPerUnit,
      managementFee: req.body.managementFee,
      isOpen: req.body.status,
    };
    // ---  end level1  ---
    const portfolio = await portfolioService.create(portfolioParams);

    // ---  start level2  ---
    /*
     * 1.a) create loanRates params
     * 1.b) save LoanRates details
     * */

    const loanRatesParams = {
      portfolio: portfolio,
      three: req.body.three,
      six: req.body.six,
      nine: req.body.nine,
      twelve: req.body.twelve,
    };

    // ---  end level2  ---
    await loanRatesService.create(loanRatesParams);

    return res.status(201).json({
      status: 'success',
      message: 'Portfolio Created Successfully',
      data: portfolio,
    });
  }

  static async getAll(req, res) {
    const portfolios = await portfolioService.getAll(req, {});

    return res.status(201).json({
      status: 'success',
      message: 'Portfolios Fetched Successfully',
      data: portfolios,
    });
  }

  static async getOne(req, res) {
    const portfolio = await portfolioService.getOne({ _id: req.params.id });

    return res.status(201).json({
      status: 'success',
      message: 'Portfolio Fetched Successfully',
      data: portfolio,
    });
  }

  static async getAllRate(req, res) {
    const rates = await loanRatesService.getAll(req, {});

    return res.status(201).json({
      status: 'success',
      message: 'Loan Rates Fetched Successfully',
      data: rates,
    });
  }

  static async getOneRate(req, res) {
    const rate = await loanRatesService.getOne({ portfolio: req.params.id });

    return res.status(201).json({
      status: 'success',
      message: 'Loan Rate Fetched Successfully',
      data: rate,
    });
  }
}

module.exports = LoadController;
