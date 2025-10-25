import Race from "../src/Race.js";
import { SUBJECT } from "../src/constants/constants.js";
import { CAR_NAME_ERRORS, LAPS_ERROR } from "../src/constants/errorMessage.js";

describe("Race", () => {
  let mockCarFactory;

  beforeEach(() => {
    mockCarFactory = jest.fn((name) => name);
  });

  describe("기능 테스트", () => {
    test("유효한 자동차 이름과 횟수를 입력하면 정상적으로 자동차(Car)를 생성한다.", () => {
      const race = new Race(mockCarFactory);
      race.prepare("pobi,👍👍, ㅠ ㅠ ,jun", "  5  ");

      expect(mockCarFactory).toHaveBeenCalledTimes(4);
      expect(mockCarFactory).toHaveBeenCalledWith("pobi");
      expect(mockCarFactory).toHaveBeenCalledWith("👍👍");
      expect(mockCarFactory).toHaveBeenCalledWith(" ㅠ ㅠ ");
      expect(mockCarFactory).toHaveBeenCalledWith("jun");
    });

    test("runNextLaps - 주어진 laps만큼 runNextLaps가 설정된 laps만큼 호출되는 지 확인", () => {
      const race = new Race(mockCarFactory);
      race.prepare("pobi,woni,jun", "3");

      let count = 0;
      while (race.runNextLaps()) {
        count += 1;
      }

      expect(count).toBe(3);
    });

    test("start(경주 시작) - 랜덤 값이 4 이상일 경우 자동차가 전진하는 지 확인한다.", () => {
      const mockCarFactory = jest.fn((name) => {
        let distance = 0;

        return {
          getName: () => name,
          getDistance: () => distance,
          forward: () => distance++,
        };
      });

      const mockRandomPickNumber = jest
        .fn()
        .mockReturnValueOnce(3) // 정지
        .mockReturnValueOnce(4) // 전진
        .mockReturnValueOnce(0) // 정지
        .mockReturnValueOnce(9); // 전진

      const race = new Race(mockCarFactory, mockRandomPickNumber);
      race.prepare("pobi,woni,jun,👍👍", "1");

      const cars = mockCarFactory.mock.results.map(({ value }) => value);

      race.start();

      expect(cars[0].getDistance()).toBe(0);
      expect(cars[1].getDistance()).toBe(1);
      expect(cars[2].getDistance()).toBe(0);
      expect(cars[3].getDistance()).toBe(1);
    });

    test("getRaceProgress - 경주 상태를 정상적으로 반환하는 지 확인한다.", () => {
      const mockCarFactory = jest.fn((name) => {
        let distance = 0;

        return {
          getName: () => name,
          getDistance: () => distance,
          forward: () => distance++,
        };
      });

      const race = new Race(mockCarFactory);
      race.prepare("pobi,woni,jun", "3");

      const cars = mockCarFactory.mock.results.map(({ value }) => value);

      // pobi 전진 1번
      cars[0].forward();

      // woni 전진 3번
      cars[1].forward();
      cars[1].forward();
      cars[1].forward();

      // jun 전진 0번

      expect(race.getRaceProgress()).toEqual([
        { name: "pobi", distance: 1 },
        { name: "woni", distance: 3 },
        { name: "jun", distance: 0 },
      ]);
    });

    test("determineWinner - 가장 멀리 전진한 우승자들을 식별하고 반환하는 지 확인한다.", () => {
      const mockCarFactory = jest.fn((name) => {
        let distance = 0;

        return {
          getName: () => name,
          getDistance: () => distance,
          forward: () => distance++,
        };
      });

      const race = new Race(mockCarFactory);
      race.prepare("pobi,woni,jun", "4");

      const cars = mockCarFactory.mock.results.map(({ value }) => value);

      // pobi 전진 3번
      cars[0].forward();
      cars[0].forward();
      cars[0].forward();

      // woni 전진 3번
      cars[1].forward();
      cars[1].forward();

      // jun 전진 3번
      cars[2].forward();
      cars[2].forward();
      cars[2].forward();

      expect(race.determineWinner()).toEqual(["pobi", "jun"]);
    });
  });

  describe("예외 테스트", () => {
    const CAR_NAMES_ERROR_NOT_STRING = `${SUBJECT.CAR_NAMES} ${CAR_NAME_ERRORS.NOT_STRING}`;
    const CAR_NAMES_ERROR_NOT_EMPTY = `${SUBJECT.CAR_NAMES} ${CAR_NAME_ERRORS.NOT_EMPTY}`;

    test.each([
      [null],
      [undefined],
      [["pobi", "woni", "jun"]],
      [{ name: "pobi" }],
      [123],
      [true],
    ])(
      `잘못된 자동차 이름 "%s"을(를) 입력하면 ${CAR_NAMES_ERROR_NOT_STRING}에러를 반환한다.`,
      (name) => {
        const race = new Race(mockCarFactory);
        expect(() => race.prepare(name, "  1 ")).toThrow(
          CAR_NAMES_ERROR_NOT_STRING
        );
      }
    );

    test.each([[""], ["     "]])(
      `자동차 이름에 빈 또는 공백 "%s"을(를) 입력하면 ${CAR_NAMES_ERROR_NOT_EMPTY}에러를 반환한다.`,
      (name) => {
        const race = new Race(mockCarFactory);
        expect(() => race.prepare(name, "5")).toThrow(
          CAR_NAMES_ERROR_NOT_EMPTY
        );
      }
    );

    test.each([[[1]], [null], ["undefined"], ["3 5"]])(
      `시도할 횟수에 유효하지 않은 "%s"을(를) 입력하면 ${LAPS_ERROR.NOT_NUMBER} 에러를 반환한다.`,
      (laps) => {
        const race = new Race(mockCarFactory);
        expect(() => race.prepare("pobi,woni,jun", laps)).toThrow(
          LAPS_ERROR.NOT_NUMBER
        );
      }
    );

    test.each([["-3"], ["0"], ["3.14"]])(
      `시도할 횟수에 양수가 아닌 "%s"을(를) 입력하면 ${LAPS_ERROR.NOT_POSITIVE_NUMBER} 에러를 반환한다.`,
      (laps) => {
        const race = new Race(mockCarFactory);
        expect(() => race.prepare("pobi,woni,jun", laps)).toThrow(
          LAPS_ERROR.NOT_POSITIVE_NUMBER
        );
      }
    );
  });
});
