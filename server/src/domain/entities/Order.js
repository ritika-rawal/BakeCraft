class Order {
  constructor({ user, cake, delivery, payment, pricing }) {
    this.user = user;
    this.cake = cake;
    this.delivery = delivery;
    this.payment = payment;
    this.pricing = pricing;
    this.status = 'pending';
  }
}

module.exports = Order;