import {
  FORMAT_RACE_PROGRESS,
  WINNER_SEPARATOR,
} from "./constants/constants.js";
import { ERROR_PREFIX } from "./constants/errorMessage.js";

class RaceTrack {
  #input;
  #race;
  #output;

  constructor(input, race, output) {
    this.#input = input;
    this.#race = race;
    this.#output = output;
  }

  #formatRaceProgress() {
    const progress = this.#race.getRaceProgress();
    const { NAME_DISTANCE_SEPARATOR, DISTANCE_MARK, NEWLINE_SEPARATOR } =
      FORMAT_RACE_PROGRESS;

    return progress
      .map(
        ({ name, distance }) =>
          `${name} ${NAME_DISTANCE_SEPARATOR} ${DISTANCE_MARK.repeat(distance)}`
      )
      .join(NEWLINE_SEPARATOR);
  }

  #renderExecutionResult() {
    const executionResult = this.#formatRaceProgress();
    this.#output.printExecutionResult(executionResult);
  }

  async #setupRace() {
    const inputCarNames = await this.#input.readCarNames();
    const inputRaceLaps = await this.#input.readRaceLaps();

    this.#race.prepare(inputCarNames, inputRaceLaps);
  }

  #runLaps() {
    // 실행 환경에서만 "실행 결과" 출력
    if (process.env.NODE_ENV !== "test") this.#output.printScoreBoard();

    while (this.#race.runNextLaps()) {
      this.#race.runLap();
      this.#renderExecutionResult();
    }
  }

  #renderWinner() {
    const winner = this.#race.determineWinner().join(WINNER_SEPARATOR);
    this.#output.printWinner(winner);
  }

  async race() {
    try {
      await this.#setupRace();
    } catch (error) {
      const errorMessage = ERROR_PREFIX + error.message;
      this.#output.printError(errorMessage);

      throw new Error(errorMessage);
    }

    this.#runLaps();
    this.#renderWinner();
  }
}

export default RaceTrack;
