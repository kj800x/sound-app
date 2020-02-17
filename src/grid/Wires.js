import React, { useRef, useEffect, useState } from "react";

import cabling from "../cabling";

const getD = (fromPx, toPx) => {
  return `M ${fromPx[0]} ${fromPx[1]} L ${toPx[0]} ${toPx[1]}`;
};

// Use grid coords for svg graphics
const gtom = (x, y) => [x, y];

const Wire = ({ wire }) => {
  const fromPx = gtom(wire.from[0], wire.from[1]);
  const toPx = gtom(wire.to[0], wire.to[1]);
  const color = cabling.find(cable => cable.type === wire.type).color;
  return (
    <path
      d={getD(fromPx, toPx)}
      stroke={color}
      strokeWidth={0.1}
      strokeLinecap="round"
    />
  );
};

const Wires = ({ wires, xOffset, zoom, yOffset }) => {
  const ref = useRef();
  const [box, setBox] = useState({ width: 1, height: 1, top: 0, left: 0 });
  useEffect(() => {
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setBox(entry.contentRect);
      });
    });

    myObserver.observe(ref.current.parentElement);

    return () => {
      myObserver.disconnect();
    };
  }, [setBox, ref]);

  return (
    <svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox={`${xOffset} ${yOffset} ${box.width / zoom} ${box.height / zoom}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%"
      }}
    >
      {wires.map((wire, i) => (
        <Wire wire={wire} key={i} />
      ))}
    </svg>
  );
};
export default Wires;
