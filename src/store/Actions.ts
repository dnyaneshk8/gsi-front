// import { User } from "./AppContext";
import { User, GlobalState } from "./interfaces";

const ACTION_SET_SET_USER = "ACTION_SET_USER";
const ACTION_SET_LOGGED_IN = "ACTION_SET_LOGGED_IN";

export const Actions = {
  setUser: (payload: User) => {
    return { payload, type: ACTION_SET_SET_USER };
  },
  setLoggedIn: (payload: Boolean) => {
    return { payload, type: ACTION_SET_LOGGED_IN };
  },
};

export function reducer(
  state: any,
  action: { type: string; payload: User | Boolean }
): GlobalState {
  switch (action.type) {
    case ACTION_SET_SET_USER:
      console.log("USER", action.payload);
      return { ...state, user: action.payload };
    case ACTION_SET_LOGGED_IN:
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
}
