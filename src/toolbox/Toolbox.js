import React from "react";
import { SceneObject } from "../grid/SceneObjects";
import equipmentList from "../equipment";
import cablingList from "../cabling";
import CableSpool from "./CableSpool";

import "./Toolbox.css";

const MOCK_GTOM = () => [0, 0];

function ToolboxItem({ equipmentType }) {
  return (
    <div className="toolbox-item-container">
      <SceneObject
        object={{ id: "__NEW__", type: equipmentType }}
        gtom={MOCK_GTOM}
        zoom={70}
        onSelect={() => {}}
      />
    </div>
  );
}

function CableItem({ cableType }) {
  return (
    <div className="toolbox-item-container">
      <CableSpool type={cableType} />
    </div>
  );
}

function Toolbox() {
  return (
    <div className="toolbox">
      {equipmentList.map(equipment => (
        <ToolboxItem equipmentType={equipment.type} key={equipment.type} />
      ))}
      {cablingList.map(cable => (
        <CableItem cableType={cable.type} key={cable.type} />
      ))}
    </div>
  );
}

export default Toolbox;
