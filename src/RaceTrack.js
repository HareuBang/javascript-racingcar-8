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
    const { NAME_DISTANCE_SEPARATOR, DISTANCE_MARK } = FORMAT_RACE_PROGRESS;

    return progress
      .map(
        ({ name, distance }) =>
          `${name} ${NAME_DISTANCE_SEPARATOR} ${DISTANCE_MARK.repeat(distance)}`
      )
      .join("\n");
  }

  #renderExecutionResult() {
    const executionResult = this.#formatRaceProgress();
    this.#output.printExecutionResult(executionResult);
  }

  #renderWinner() {
    const winner = this.#race.determineWinner().join(WINNER_SEPARATOR);
    this.#output.printWinner(winner);
  }

  async race() {
    const inputCarNames = await this.#input.readCarNames();
    const inputRaceLaps = await this.#input.readRaceLaps();

    try {
      this.#race.prepare(inputCarNames, inputRaceLaps);
    } catch (error) {
      const errorMessage = ERROR_PREFIX + error.message;
      this.#output.printError(errorMessage);
      throw new Error(errorMessage);
    }

    // this.#output.printScoreBoard();
    while (this.#race.runNextLaps()) {
      this.#race.start();
      this.#renderExecutionResult();
    }

    this.#renderWinner();
  }
}

export default RaceTrack;
