const Preference = require('../Models/Preference');

class PreferenceService {
  static async createPreference(req) {
    return await Preference.create({
      name: req.name,
      description: req.description,
    });
  }
}

module.exports = PreferenceService;
