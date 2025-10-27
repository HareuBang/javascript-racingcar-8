import {
  FORMAT_RACE_PROGRESS,
  WINNER_SEPARATOR,
} from "../constants/constants.js";
import { ERROR_PREFIX } from "../constants/errorMessage.js";

const { NAME_DISTANCE_SEPARATOR, DISTANCE_MARK, NEWLINE_SEPARATOR } =
  FORMAT_RACE_PROGRESS;

const format = {
  raceProgress: (progress) =>
    progress
      .map(
        ({ name, distance }) =>
          `${name} ${NAME_DISTANCE_SEPARATOR} ${DISTANCE_MARK.repeat(distance)}`
      )
      .join(NEWLINE_SEPARATOR),

  winner: (winner) => winner.join(WINNER_SEPARATOR),
  errorMessage: (error) => ERROR_PREFIX + error.message,
};

export default format;
