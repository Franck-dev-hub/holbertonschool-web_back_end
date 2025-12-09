export default class Building {
  constructor(sqft) {
    if (typeof sqft !== "number") {
      throw TypeError("Sqft musft be a number");
    }

    if (this.constructor.name !== "Building" && typeof this.evacuationWarningMessage !== "function") {
      throw new Error("Class extending Building must override evacuationWarningMessage");
    }

    this._sqft = sqft;
  }

    get sqft() {
      return this._sqft;
    }
}
