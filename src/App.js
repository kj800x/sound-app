import React from "react";
import "./App.css";

import Grid from "./grid/Grid";

function App() {
  const scene = [
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
  return (
    <div className="App">
      <div className="grid-container">
        <Grid scene={scene} />
      </div>
    </div>
  );
}

export default App;
