import { MissionUtils } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/message.js";

const readLineAsync = (question) =>
  MissionUtils.Console.readLineAsync(question);

const inputView = {
  readCarNames: () => readLineAsync(PROMPT.PARTICIPANT_CAR_NAMES),
  readRaceLaps: () => readLineAsync(PROMPT.RACE_LAPS),
};

export default inputView;
