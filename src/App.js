import "./App.css";
import { useState } from "react";

function App() {
  // to create states
  const [calc, setCalc] = useState("");
  const [output, setOutput] = useState("");

  const operators = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    // to avoid having multiple operators simultaneously
    if (
      (operators.includes(value) && calc === "") ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    // to update our output
    if (!operators.includes(value)) {
      setOutput(eval(calc + value).toString());
    }
  };

  // to create buttons with digits 1 to 9
  const calcDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  // to make our "=" button functional and get the final output

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  // to make the "DEL" button functional
  const deleteLastValue = () => {
    if (calc == "") {
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value);
  };

  // to reset the calculator
  const reset = () => {
    setCalc("");
  };

  return (
    // Our calculator layout
    <div className="main-container">
      <div className="calculator">
        <div className="input-output-display">
          {output ? <span> ({output})</span> : ""}
          {calc || "0"}{" "}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLastValue}>DEL</button>

          <button onClick={reset}>Reset</button>
        </div>

        <div className="digits">
          {calcDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
