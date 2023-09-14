import { useContext } from "react"
import { AppContext } from "."
import { Actions } from "./types";
import { User } from "../../Types/User";


export const useAuthContext = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    ...state,
    setTokon: (token: String) => {
      dispatch({
        type: Actions.SET_TOKEN,
        payload: { token }
      });
    },

    setUser: (user: User | null) => {
      dispatch: ({
        type: Actions.SET_USER,
        payload: { user }
      });
    }
  }
}