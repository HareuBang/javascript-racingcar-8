import { CAR_NAME_ERRORS } from "./constants/errorMessage";
import { CAR } from "./constants/carConstants";
class Car {
  #name;
  #distance;

  constructor(name) {
    this.#validateName(name);

    this.#name = name;
    this.#distance = CAR.INITIAL_DISTANCE_ZERO;
  }

  #validateName(name) {
    if (typeof name !== CAR.NAME_TYPE_STRING)
      throw new Error(CAR_NAME_ERRORS.NOT_STRING);
    // 빈 문자열 또는 공백만 있는 경우
    if (name.length === CAR.NAME_EMPTY || CAR.NAME_ALL_SPACE_REGEXP.test(name))
      throw new Error(CAR_NAME_ERRORS.NOT_EMPTY);
    if (!(name.length <= CAR.NAME_MAX_LENGTH_FIVE))
      throw new Error(CAR_NAME_ERRORS.NOT_MAX_LENGTH_FIVE);
  }

  forward() {
    this.#distance += CAR.DISTANCE_INCREMENT_ONE;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}

export default Car;
