import React, { useReducer } from "react";
import DigitBtn from "./DigitBtn";
import OperationBtn from "./OperationBtn";
import classes from "./app.module.css";
export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  DELETE_DIGIT: "delete_digit",
  ADD_OPERATION: "add_operation",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};
const calculat = (prevNumber, currentNumber, operation) => {
  const prev = parseFloat(prevNumber);
  const current = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(current)) return;
  let equal;
  switch (operation) {
    case "%":
      equal = prev % current;
      break;
    case "÷":
      equal = prev / current;
      break;
    case "x":
      equal = prev * current;
      break;
    case "+":
      equal = prev + current;
      break;
    case "-":
      equal = prev - current;
  }

  return String(equal);
};
const reducer = (state, { type, paylod }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentOpperand?.includes(".") && paylod.digit === ".") {
        return { ...state };
      }

      if (state.currentOpperand === "0" && paylod.digit === "0") {
        return { ...state };
      }
      return {
        ...state,
        currentOpperand: `${state.currentOpperand || ""}${paylod.digit}`,
      };

    case ACTIONS.ADD_OPERATION:
      if (state.operation && paylod.operation) {
        return { ...state };
      }
      if (!state.currentOpperand) {
        return {};
      }
      if (!state.previousOpperand) {
        return {
          ...state,
          previousOpperand: state.currentOpperand,
          operation: paylod.operation,
          currentOpperand: null,
        };
      }
      if (state.currentOpperand && state.previousOpperand) {
        return {
          ...state,
          previousOpperand: calculat(
            state.previousOpperand,
            state.currentOpperand,
            state.operation
          ),
          operation: paylod.operation,
          currentOpperand: null,
        };
      }

    case ACTIONS.EVALUATE:
      if (state.previousOpperand && state.currentOpperand) {
        return {
          ...state,
          currentOpperand: calculat(
            state.previousOpperand,
            state.currentOpperand,
            state.operation
          ),
          previousOpperand: null,
          operation: undefined,
        };
      }
      if (!state.currentOpperand || !state.previousOpperand) {
        return { ...state };
      }
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (!state.currentOpperand && state.previousOpperand) {
        return {
          ...state,
          operation: state.operation.slice(0, -1),
          previousOpperand: state.previousOpperand.slice(0, -1),
        };
      }
      if (!state.currentOpperand && !state.previousOpperand) {
        return {};
      }
      return { ...state, currentOpperand: state.currentOpperand.slice(0, -1) };
  }
};

function App() {
  const [{ previousOpperand, currentOpperand, operation }, dispatch] =
    useReducer(reducer, {});

  return (
    <div className={classes.modify}>
      <div className={classes["calculator-container__grid"]}>
        <div className={classes.output}>
          <div className={classes["previous-opperand"]}>
            {previousOpperand}
            {operation}
          </div>
          <div className={classes["current-opperand"]}>{currentOpperand}</div>
        </div>
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
          DEL
        </button>
        <OperationBtn operation='%' dispatch={dispatch} />
        <OperationBtn operation='÷' dispatch={dispatch} />
        <DigitBtn digit='7' dispatch={dispatch} />
        <DigitBtn digit='8' dispatch={dispatch} />
        <DigitBtn digit='9' dispatch={dispatch} />
        <OperationBtn operation='x' dispatch={dispatch} />
        <DigitBtn digit='4' dispatch={dispatch} />
        <DigitBtn digit='5' dispatch={dispatch} />
        <DigitBtn digit='6' dispatch={dispatch} />
        <OperationBtn operation='-' dispatch={dispatch} />
        <DigitBtn digit='1' dispatch={dispatch} />
        <DigitBtn digit='2' dispatch={dispatch} />
        <DigitBtn digit='3' dispatch={dispatch} />
        <OperationBtn operation='+' dispatch={dispatch} />

        <DigitBtn digit='0' dispatch={dispatch} />
        <DigitBtn digit='.' dispatch={dispatch} />
        <button
          className={classes["span-two"]}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
