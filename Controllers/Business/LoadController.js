const userService = require('../../Services/User');
const businessService = require('../../Services/Business');
const eligibilityService = require('../../Services/Eligibility');
const Email = require('../../utils/email');

class LoadController {
  static async create(req, res) {
    req.body.type = 'email';
    req.body.role = 'business';

    req.body.slug =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    req.user = await userService.createUser(req.body);

    const eligibilityParams = {
      registrationStatus: req.body.registration_status,
      yearsOfRunning: req.body.years_of_running,
      lastBusinessRevenue: req.body.last_business_revenue,
      accountVerifiable: req.body.account_verifiable,
    };

    req.scoreParams = eligibilityService.score(eligibilityParams);

    req.business = await businessService.createBusiness(req);

    const saveEligibility = {
      business: req.business,
      registration_status: req.scoreParams.registrationStatus,
      years_of_running: req.scoreParams.yearsOfRunning,
      last_business_revenue: req.scoreParams.lastBusinessRevenue,
      account_verifiable: req.scoreParams.accountVerifiable,
      score: req.scoreParams.score,
    };

    req.eligibility = eligibilityService.create(saveEligibility);
    const url = `${req.protocol}://${req.get('host')}/api/v1/verify/${
      req.body.slug
    }`;
    await new Email(req.user, url).business();

    return userService.createSendToken(req.user, 201, res);
  }
}

module.exports = LoadController;
