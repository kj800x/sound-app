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

function CableItem({ cableType, onSelect, selected }) {
  return (
    <div className="toolbox-item-container">
      <CableSpool type={cableType} onSelect={onSelect} selected={selected} />
    </div>
  );
}

function Toolbox({ onSelect, selectedCable, onDrop }) {
  return (
    <div
      className="toolbox"
      onDragOver={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={e => {
        const object = JSON.parse(e.dataTransfer.getData("object"));
        onDrop(object);
      }}
    >
      {equipmentList.map(equipment => (
        <ToolboxItem equipmentType={equipment.type} key={equipment.type} />
      ))}
      {cablingList.map(cable => (
        <CableItem
          cableType={cable.type}
          key={cable.type}
          selected={selectedCable === cable.type}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default Toolbox;
