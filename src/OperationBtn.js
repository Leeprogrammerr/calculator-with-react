import React from "react";
import { ACTIONS } from "./App";
const OperationBtn = ({ operation, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_OPERATION, paylod: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationBtn;
