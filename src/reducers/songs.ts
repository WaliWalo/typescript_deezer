/* eslint-disable import/no-anonymous-default-export */
import {
  SongActionInterface,
  InitialStateInterface,
} from "../types/interfaces";

export default function (
  state: InitialStateInterface["songs"] = null,
  action: SongActionInterface
) {
  switch (action.type) {
    case "ADD_TO_SONGS":
      if (state === undefined) {
        return state;
      } else return action.payload;

    default:
      return state;
  }
}
