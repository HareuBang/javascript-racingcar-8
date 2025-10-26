import validateInputString from "./validators/validateInputString.js";
import { CAR } from "./constants/constants.js";
import { CAR_NAME_ERRORS } from "./constants/errorMessage.js";

class Car {
  #name;
  #distance;

  constructor(name) {
    this.#validateName(name);

    this.#name = name;
    this.#distance = CAR.DISTANCE.INITIAL_ZERO;
  }

  #validateName(name) {
    validateInputString(name);

    if (!(name.length <= CAR.NAME.MAX_LENGTH_FIVE))
      throw new Error(CAR_NAME_ERRORS.NOT_MAX_LENGTH_FIVE);
  }

  forward() {
    this.#distance += CAR.DISTANCE.INCREMENT_ONE;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}

export default Car;
