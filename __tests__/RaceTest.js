import { Race } from "../src/Race";

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
  });

  describe("예외 테스트", () => {
    test("유효하지 않은 자동차 이름을 입력하면 에러를 반환한다.", () => {
      const race = new Race(mockCarFactory);

      expect(() => race.prepare(null, "1")).toThrow(
        "자동차 이름들은 문자열로만 입력 가능합니다."
      );
      expect(() => race.prepare(["pobi", "woni", "jun"], "5")).toThrow(
        "자동차 이름들은 문자열로만 입력 가능합니다."
      );
      expect(() => race.prepare("", "3")).toThrow(
        "자동차 이름은 최소 1글자 이상만 가능합니다."
      );
      expect(() => race.prepare(" ", "2")).toThrow(
        "자동차 이름은 최소 1글자 이상만 가능합니다."
      );
    });

    test("유효하지 않은 시도할 횟수를 입력하면 에러를 반환한다.", () => {
      const race = new Race(mockCarFactory);

      expect(() => race.prepare("pobi,woni,jun", [1])).toThrow(
        "시도할 횟수는 숫자만 입력 가능합니다."
      );
      expect(() => race.prepare("pobi,woni,jun", undefined)).toThrow(
        "시도할 횟수는 숫자만 입력 가능합니다."
      );
      expect(() => race.prepare("pobi,woni,jun", "-3")).toThrow(
        "시도할 횟수는 양수만 입력 가능합니다."
      );
      expect(() => race.prepare("pobi,woni,jun", "0")).toThrow(
        "시도할 횟수는 양수만 입력 가능합니다."
      );
    });
  });
});
