const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/Error/LoadController');
const accountRouter = require('./Routes/Account');
const authRouter = require('./Routes/Auth');
const adminRouter = require('./Routes/Admin');
const bankRouter = require('./Routes/Bank');
const businessRouter = require('./Routes/Business');
const couponRouter = require('./Routes/Coupon');
const documentRouter = require('./Routes/Document');
const fundRouter = require('./Routes/Fund');
const guarantorRouter = require('./Routes/Guarantor');
const investmentRouter = require('./Routes/Investment');
const investorRouter = require('./Routes/Investor');
const preferenceRouter = require('./Routes/Preference');
const portfolioRouter = require('./Routes/Portfolio');
const stashRouter = require('./Routes/Stash');
const transactionsRouter = require('./Routes/Transactions');

const app = express();

app.enable('trust proxy');

app.use(
  cors({
    origin: 'http://localhost:9707',
  })
);

// 1) GLOBAL MIDDLEWARE
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['reference'],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1', authRouter);
app.use('/api/v1/account', accountRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/bank', bankRouter);
app.use('/api/v1/business', businessRouter);
app.use('/api/v1/coupon', couponRouter);
app.use('/api/v1/document', documentRouter);
app.use('/api/v1/fund', fundRouter);
app.use('/api/v1/guarantor', guarantorRouter);
app.use('/api/v1/stash', stashRouter);
app.use('/api/v1/preference', preferenceRouter);
app.use('/api/v1/portfolio', portfolioRouter);
app.use('/api/v1/investment', investmentRouter);
app.use('/api/v1/investor', investorRouter);
app.use('/api/v1/transaction', transactionsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
