const crypto = require('crypto');
const AppError = require('../../utils/appError');
const Email = require('../../utils/email');
const userService = require('../../Services/User');
const investorService = require('../../Services/Investor');
const adminService = require('../../Services/Admin');

class LoadController {
  static getMe(req, res, next) {
    req.params.id = req.user._id;
    next();
  }

  static async getUser(req, res) {
    const data = { user: null, investor: null, admin: null };
    data.user = await userService.getUser({ _id: req.params.id });
    if (data.user.role === 'investor') {
      data.investor = await investorService.getOne({ user: data.user });
    } else if (data.user.role === 'admin') {
      data.admin = await adminService.getOne({ user: data.user });
    }
    return res.status(201).json({
      message: 'User Retrieved successfully',
      status: 'success',
      data: data,
    });
  }

  static async signUp(req, res) {
    req.body.type = 'email';
    req.body.slug =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const newUser = await userService.createUser(req.body);

    const url = `${req.protocol}://${req.get('host')}/api/v1/verify/${
      req.body.slug
    }`;
    await new Email(newUser, url).investor();

    return userService.createSendToken(newUser, 201, res);
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await userService.getUser({ email }, true);

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    return userService.createSendToken(user, 200, res);
  }

  static async forgotPassword(req, res, next) {
    // 1) Get user based on POSTed email
    const user = await userService.getUser({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  }

  static async resetPassword(req, res, next) {
    // 1) Get user based on the token
    /**
     * @param {{token:string}} req.params
     */
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await userService.getUser({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    return userService.createSendToken(user, 200, res);
  }

  static async updatePassword(req, res, next) {
    // 1) Get user from collection
    const user = await userService.getUser({ _id: req.auth.id }, true);

    /**
     * @param {{passwordCurrent:string}} req.body
     */
    // 2) Check if POSTed current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    return userService.createSendToken(user, 200, res);
  }

  static logout(req, res) {
    res.cookie('jwt', 'loggedOut', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  }

  static async verify(req, res, next) {
    const ver = userService.verify(req.params.token);

    if (!ver) {
      return next(new AppError('This user does not exist', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'User account has been verified!',
    });
  }
}

module.exports = LoadController;
