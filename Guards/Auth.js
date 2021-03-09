const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const userService = require('../Services/User');
const investorService = require('../Services/Investor');
const businessService = require('../Services/Business');

class AuthGuard {
  static async protect(req, res, next) {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    /**
     * @param {{JWT_SECRET:string}} process.env
     */
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await userService.getUser({ _id: decoded.id });
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  }

  static guest(req, res, next) {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      return next(new AppError('You have no permission here', 403));
    }

    next();
  }

  static async isInvestor(req, res, next) {
    if (req.user.role !== 'investor') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    const getInvestor = await investorService.getOne({ user: req.user });

    if (!getInvestor) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    req.investor = getInvestor;
    next();
  }

  static async isBusiness(req, res, next) {
    if (req.user.role !== 'business') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    const getBusiness = await businessService.getOne({ user: req.user });

    if (!getBusiness) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    req.business = getBusiness;
    next();
  }
}

module.exports = AuthGuard;
