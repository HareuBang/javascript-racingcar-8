import Car from "./Car";
import { CAR } from "./constants/constants";
export class CarFactory {
  static #createCar(name) {
    return new Car(name);
  }

  static create(type = CAR.DEFAULT_TYPE) {
    const carType = {
      normal: this.#createCar(),
    };

    return carType[type];
  }
}
