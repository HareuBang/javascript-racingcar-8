import Car from "../src/Car.js";

describe("자동차", () => {
  describe("기능 테스트", () => {
    describe("자동차 생성 기능 테스트", () => {
      test.each([
        ["pobi"],
        ["woni"],
        ["jun"],
        ["👍👍"],
        [" ⭐ "],
        [" ^_^ "],
        [" ㅠ ㅠ "],
      ])(
        "%s의 이름으로 Car 생성 시 이름과 거리가 올바르게 초기화된 인스턴스가 생성된다.",
        (inputName) => {
          const car = new Car(inputName);

          expect(car.getName()).toBe(inputName);
          expect(car.getDistance()).toBe(0);
        }
      );
    });

    describe("자동차 전진 기능 테스트", () => {
      test("생성된 자동차를 전진시키면 이동거리가 1 증가합니다.", () => {
        const car = new Car("pobi");

        car.forward();
        expect(car.getDistance()).toBe(1);

        car.forward();
        expect(car.getDistance()).toBe(2);
      });
    });
  });

  describe("예외 테스트", () => {
    test.each([
      [null, "자동차 이름들은 문자열만 입력 가능합니다."],
      [undefined, "자동차 이름들은 문자열만 입력 가능합니다."],
      [["pobi", "woni", "jun"], "자동차 이름들은 문자열만 입력 가능합니다."],
      [{ name: "pobi" }, "자동차 이름들은 문자열만 입력 가능합니다."],
      [123, "자동차 이름들은 문자열만 입력 가능합니다."],
      [true, "자동차 이름들은 문자열만 입력 가능합니다."],
      ["", "자동차 이름은 최소 1글자 이상만 가능합니다."],
      ["     ", "자동차 이름은 최소 1글자 이상만 가능합니다."],
      ["123456", "자동차 이름은 5글자 이하만 가능합니다."],
      ["이것은 자동차 이름입니다.", "자동차 이름은 5글자 이하만 가능합니다."],
    ])(
      "잘못된 자동차 이름 `%s`을(를) 입력하면 `%s`에러를 반환한다.",
      (inputName, expected) => {
        expect(() => new Car(inputName)).toThrow(expected);
      }
    );
  });
});
