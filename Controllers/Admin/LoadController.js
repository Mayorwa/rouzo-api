const adminService = require('../../Services/Admin');
const userService = require('../../Services/User');

class LoadController {
  static async create(req, res) {
    req.body.type = 'email';
    req.body.role = 'admin';

    const newUser = await userService.createUser(req.body);

    req.user = newUser;

    /**
     * @param {{adminRole:string}} req.body
     */

    req.body.role = req.body.adminRole;
    await adminService.createAdmin(req);

    return userService.createSendToken(newUser, 201, res);
  }

  static async getOne(req, res) {
    const result = await adminService.getOne(req.params.id, false, {
      path: 'user',
    });

    return res.status(201).json({
      status: 'success',
      data: {
        result,
      },
    });
  }

  static async getMe(req, res) {
    const result = await adminService.getOne(req.user.id, true, {
      path: 'user',
    });

    return res.status(201).json({
      status: 'success',
      data: {
        result,
      },
    });
  }
}

module.exports = LoadController;
