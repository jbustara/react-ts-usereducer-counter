import { useReducer, useState } from "react";

type ActionTypes = {
  type: "increment" | "decrement" | "custom";
  payload?: number;
};

const initialState = {
  value: 0,
};
const reducer = (state: typeof initialState, action: ActionTypes) => {
  switch (action.type) {
    case "increment":
      console.log("increment", action);
      return {
        ...state,
        value: state.value + 1,
      };
    case "decrement":
      return {
        ...state,
        value: state.value - 1,
      };
    case "custom":
      if (!action.payload) return state;
      return {
        ...state,
        value: state.value + action.payload,
      };
    default:
      return state;
  }
};
const Counter = () => {
  const [{ value }, dispatch] = useReducer(reducer, initialState);
  const [customValue, setCustomValue] = useState<number>(1);

  return (
    <div className="container" data-bs-theme="dark">
      <h2>{`Counter with useReducer: ${value}`} </h2>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => dispatch({ type: "increment" })}
      >
        Increment
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => dispatch({ type: "decrement" })}
      >
        Decrement
      </button>
      <div className="container">
        <h4>Custom increment/decrement</h4>
        <input
          type="number"
          value={customValue}
          onChange={(e) => setCustomValue(parseInt(e.target.value))}
        />
        <button
          type="button"
          className={`btn ${customValue >= 0 ? "btn-success" : "btn-danger"}`}
          onClick={() => dispatch({ type: "custom", payload: customValue })}
        >
          {`${customValue >= 0 ? "Increment" : "Decrement"} ${Math.abs(
            customValue
          )}`}
        </button>
      </div>
    </div>
  );
};

export default Counter;
