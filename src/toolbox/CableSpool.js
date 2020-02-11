import React from "react";
import classNames from "classnames";
import "./CableSpool.css";
import cablingList from "../cabling";

function CableSpool({ type }) {
  const cable = cablingList.find(cable => cable.type === type);

  const { label, color } = cable;

  return (
    <div
      className={classNames(type, "cable-spool")}
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );
}

export default CableSpool;
