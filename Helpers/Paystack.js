/**
 * @param {{PAYSTACK_SECRET_KEY:string}} process.env
 */
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

class Paystack {
  static async initialize({ amount, email }) {
    let initializeData = null;

    await paystack.transaction
      .initialize({
        amount: amount,
        email: email,
      })
      .then(function (response) {
        initializeData = response;
      })
      .catch(function (error) {
        initializeData = error;
      });
    return initializeData;
  }

  static async verify(reference) {
    let verifyData = null;
    await paystack.transaction
      .verify(reference)
      .then(function (response) {
        verifyData = response;
      })
      .catch(function (error) {
        verifyData = error;
      });
    return verifyData;
  }

  static async createPlan({ name, amount, interval }) {
    let planData = null;
    await paystack.plan
      .create({
        name: name,
        amount: amount,
        interval: interval,
      })
      .then(function (response) {
        planData = response;
      })
      .catch(function (error) {
        planData = error;
      });
    return planData;
  }

  static async createSubscription({ customer, plan }) {
    let subscriptionData = null;
    await paystack.subscription
      .create({
        customer: customer,
        plan: plan,
      })
      .then(function (response) {
        subscriptionData = response;
      })
      .catch(function (error) {
        subscriptionData = error;
      });
    return subscriptionData;
  }
}

module.exports = Paystack;
