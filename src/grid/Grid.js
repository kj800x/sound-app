import React, { useState } from "react";
import GridDots from "./GridDots";
import useGlobalMouse from "./useGlobalMouse";

const Grid = () => {
  const [zoomRaw, setZoom] = useState(Math.log(100));
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const zoom = Math.exp(zoomRaw);

  const handleMouseMove = ({ movementX, movementY }) => {
    setXOffset(xOffset - movementX);
    setYOffset(yOffset - movementY);
  };

  const [onMouseDown] = useGlobalMouse(handleMouseMove);

  const handleMouseScroll = ({ deltaY }) => setZoom(zoomRaw + deltaY * 0.01);

  return (
    <div className="grid" onMouseDown={onMouseDown} onWheel={handleMouseScroll}>
      <GridDots
        xMin={-20}
        xMax={20}
        yMin={-20}
        yMax={20}
        x={xOffset}
        y={yOffset}
        zoom={zoom}
      />
    </div>
  );
};

export default Grid;
