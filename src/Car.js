import validateInputString from "./validators/validateInputString";
import { CAR_DISTANCE, CAR_NAME } from "./constants/constants";
import { CAR_NAME_ERRORS } from "./constants/errorMessage";
class Car {
  #name;
  #distance;

  constructor(name) {
    this.#validateName(name);

    this.#name = name;
    this.#distance = CAR_DISTANCE.INITIAL_ZERO;
  }

  #validateName(name) {
    validateInputString(name);

    if (!(name.length <= CAR_NAME.MAX_LENGTH_FIVE))
      throw new Error(CAR_NAME_ERRORS.NOT_MAX_LENGTH_FIVE);
  }

  forward() {
    this.#distance += CAR_DISTANCE.INCREMENT_ONE;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}

export default Car;
