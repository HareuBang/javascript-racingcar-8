import { validateInputString } from "./validators/validateInputString";
import { CAR_NAME, VALID_TYPE, LAPS, SUBJECT } from "./constants/constants";
import { LAPS_ERROR } from "./constants/errorMessage";
export class Race {
  #participateCars;
  #laps;
  #onCarFactory;

  constructor(onCarFactory) {
    this.#onCarFactory = onCarFactory;
  }

  #validateInputLaps(inputLaps) {
    if (
      (typeof inputLaps !== VALID_TYPE.NUMBER &&
        typeof inputLaps !== VALID_TYPE.STRING) ||
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
      .split(CAR_NAME.SEPARATOR)
      .map((carName) => this.#onCarFactory(carName));
  }

  prepare(inputCarNames, inputLaps) {
    validateInputString(inputCarNames, SUBJECT.CAR_NAMES);
    this.#validateInputLaps(inputLaps);

    this.#participateCars = this.#prepareCars(inputCarNames);
    this.#laps = Number(inputLaps);
  }
}
