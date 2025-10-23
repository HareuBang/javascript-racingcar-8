export class RaceTrack {
  #input;
  #race;

  constructor(input, race) {
    this.#input = input;
    this.#race = race;
  }

  async race() {
    const inputCarNames = this.#input.readCarNames();
    const inputRaceLaps = this.#input.readRaceLaps();

    this.#race.prepare(inputCarNames, inputRaceLaps);
  }
}
