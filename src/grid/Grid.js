import React, { useState, useRef } from "react";
import GridDots from "./GridDots";
import useGlobalMouse from "./useGlobalMouse";
import SceneObjects from "./SceneObjects";

const Grid = ({ scene }) => {
  // In ln(pixel coords)
  const [zoomRaw, setZoomRaw] = useState(Math.log(10));
  // In grid coords
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  // In pixel coords
  const [mouseLoc, setMouseLoc] = useState(undefined);
  const gridRef = useRef();

  // In pixel coords
  const zoom = Math.exp(zoomRaw);

  const mtog = (x, y) => {
    const rect = gridRef.current.getBoundingClientRect();
    const xPxl = x - rect.left;
    const yPxl = y - rect.top;
    return [(xPxl - xOffset) / zoom, (yPxl - yOffset) / zoom];
  };

  // const gtom = (x, y) => {
  //   const rect = gridRef.current.getBoundingClientRect();
  //   const xPxl = x * zoom + xOffset + rect.left;
  //   const yPxl = y * zoom + yOffset + rect.top;
  //   return [xPxl, yPxl];
  // };

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

    // setXOffset(xOffset + xPxl * (1 - zoom));
    // setYOffset(yOffset + yPxl * (1 - zoom));
  };

  return (
    <>
      <div
        ref={gridRef}
        className="grid"
        onWheel={handleMouseScroll}
        onMouseMove={e => setMouseLoc([e.target, e.pageX, e.pageY])}
        {...gmEvents}
      >
        <GridDots
          xMin={-20}
          xMax={20}
          yMin={-20}
          yMax={20}
          x={xOffset}
          y={yOffset}
          zoom={zoom}
        />
        <SceneObjects scene={scene} />
      </div>
      {mouseLoc &&
        (() => {
          const pos = mtog(mouseLoc[1], mouseLoc[2], mouseLoc[0]);
          return (
            <div>
              X: {mouseLoc[1]} [{pos[0]}]
              <br />
              Y: {mouseLoc[2]} [{pos[1]}]
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
