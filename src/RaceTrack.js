export class RaceTrack {
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
    return progress.map(
      ({ name, distance }) => `${name} : ${"- ".repeat(distance)}`
    );
  }

  #renderExecutionResult() {
    const executionResult = this.#formatRaceProgress();
    this.#output.printExecutionResult(executionResult);
  }

  #renderWinner() {
    const winner = this.#race.determineWinner().join(", ");
    this.#output.printWinner(winner);
  }

  async race() {
    const inputCarNames = this.#input.readCarNames();
    const inputRaceLaps = this.#input.readRaceLaps();

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
