const {
  initialize,
  verify,
  createPlan,
  createSubscription,
} = require('./Paystack');

class Payment {
  constructor(gateway) {
    this.gateway = gateway;
  }

  async initialize({ amount, email }) {
    let initializeData = null;
    if (this.gateway === 'paystack') {
      initializeData = await initialize({ amount, email });
    } else {
      initializeData = await initialize({ amount, email });
    }
    return initializeData;
  }

  async verify(reference) {
    let verifyData = null;
    if (this.gateway === 'paystack') {
      verifyData = await verify(reference);
    } else {
      verifyData = await verify(reference);
    }
    return verifyData;
  }

  async plan({ name, amount, interval }) {
    let planData = null;
    if (this.gateway === 'paystack') {
      planData = await createPlan({ name, amount, interval });
    } else {
      planData = await createPlan({ name, amount, interval });
    }
    return planData;
  }

  async subscription({ customer, plan }) {
    let subscriptionData = null;
    if (this.gateway === 'paystack') {
      subscriptionData = await createSubscription({ customer, plan });
    } else {
      subscriptionData = await createSubscription({ customer, plan });
    }
    return subscriptionData;
  }
}

module.exports = Payment;
