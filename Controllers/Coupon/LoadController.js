const couponService = require('../../Services/Coupon');

class LoadController {
  static async create(req, res) {
    const newCoupon = await couponService.create(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Coupon created successfully',
      data: {
        newCoupon,
      },
    });
  }

  static async getOne(req, res) {
    const result = await couponService.getOne({ code: req.params.id });

    return res.status(201).json({
      status: 'success',
      data: {
        result,
      },
    });
  }
}

module.exports = LoadController;
