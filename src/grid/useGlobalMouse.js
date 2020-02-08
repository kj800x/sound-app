import { useEffect, useState } from "react";

function useGlobalMouse(handleMouseMove) {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const muListener = () => setMouseDown(false);
    document.addEventListener("mouseup", muListener);
    return () => {
      document.removeEventListener("mouseup", muListener);
    };
  }, [setMouseDown]);

  useEffect(() => {
    if (mouseDown) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [mouseDown, handleMouseMove]);

  return { onMouseDown: () => setMouseDown(true) };
}

export default useGlobalMouse;
