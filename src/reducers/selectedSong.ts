/* eslint-disable import/no-anonymous-default-export */
import {
  SelectedSongActionInterface,
  InitialStateInterface,
} from "../types/interfaces";

export default function (
  state: InitialStateInterface["selectedSong"] = null,
  action: SelectedSongActionInterface
) {
  switch (action.type) {
    case "SET_SELECTED_SONG":
      if (state === undefined) {
        return state;
      } else return action.payload;

    default:
      return state;
  }
}
