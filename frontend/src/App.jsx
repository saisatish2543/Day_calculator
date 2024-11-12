import React, { useState } from "react";
import ParticlesBackgrnd from "./components/ParticlesBackground";
import axios from "axios";

export const App = () => {

  const initialData = {
    day: "",
    month:"",
    year:"",
    century: "",
  };

  const [data, setData] = useState(initialData);
  const [result, setResult] = useState();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/findday", data);
      setResult(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <ParticlesBackgrnd />
        <div className="container">
          <h1>Welcome! This is Day Dig-Out Bot!</h1>
          <h2>Find the Day of week even centuries behind or ahead..</h2>
        </div>
        {result && <h1>{result}</h1>}
        <div className="Form">
          <h1>hey</h1>
          <input
            type="number"
            name="day"
            onChange={handleOnChange}
          />
            <input
            type="number"
            name="month"
            onChange={handleOnChange}
          />
            <input
            type="number"
            name="year"
            onChange={handleOnChange}
          />
          <input
            type="number"
            name="century"
            onChange={handleOnChange}
          />
          <button type="button" onClick={handleOnSubmit}>
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
