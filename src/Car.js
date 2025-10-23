class Car {
  #name;
  #distance;

  constructor(name) {
    this.#validateName(name);

    this.#name = name;
    this.#distance = 0;
  }

  #validateName(name) {
    if (typeof name !== "string")
      throw new Error("자동차 이름들은 문자열만 입력 가능합니다.");
    if (name.length === 0 || /\s{5}/.test(name))
      throw new Error("자동차 이름은 최소 1글자 이상만 가능합니다.");
    if (!(name.length <= 5))
      throw new Error("자동차 이름은 5글자 이하만 가능합니다.");
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
