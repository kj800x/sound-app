import React from "react";

const GridDot = ({ x, y }) => (
  <div className="grid-dot" style={{ top: y, left: x }} />
);

const GridDots = ({ xMin, yMin, xMax, yMax, x, y, zoom }) => {
  const dots = [];

  for (var i = xMin; i <= xMax; i++) {
    for (var j = yMin; j <= yMax; j++) {
      dots.push(<GridDot key={i + 10000 * j} x={zoom * i} y={zoom * j} />);
    }
  }

  return (
    <div
      className="dots-container"
      style={{ position: "absolute", top: -y, left: -x }}
    >
      {dots}
    </div>
  );
};

export default GridDots;
