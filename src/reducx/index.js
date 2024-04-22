import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import usersReducer from "./reducer";
import userSaga from "./sagas";

export const rootReducer = combineReducers({
  users: usersReducer,
  // Add other reducers here if needed
});

export function* rootSaga() {
  yield all([
    userSaga(),
    // Add other sagas here if needed
  ]);
}
