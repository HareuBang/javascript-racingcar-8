import { CAR_NAME_ERRORS } from "./constants/errorMessage";
class Car {
  #name;
  #distance;

  constructor(name) {
    this.#validateName(name);

    this.#name = name;
    this.#distance = 0;
  }

  #validateName(name) {
    if (typeof name !== "string") throw new Error(CAR_NAME_ERRORS.NOT_STRING);
    if (name.length === 0 || /\s{5}/.test(name))
      throw new Error(CAR_NAME_ERRORS.NOT_EMPTY);
    if (!(name.length <= 5))
      throw new Error(CAR_NAME_ERRORS.NOT_MAX_LENGTH_FIVE);
  }

  forward() {
    this.#distance += 1;
  }

  getName() {
    return this.#name;
  }

  getDistance() {
    return this.#distance;
  }
}

export default Car;
