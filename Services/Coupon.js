const Coupon = require('../Models/Coupon');

class CouponService {
  static async create(req) {
    return await Coupon.create({
      code: req.code,
      amount: req.amount,
      expiry_date: req.expiry_date,
    });
  }

  static async getOne(params) {
    const query = await Coupon.findOne(params);
    return await query;
  }

  static async verify(req) {
    const getCoupon = await this.getOne({
      code: req.code,
      expiry_date: { $gt: Date.now() },
    });

    if (!getCoupon) {
      return 0.0;
    }

    return getCoupon.amount;
  }
}

module.exports = CouponService;
