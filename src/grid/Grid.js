import React, { useState, useRef } from "react";
import GridDots from "./GridDots";
import useGlobalMouse from "./useGlobalMouse";
import SceneObjects from "./SceneObjects";

const Grid = ({ scene, onSelect }) => {
  // In ln(pixel coords)
  const [zoomRaw, setZoomRaw] = useState(Math.log(70));
  // In grid coords
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  // In pixel coords
  const [mouseLoc, setMouseLoc] = useState(undefined);
  const gridRef = useRef();

  // In pixel coords
  const zoom = Math.exp(zoomRaw);

  // const mtog = (x, y) => {
  //   const rect = gridRef.current.getBoundingClientRect();
  //   const xPxl = x - rect.left;
  //   const yPxl = y - rect.top;
  //   return [(xPxl - xOffset) / zoom, (yPxl - yOffset) / zoom];
  // };

  const gtom = (x, y) => {
    // const rect = gridRef.current
    //   ? gridRef.current.getBoundingClientRect()
    //   : { left: 0, top: 0 };
    const xPxl = (x + xOffset) * zoom;
    const yPxl = (y + yOffset) * zoom;
    return [xPxl, yPxl];
  };

  const handleMouseMove = ({ movementX, movementY }) => {
    setXOffset(xOffset + movementX / zoom);
    setYOffset(yOffset + movementY / zoom);
  };

  const gmEvents = useGlobalMouse(handleMouseMove);

  const handleMouseScroll = ({ deltaY, ...e }) => {
    const rect = gridRef.current.getBoundingClientRect();
    const deltaZoomRaw = deltaY * 0.001;
    const newZoom = Math.exp(zoomRaw + deltaZoomRaw);
    const zoomFactor = newZoom / zoom;
    setZoomRaw(zoomRaw + deltaZoomRaw);
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    const dx = x * (1 - zoomFactor);
    const dy = y * (1 - zoomFactor);
    setXOffset(xOffset + dx / zoom);
    setYOffset(yOffset + dy / zoom);
  };

  return (
    <>
      <div
        ref={gridRef}
        className="grid"
        onWheel={handleMouseScroll}
        onMouseMove={e => setMouseLoc([e.target, e.pageX, e.pageY])}
        onClick={e => onSelect(undefined)}
        {...gmEvents}
      >
        <GridDots
          xMin={-10}
          xMax={10}
          yMin={-10}
          yMax={10}
          x={xOffset}
          y={yOffset}
          zoom={zoom}
        />
        <SceneObjects
          gtom={gtom}
          scene={scene}
          zoom={zoom}
          onSelect={onSelect}
        />
      </div>
      {mouseLoc &&
        (() => {
          return (
            <div>
              X: {mouseLoc[1]}
              <br />
              Y: {mouseLoc[2]}
              <br />
              xOffset: {xOffset}
              <br />
              yOffset: {yOffset}
              <br />
              zoom: {zoom} [{zoomRaw}]
            </div>
          );
        })()}
    </>
  );
};

export default Grid;
