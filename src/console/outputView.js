import { MissionUtils } from "@woowacourse/mission-utils";

const print = (message) => MissionUtils.Console.print(message);

export const outputView = {
  printScoreBoard: () => print("실행 결과"),
  printExecutionResult: (executionResult) => print(executionResult + "\n"),
  printWinner: (winner) => print("최종 우승자 : " + winner),
  printError: (errorMessage) => print(errorMessage),
};
