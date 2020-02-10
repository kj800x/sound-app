import React, { useReducer } from "react";
import "./App.css";

import Grid from "./grid/Grid";

const INITIAL_SCENE = [
  {
    type: "microphone",
    id: "mic",
    x: 1,
    y: 1
  },
  {
    type: "microphone",
    id: "mic2",
    x: 3,
    y: 3
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT": {
      return state.map(obj => ({
        ...obj,
        selected: obj.id === action.payload.id
      }));
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [scene, dispatch] = useReducer(reducer, INITIAL_SCENE);

  return (
    <div className="App">
      <div className="grid-container">
        <Grid
          scene={scene}
          onSelect={id => dispatch({ type: "SELECT", payload: { id } })}
        />
      </div>
    </div>
  );
}

export default App;
