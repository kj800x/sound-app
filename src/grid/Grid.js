import React, { useState, useRef } from "react";
import GridDots from "./GridDots";
import useGlobalMouse from "./useGlobalMouse";
import SceneObjects from "./SceneObjects";

const Grid = ({ scene }) => {
  const [zoomRaw, setZoomRaw] = useState(Math.log(100));
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [mouseLoc, setMouseLoc] = useState(undefined);
  const gridRef = useRef();

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
    setXOffset(xOffset + movementX);
    setYOffset(yOffset + movementY);
  };

  const gmEvents = useGlobalMouse(handleMouseMove);

  const handleMouseScroll = ({ deltaY, ...e }) => {
    setZoomRaw(zoomRaw + deltaY * 0.01);
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
