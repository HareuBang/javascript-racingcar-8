import CarFactory from "../src/CarFactory.js";
import { SUBJECT } from "../src/constants/constants";
import { CAR_NAME_ERRORS } from "../src/constants/errorMessage";

describe("CarFactory를 통해 생성된 Car 동작 확인", () => {
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
      "%s의 이름으로 자동차를 생성 시 이름과 거리가 올바르게 초기화된 Car 인스턴스가 생성된다.",
      (inputName) => {
        const car = CarFactory.createCar(inputName);

        expect(car.getName()).toBe(inputName);
        expect(car.getDistance()).toBe(0);
      }
    );
  });

  describe("자동차 전진 기능 테스트", () => {
    test("생성된 자동차를 전진시키면 이동거리가 1 증가합니다.", () => {
      const car = CarFactory.createCar("pobi");

      car.forward();
      expect(car.getDistance()).toBe(1);

      car.forward();
      expect(car.getDistance()).toBe(2);
    });
  });

  describe("예외 테스트", () => {
    const CAR_NAME_ERROR_NOT_STRING = `${SUBJECT.CAR_NAME} ${CAR_NAME_ERRORS.NOT_STRING}`;
    const CAR_NAME_ERROR_NOT_EMPTY = `${SUBJECT.CAR_NAME} ${CAR_NAME_ERRORS.NOT_EMPTY}`;

    test.each([
      [null],
      [undefined],
      [["pobi", "woni", "jun"]],
      [{ name: "pobi" }],
      [123],
      [true],
    ])(
      `잘못된 자동차 이름 "%s"을(를) 입력하면 ${CAR_NAME_ERROR_NOT_STRING}에러를 반환한다.`,
      (name) =>
        expect(() => CarFactory.createCar(name)).toThrow(
          CAR_NAME_ERROR_NOT_STRING
        )
    );

    test.each([[""], ["     "]])(
      `잘못된 자동차 이름 "%s"을(를) 입력하면 ${CAR_NAME_ERROR_NOT_EMPTY}에러를 반환한다.`,
      (name) => {
        expect(() => CarFactory.createCar(name)).toThrow(
          CAR_NAME_ERROR_NOT_EMPTY
        );
      }
    );

    test.each([["123456"], ["이것은 자동차 이름입니다."]])(
      `잘못된 자동차 이름 "%s"을(를) 입력하면 ${CAR_NAME_ERRORS.NOT_MAX_LENGTH_FIVE}에러를 반환한다.`,
      (name) => {
        expect(() => CarFactory.createCar(name)).toThrow(
          CAR_NAME_ERRORS.NOT_MAX_LENGTH_FIVE
        );
      }
    );
  });
});
