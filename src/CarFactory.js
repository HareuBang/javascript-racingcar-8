import Car from "./Car";
export class CarFactory {
  static #createCar(name) {
    return new Car(name);
  }

  static create(type = "normal") {
    const carType = {
      normal: this.#createCar(),
    };

    return carType[type];
  }
}
