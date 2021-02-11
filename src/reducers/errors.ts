/* eslint-disable import/no-anonymous-default-export */
import {
  ErrorActionInterface,
  InitialStateInterface,
} from "../types/interfaces";

export default function (
  state: InitialStateInterface["errors"] = null,
  action: ErrorActionInterface
) {
  switch (action.type) {
    case "ADD_TO_ERRORS":
      if (state === null) {
        return state;
      } else return state.concat(action.payload);

    case "REMOVE_FROM_ERRORS":
      if (state === null) {
        return state;
      } else
        return [...state.filter((error) => error.id !== action.payload.id)];
    default:
      if (state === null) {
        return state;
      }
  }
}
