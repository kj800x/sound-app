import React from "react";
import classNames from "classnames";
import "./CableSpool.css";
import cablingList from "../cabling";

function CableSpool({ type, selected, onSelect }) {
  const cable = cablingList.find(cable => cable.type === type);

  const { label, color } = cable;

  return (
    <div
      className={classNames(type, "cable-spool", { selected })}
      style={{ backgroundColor: color }}
      onClick={() => {
        if (selected) {
          onSelect(undefined);
        } else {
          onSelect(type);
        }
      }}
    >
      {label}
    </div>
  );
}

export default CableSpool;
