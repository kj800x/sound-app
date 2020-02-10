import React, { useState, useRef } from "react";
import GridDots from "./GridDots";
import useGlobalMouse from "./useGlobalMouse";
import SceneObjects from "./SceneObjects";

const Grid = ({ scene, onSelect, onDrop }) => {
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

  // Page mouse pixel coords to grid coords
  const mtog = (x, y) => {
    const rect = gridRef.current.getBoundingClientRect();
    return [xOffset + (x - rect.left) / zoom, yOffset + (y - rect.top) / zoom];
  };

  // Grid coords to grid pixel coords (not page)
  const gtom = (x, y) => {
    const xPxl = (x + xOffset) * zoom;
    const yPxl = (y + yOffset) * zoom;
    return [xPxl, yPxl];
  };

  const handleMouseMove = ({ movementX, movementY }) => {
    setXOffset(xOffset - movementX / zoom);
    setYOffset(yOffset - movementY / zoom);
  };

  const gmEvents = useGlobalMouse(handleMouseMove);

  const handleMouseScroll = ({ deltaY, ...e }) => {
    const rect = gridRef.current.getBoundingClientRect();
    const deltaZoomRaw = deltaY * -0.001;
    const newZoom = Math.exp(zoomRaw + deltaZoomRaw);
    const zoomFactor = newZoom / zoom;
    setZoomRaw(zoomRaw + deltaZoomRaw);
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    const dx = x * (1 - zoomFactor);
    const dy = y * (1 - zoomFactor);
    setXOffset(xOffset - dx / zoom);
    setYOffset(yOffset - dy / zoom);
  };

  return (
    <>
      <div
        ref={gridRef}
        className="grid"
        onWheel={handleMouseScroll}
        onMouseMove={e => setMouseLoc([e.pageX, e.pageY])}
        onClick={() => onSelect(undefined)}
        {...gmEvents}
        onDragOver={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={e => {
          onDrop(
            e.dataTransfer.getData("id"),
            mtog(
              e.pageX - e.dataTransfer.getData("mousePosX"),
              e.pageY - e.dataTransfer.getData("mousePosY")
            )
          );
        }}
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
          const xy = mtog(mouseLoc[0], mouseLoc[1]);
          return (
            <div>
              X: {mouseLoc[0]} [{xy[0]}]
              <br />
              Y: {mouseLoc[1]} [{xy[1]}]
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
