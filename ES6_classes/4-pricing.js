import Currency from "./3-currency.js"

export default class Pricing {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  // --- Amount ---
  get amount() {
    return this._amount;
  }
  set amount(value) {
    if (typeof value !== "number") {
      throw new TypeError("Amount must be a number");
    }
    this._amount = value;
  }

  // --- Currency ---
  get currency() {
    return this._currency;
  }
  set currency(value) {
    if (!(value instanceof Currency)) {
      throw new TypeError("Currency must be a number");
    }
    this._currency = value;
  }

  displayFullPrice() {
    return `${this._amount} ${this._currency._name} (${this._currency._code})`;
  }

  static convertPrice(amount, conversionRate) {
    return (amount * conversionRate);
  }

}
