import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  //   const [enteredValue, setEnteredValue] = useState("");
  //   const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueInputChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
    //setEnteredValue(event.target.value);
  };
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    //setIsTouched(true);
  };
  const reset = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueInputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
