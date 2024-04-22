import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./actions";

function* fetchUsers(action) {
  try {
    const { page, limit } = action.payload;
    const response = yield call(
      axios.get,
      `http://143.198.168.244:3000/api/users/fetch/dummy/user-v2?page=${page}&limit=${limit}`
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
}

export default userSaga;
