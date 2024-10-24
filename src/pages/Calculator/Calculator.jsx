import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);

  const formatNumber = (number) => {
    if (!number) return "0";
    const numStr = number.toString().replace(/\s+/g, "");
    if (numStr.length > 9) return numStr.slice(0, 9);
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const updateDisplay = () => {
    return formatNumber(currentOperand || result) || "0";
  };

  const appendNumber = (number) => {
    if (number === "." && currentOperand.includes(".")) return;
    if (currentOperand.replace(/\s+/g, "").length >= 9) return; // หยุดถ้าตัวเลขเกิน 9 หลัก
    setCurrentOperand((prev) => prev + number);
  };

  const operate = (operator) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      calculateResult();
    }
    setCurrentOperator(operator);
    setPreviousOperand(currentOperand);
    setCurrentOperand("");
  };

  const calculateResult = () => {
    let calculation;
    const prev = parseFloat(previousOperand);
    const current = currentOperand
      ? parseFloat(currentOperand.replace(/\s+/g, ""))
      : lastOperand;

    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperator) {
      case "+":
        calculation = prev + current;
        break;
      case "-":
        calculation = prev - current;
        break;
      case "*":
        calculation = prev * current;
        break;
      case "/":
        calculation = prev / current;
        break;
      default:
        return;
    }

    setResult(calculation);
    setCurrentOperand("");
    setPreviousOperand(calculation.toString());
    setLastOperand(current);
  };

  const clearDisplay = () => {
    setCurrentOperand("");
    setPreviousOperand("");
    setCurrentOperator(null);
    setLastOperand(null);
    setResult(null);
  };

  const deleteLast = () => {
    setCurrentOperand((prev) => prev.slice(0, -1));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      calculateResult();
    } else if (event.key === "Escape") {
      clearDisplay();
    } else if (event.key === "Backspace") {
      deleteLast();
    } else if (["+", "-", "*", "/"].includes(event.key)) {
      operate(event.key);
    } else if (event.key === ".") {
      appendNumber(event.key);
    } else if (!isNaN(event.key)) {
      appendNumber(event.key);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" id="display" value={updateDisplay()} disabled />
      </div>
      <div className="buttons">
        <button onClick={clearDisplay}>C</button>
        <button onClick={() => operate("/")}>÷</button>
        <button onClick={() => operate("*")}>×</button>
        <button onClick={deleteLast} id="del">
          DEL
        </button>
        <button onClick={() => appendNumber("7")}>7</button>
        <button onClick={() => appendNumber("8")}>8</button>
        <button onClick={() => appendNumber("9")}>9</button>
        <button onClick={() => operate("-")}>-</button>
        <button onClick={() => appendNumber("4")}>4</button>
        <button onClick={() => appendNumber("5")}>5</button>
        <button onClick={() => appendNumber("6")}>6</button>
        <button onClick={() => operate("+")}>+</button>
        <button onClick={() => appendNumber("1")}>1</button>
        <button onClick={() => appendNumber("2")}>2</button>
        <button onClick={() => appendNumber("3")}>3</button>
        <button onClick={calculateResult} id="equal">
          =
        </button>
        <button onClick={() => appendNumber("0")} className="zero">
          0
        </button>
        <button onClick={() => appendNumber(".")}>.</button>
      </div>
    </div>
  );
};

export default Calculator;
