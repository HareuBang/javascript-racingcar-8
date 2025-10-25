import { MissionUtils } from "@woowacourse/mission-utils";
import { PRINT } from "../constants/message.js";

const print = (message) => MissionUtils.Console.print(message);

const outputView = {
  printScoreBoard: () =>
    print(PRINT.NEWLINE_SEPARATOR + PRINT.EXECUTION_RESULT_TITLE),
  printExecutionResult: (executionResult) => print(executionResult),
  printWinner: (winner) => print(PRINT.WINNER_PREFIX + winner),
  printError: (errorMessage) => print(errorMessage),
};

export default outputView;
