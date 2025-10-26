import validateInputString from "../validators/validateInputString.js";
import { VALID_TYPE, LAPS, SUBJECT, CAR } from "../constants/constants.js";
import { LAPS_ERROR } from "../constants/errorMessage.js";
import randomPickNumber from "../utils/randomPickNumber.js";

class Race {
  #participateCars;
  #laps;
  #onCarFactory;
  #onRandomPickNumber;

  constructor(onCarFactory, onRandomPickNumber = randomPickNumber) {
    this.#onCarFactory = onCarFactory;
    this.#onRandomPickNumber = onRandomPickNumber;
  }

  #validateInputLaps(inputLaps) {
    const isInputLapsType =
      typeof inputLaps !== VALID_TYPE.NUMBER &&
      typeof inputLaps !== VALID_TYPE.STRING;

    if (
      isInputLapsType ||
      !Number.isFinite(Number(inputLaps)) // NaN, Infinity, -Infinity 검증
    ) {
      throw new Error(LAPS_ERROR.NOT_NUMBER);
    }

    if (
      Number(inputLaps) < LAPS.MIN_NUMBER_ONE ||
      !Number.isInteger(Number(inputLaps)) // 소수점 검증
    )
      throw new Error(LAPS_ERROR.NOT_POSITIVE_NUMBER);
  }

  #prepareCars(inputCarNames) {
    return inputCarNames
      .split(CAR.NAME.SEPARATOR)
      .map((carName) => this.#onCarFactory(carName));
  }

  prepare(inputCarNames, inputLaps) {
    validateInputString(inputCarNames, SUBJECT.CAR_NAMES);
    this.#participateCars = this.#prepareCars(inputCarNames);

    this.#validateInputLaps(inputLaps);
    this.#laps = Number(inputLaps);
  }

  runNextLaps() {
    this.#laps -= LAPS.DECREASE_ONE;

    return this.#laps >= LAPS.LAST_CONTINUE_ZERO;
  }

  runLap() {
    this.#participateCars.forEach((car) => {
      if (this.#onRandomPickNumber() >= CAR.FORWARD_MIN_NUMBER_FOUR)
        car.forward();
    });
  }

  getRaceProgress() {
    return this.#participateCars.map((car) => ({
      name: car.getName(),
      distance: car.getDistance(),
    }));
  }

  determineWinner() {
    const carDistances = this.#participateCars.map((car) => car.getDistance());
    const farthestDistance = Math.max(...carDistances);

    return this.#participateCars.reduce((winners, car) => {
      if (car.getDistance() === farthestDistance) winners.push(car.getName());
      return winners;
    }, []);
  }
}

export default Race;
