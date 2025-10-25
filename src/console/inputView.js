import { MissionUtils } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/message.js";

const readLineAsync = async (question) =>
  await MissionUtils.Console.readLineAsync(question);

const inputView = {
  readCarNames: async () => await readLineAsync(PROMPT.PARTICIPANT_CAR_NAMES),
  readRaceLaps: async () => await readLineAsync(PROMPT.RACE_LAPS),
};

export default inputView;
