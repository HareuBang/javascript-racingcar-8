import Car from "./Car.js";
import { CAR } from "./constants/constants.js";

class CarFactory {
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

export default CarFactory;
