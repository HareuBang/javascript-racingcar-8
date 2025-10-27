import Car from "./Car.js";
import { CAR } from "../constants/constants.js";

export default class CarFactory {
  static #createCar(name) {
    return new Car(name);
  }

  static create(name, type = CAR.DEFAULT_TYPE) {
    const carType = {
      normal: CarFactory.#createCar,
    };

    return carType[type](name);
  }
}
