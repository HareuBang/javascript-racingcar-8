class RaceTrack {
  #input;
  #race;
  #output;
  #format;

  constructor(input, race, output, format) {
    this.#input = input;
    this.#race = race;
    this.#output = output;
    this.#format = format;
  }

  #formatRaceProgress() {
    const progress = this.#race.getRaceProgress();

    return this.#format.raceProgress(progress);
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
    while (this.#race.runNextLaps()) {
      this.#race.runLap();
      this.#renderExecutionResult();
    }
  }

  #renderWinner() {
    const winner = this.#race.determineWinner();
    const formattedWinner = this.#format.winner(winner);
    this.#output.printWinner(formattedWinner);
  }

  async race() {
    try {
      await this.#setupRace();
    } catch (error) {
      const formattedErrorMessage = this.#format.errorMessage(error);
      this.#output.printError(formattedErrorMessage);

      throw new Error(formattedErrorMessage);
    }

    // 실행 환경에서만 "실행 결과" 제목(Title) 출력
    if (process.env.NODE_ENV !== "test") this.#output.printScoreBoard();

    this.#runLaps();
    this.#renderWinner();
  }
}

export default RaceTrack;
