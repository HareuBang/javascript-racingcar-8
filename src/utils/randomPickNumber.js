import { MissionUtils } from "@woowacourse/mission-utils";

export const randomPickNumber = () =>
  MissionUtils.Random.pickNumberInRange(0, 9);
