import * as types from "./actionTypes";

const intialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.DELETE_USER_START:
    case types.LOAD_USERS_START:
    case types.CREATE_USER_START:
    case types.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_USERS_SUCCESS: {
      return {
        ...state,

        loading: false,
        users: action.payload,
      };
    }
    case types.CREATE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    }
    case types.LOAD_USERS_ERROR:
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
