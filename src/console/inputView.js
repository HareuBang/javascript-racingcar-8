import { MissionUtils } from "@woowacourse/mission-utils";
import { PARTICIPANT_CAR_NAMES_PROMPT } from "../constants/message.js";

const readLineAsync = async (question) =>
  await MissionUtils.Console.readLineAsync(question);

const inputView = {
  readCarNames: async () => await readLineAsync(PARTICIPANT_CAR_NAMES_PROMPT),
};

export default inputView;
