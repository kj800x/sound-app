import React from "react";
import "./App.css";

import Grid from "./grid/Grid";

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        <Grid width={500} height={500} zoom={1} xOffset={0} yOffset={0} />
      </div>
    </div>
  );
}

export default App;
