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
    test.each([
      [null, "1", "문자열로만 입력 가능합니다."],
      [["pobi", "woni", "jun"], "5", "문자열로만 입력 가능합니다."],
      ["", "2", "최소 1글자 이상만 가능합니다."],
      ["    ", "4", "최소 1글자 이상만 가능합니다."],
    ])(
      "유효하지 않은 자동차 이름 `%s`을(를) 입력하면 %s 에러를 반환한다.",
      (name, laps, expected) => {
        const race = new Race(mockCarFactory);
        expect(() => race.prepare(name, laps)).toThrow(expected);
      }
    );

    test.each([
      [[1], "시도할 횟수는 숫자만 입력 가능합니다."],
      [undefined, "시도할 횟수는 숫자만 입력 가능합니다."],
      ["-3", "시도할 횟수는 양수만 입력 가능합니다."],
      ["0", "시도할 횟수는 양수만 입력 가능합니다."],
      ["3.14", "시도할 횟수는 양수만 입력 가능합니다."],
    ])(
      "유효하지 않은 자동차 이름 `%s`을(를) 입력하면 %s 에러를 반환한다.",
      (laps, expected) => {
        const race = new Race(mockCarFactory);
        expect(() => race.prepare("pobi,woni,jun", laps)).toThrow(expected);
      }
    );
  });
});
