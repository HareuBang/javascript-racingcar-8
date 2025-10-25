import { MissionUtils } from "@woowacourse/mission-utils";
import { PRINT } from "../constants/message";

const print = (message) => MissionUtils.Console.print(message);

export const outputView = {
  printScoreBoard: () => print(PRINT.EXECUTION_RESULT_TITLE),
  printExecutionResult: (executionResult) =>
    print(executionResult + PRINT.NEWLINE_SEPARATOR),
  printWinner: (winner) => print(PRINT.WINNER_PREFIX + winner),
  printError: (errorMessage) => print(errorMessage),
};
