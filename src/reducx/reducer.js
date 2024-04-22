import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
