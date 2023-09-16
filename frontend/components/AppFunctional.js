

import React, { useState } from "react";

export default function AppFunctional(props) {
  const [location, setLocation] = useState([2, 2]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState("");

  

  function onChange(event) {
   
    setForm(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    let sonuc = {
      x: location[0],
      y: location[1],
      steps: step,
      email: form,
    };
    axios
      .post("http://localhost:9000/api/result", sonuc)
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch(() => {
        console.log("Unprocessable Entity");
      });
  }

  

  function up() {
    setMessage("");

    if (location[1] > 1) {
      setLocation([location[0], location[1] - 1]);
      setStep(step + 1);
    } else {
      setMessage("YUKARI GİDEMEZSİNİZ");
    }
  }

  function right() {
    setMessage("");
    // x değişecek , y sabit
    if (location[0] < 3) {
      setLocation([location[0] + 1, location[1]]);
      setStep(step + 1);
    } else {
      setMessage("SAĞA GİDEMEZSİNİZ");
    }
  }

  function down() {
    setMessage("");

    if (location[1] < 3) {
      setLocation([location[0], location[1] + 1]);
      setStep(step + 1);
    } else {
      setMessage("AŞAĞI GİDEMEZSİNİZ");
    }
  }

  function left() {
    setMessage("");

    if (location[0] > 1) {
      setLocation([location[0] - 1, location[1]]);
      setStep(step + 1);
    } else {
      setMessage("SOLA GİDEMEZSİNİZ");
    }
  }

  function reset() {
    setLocation([2, 2]);
    setStep(0);
    setMessage("");
  }


  const initialIndex = (location[1] - 1) * 3 + location[0] - 1;
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({location.join(", ")})</h3>
        <h3 id="steps">{step} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === initialIndex ? " active" : ""}`}
          >
            {idx === initialIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={left}>
          SOL
        </button>
        <button id="up" onClick={up}>
          YUKARI
        </button>
        <button id="right" onClick={right}>
          SAĞ
        </button>
        <button id="down" onClick={down}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          RESET
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Emailinizi girin"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
