const preferenceService = require('../../Services/Preference');

class LoadController {
  static async create(req, res) {
    const newPreference = await preferenceService.createPreference(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Preference created successfully',
      data: {
        newPreference,
      },
    });
  }
}
module.exports = LoadController;
