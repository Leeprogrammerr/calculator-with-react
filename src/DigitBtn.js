import React from "react";
import { ACTIONS } from "./App";

const DigitBtn = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, paylod: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitBtn;
