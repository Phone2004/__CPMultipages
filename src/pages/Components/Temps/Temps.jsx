
import "./Temps.css";
import Variable from "../Variable/Variable";
import { useState } from "react";

function Temps() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(0);
  const [kelvin, setKelvin] = useState(0);

  const handleCelsiusChange = (newCelsius) => {
    setCelsius(newCelsius);
    setFahrenheit((newCelsius * 9) / 5 + 32);
    setKelvin(newCelsius + 273.15);
  };

  const handleFahrenheitChange = (newFahrenheit) => {
    setFahrenheit(newFahrenheit);
    setCelsius((newFahrenheit - 32) * 5 / 9);
    setKelvin((newFahrenheit - 32) * 5 / 9 + 273.15);
  };

  const handleKelvinChange = (newKelvin) => {
    setKelvin(newKelvin);
    setCelsius(newKelvin - 273.15);
    setFahrenheit((newKelvin - 273.15) * 9 / 5 + 32);
  };

  const handleResetAll = () => {
    setCelsius(0);
    setFahrenheit(0);
    setKelvin(0);
  };

  return (
    <div className="temps-container">
      <h3 className="temps-title">Temps</h3>
      <h3 className="temps-display">
        <span className="badge bg-primary">{celsius.toFixed(2)} &deg;C</span>
        <span className="badge bg-primary">{fahrenheit.toFixed(2)} &deg;F</span>
        <span className="badge bg-primary">{kelvin.toFixed(2)} &deg;K</span>
      </h3>
      <div className="temps-var">
        <Variable
          name={"Celsius"}
          value={celsius}
          setValue={handleCelsiusChange}
        />
        <Variable
          name={"Fahrenheit"}
          value={fahrenheit}
          setValue={handleFahrenheitChange}
        />
        <Variable name={"Kelvin"} value={kelvin} setValue={handleKelvinChange} />
      </div>
      <button className="btn btn-warning reset-button" onClick={handleResetAll}>Reset All</button>
    </div>
  );
}

export default Temps;
