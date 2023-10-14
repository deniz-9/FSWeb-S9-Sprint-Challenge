import axios from "axios";
import React, { useState } from "react";

const initialState = {
  message: "",
  email: "",
  steps: 0,
  index: 4,
};

export default function AppFunctional(props) {
  const [state, setState] = useState(initialState);

  function getXY() {
    let x = (state.index % 3) + 1;
    let y = Math.floor(state.index / 3) + 1;

    return { x, y };
  }

  function getXYMesaj() {
    return `Koordinatlar (${getXY().x}, ${getXY().y})`;
  }

  function reset() {
    setState(initialState);
  }

  function sonrakiIndex(yon) {
    let x = getXY().x;
    let y = getXY().y;

    switch (yon) {
      case "left":
        x > 1 &&
          setState({
            ...state,
            index: state.index - 1,
            steps: state.steps + 1,
            message: "",
          });
        break;
      case "right":
        x < 3 &&
          setState({
            ...state,
            index: state.index + 1,
            steps: state.steps + 1,
            message: "",
          });
        break;
      case "up":
        y > 1 &&
          setState({
            ...state,
            index: state.index - 3,
            steps: state.steps + 1,
            message: "",
          });
        break;
      case "down":
        y < 3 &&
          setState({
            ...state,
            index: state.index + 3,
            steps: state.steps + 1,
            message: "",
          });
        break;
      default:
        break;
    }
  }

  function ilerle(evt) {
    const { id: yon } = evt.target;

    if (getXY().x === 1 && yon === "left") {
      setState({
        ...state,
        message: "Sola gidemezsiniz",
      });
    } else if (getXY().x === 3 && yon === "right") {
      setState({
        ...state,
        message: "Sağa gidemezsiniz",
      });
    } else if (getXY().y === 1 && yon === "up") {
      setState({
        ...state,
        message: "Yukarı gidemezsiniz",
      });
    } else if (getXY().y === 3 && yon === "down") {
      setState({
        ...state,
        message: "Aşağıya gidemezsiniz",
      });
    } else {
      sonrakiIndex(yon);
    }
  }

  function onChange(evt) {
    const { name, value } = evt.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function onSubmit(evt) {
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: getXY().x,
        y: getXY().y,
        email: state.email,
        steps: state.steps,
      })
      .then((response) => {
        setState({
          ...state,
          message: response.data.message,
          email: "",
        });
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{state.steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === state.index ? " active" : ""}`}
          >
            {idx === state.index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          name="email"
          onChange={onChange}
          value={state.email}
          placeholder="email girin"
        />
        <input id="submit" type="submit" value="Gönder" />
      </form>
    </div>
  );
}
