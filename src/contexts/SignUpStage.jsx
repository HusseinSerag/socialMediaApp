import { createContext, useContext, useReducer } from "react";
import { CREATE, START, UPLOAD } from "../utils/Constants";
import { throwError } from "../utils/helpers";

const SignUpState = createContext();

const initialState = {
  status: UPLOAD,
};
function reducer(state, action) {
  switch (action.type) {
    case CREATE:
      return { ...state, status: CREATE };
    case UPLOAD:
      return { ...state, status: UPLOAD };
  }
}

export default function SignUpStage({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SignUpState.Provider value={{ state, dispatch }}>
      {children}
    </SignUpState.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignUpState);
  if (context === undefined) {
    throwError("Cannot use signup hook outside of its provider", 403);
  }
  return context;
}
