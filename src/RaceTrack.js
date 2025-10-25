import {
  FORMAT_RACE_PROGRESS,
  WINNER_SEPARATOR,
} from "./constants/constants.js";
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

    return progress.reduce(
      (formattedString, { name, distance }) =>
        formattedString +
        `${name} ${NAME_DISTANCE_SEPARATOR} ${DISTANCE_MARK.repeat(
          distance
        )}${NEWLINE_SEPARATOR}`,
      ""
    );
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
      this.#output.printError(error.message);
      throw error;
    }

    this.#output.printScoreBoard();
    while (this.#race.runNextLaps()) {
      this.#race.start();
      this.#renderExecutionResult();
    }

    this.#renderWinner();
  }
}

export default RaceTrack;
