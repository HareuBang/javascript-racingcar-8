import { MissionUtils } from "@woowacourse/mission-utils";
import { PRINT } from "../constants/message.js";

const print = (message) => MissionUtils.Console.print(message);

const outputView = {
  // "실행 결과" 제목 출력
  printScoreBoard: () =>
    print(PRINT.NEWLINE_SEPARATOR + PRINT.EXECUTION_RESULT_TITLE),

  // 차수별 실행 결과 출력
  printExecutionResult: (executionResult) =>
    print(executionResult + PRINT.NEWLINE_SEPARATOR),

  printWinner: (winner) => print(PRINT.WINNER_PREFIX + winner),

  printError: (errorMessage) => print(errorMessage),
};

export default outputView;
