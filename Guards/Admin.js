const AppError = require('../utils/appError');
const adminService = require('../Services/Admin');

class AdminGuard {
  static async isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    const getAdmin = await adminService.getOne(req.user.id, true);

    if (!getAdmin) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    req.admin = getAdmin;
    next();
  }

  static isSuper(req, res, next) {
    if (req.admin.role !== 'super-admin') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  }

  static isLevel4(req, res, next) {
    if (req.admin.role !== 'level-4') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  }

  static isLevel3(req, res, next) {
    if (req.admin.role !== 'level-3') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  }

  static isLevel2(req, res, next) {
    if (req.admin.role !== 'level-2') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  }

  static isLevel1(req, res, next) {
    if (req.admin.role !== 'level-1') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  }

  static isLevel0(req, res, next) {
    if (req.admin.role !== 'level-0') {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  }
}

module.exports = AdminGuard;
