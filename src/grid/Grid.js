import React, { useState, useDebugValue } from "react";

const GRID_SPACING = 10;

const VertBar = ({ x }) => {
  return <div className="vertBar" style={{ left: x }} />;
};
const HorizBar = ({ y }) => {
  return <div className="horizBar" style={{ top: y }} />;
};

const Grid = ({ width, height }) => {
  const [zoomRaw, setZoom] = useState(1);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const zoom = Math.exp(zoomRaw);
  console.log({ zoom, zoomRaw });

  const ZOOM_SPACING = GRID_SPACING * zoom;

  const handleMouseMove = ({ movementX, movementY }) => {
    if (mouseDown) {
      setXOffset(xOffset - movementX);
      setYOffset(yOffset - movementY);
    }
  };
  const handleMouseScroll = ({ deltaY }) => setZoom(zoomRaw + deltaY * 0.01);

  // Convert from grid position to display position
  const x = x => zoom * x - xOffset;
  const y = y => zoom * y - yOffset;

  return (
    <div
      className="grid"
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={handleMouseMove}
      onWheel={handleMouseScroll}
    >
      <VertBar x={x(10)} />
      <VertBar x={x(20)} />
      <HorizBar y={y(10)} />
      <HorizBar y={y(20)} />
    </div>
  );
};

export default Grid;
