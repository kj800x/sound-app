import React from "react";
import { SceneObject } from "../grid/SceneObjects";

function Toolbox() {
  const gtom = () => [0, 0];
  return (
    <div className="toolbox">
      <div className="toolbox-item-container">
        <SceneObject
          object={{ id: "__NEW__", type: "mixer" }}
          gtom={gtom}
          zoom={70}
          onSelect={() => {}}
        />
      </div>
      <div className="toolbox-item-container">
        <SceneObject
          object={{ id: "__NEW__", type: "speaker" }}
          gtom={gtom}
          zoom={70}
          onSelect={() => {}}
        />
      </div>
      <div className="toolbox-item-container">
        <SceneObject
          object={{ id: "__NEW__", type: "microphone" }}
          gtom={gtom}
          zoom={70}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}

export default Toolbox;
