export class Race {
  #participateCars;
  #laps;
  #onCarFactory;

  constructor(onCarFactory) {
    this.#onCarFactory = onCarFactory;
  }

  #validCarNames(inputCarNames) {
    if (typeof inputCarNames !== "string")
      throw new Error("자동차 이름들은 문자열로만 입력 가능합니다.");
    if (inputCarNames.trim().length === 0)
      throw new Error("자동차 이름은 최소 1글자 이상만 가능합니다.");
  }

  #validLaps(inputLaps) {
    if (
      inputLaps === null ||
      inputLaps === undefined ||
      inputLaps === "" ||
      typeof inputLaps === "boolean" ||
      typeof inputLaps !== "string" ||
      !Number.isFinite(Number(inputLaps)) // NaN, Infinity, -Infinity 검증
    ) {
      throw new Error("시도할 횟수는 숫자만 입력 가능합니다.");
    }

    if (Number(inputLaps) < 1)
      throw new Error("시도할 횟수는 양수만 입력 가능합니다.");
  }

  #prepareCars(inputCarNames) {
    return inputCarNames
      .split(",")
      .map((carName) => this.#onCarFactory(carName));
  }

  prepare(inputCarNames, inputLaps) {
    this.#validCarNames(inputCarNames);
    this.#validLaps(inputLaps);

    this.#participateCars = this.#prepareCars(inputCarNames);
    this.#laps = Number(inputLaps);
  }
}
