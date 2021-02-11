import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import errorsReducer from "../reducers/errors";
import thunk from "redux-thunk";
import { InitialStateInterface } from "../types/interfaces";
import selectedSongReducer from "../reducers/selectedSong";
import songsReducer from "../reducers/songs";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState: InitialStateInterface = {
  errors: null,
  songs: null,
  selectedSong: null,
};

const allReducers = combineReducers({
  errors: errorsReducer,
  songs: songsReducer,
  selectedSong: selectedSongReducer,
});

export default function configureStore() {
  return createStore(
    allReducers,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
