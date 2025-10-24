import { VALID_TYPE, SUBJECT } from "../constants/constants";
import { CAR_NAME_ERRORS } from "../constants/errorMessage";

export const validateInputString = (
  inputString,
  subject = SUBJECT.CAR_NAME
) => {
  if (typeof inputString !== VALID_TYPE.STRING)
    throw new Error(`${subject} ${CAR_NAME_ERRORS.NOT_STRING}`);
  if (inputString.trim() === VALID_TYPE.EMPTY)
    throw new Error(`${subject} ${CAR_NAME_ERRORS.NOT_EMPTY}`);
};
