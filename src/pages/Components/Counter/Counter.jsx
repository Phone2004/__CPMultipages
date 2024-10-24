import { useState } from "react";
import "./Counter.css";

function Counter(props) {
  const [value, setValue] = useState(props.value);

  function inc() {
    setValue(value + 1);
  }

  function dec() {
    setValue(value - 1);
  }

  return (
    <div className="counter-container">
      <h3 className="counter-title">{props.name || "Counter"}</h3>
      <button className="btn btn-danger" onClick={dec}>
        -
      </button>
      <span className="counter-value"><b>{value || 0}</b></span>
      <button className="btn btn-success" onClick={inc}>
        +
      </button>
    </div>
  );
}

export default Counter;
