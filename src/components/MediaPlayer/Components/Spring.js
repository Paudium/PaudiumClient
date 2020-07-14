import React, { useRef } from "react";
import { useSpring, a, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import MediaPlayer from "../index";
import "./styles.css";

const height = 300;

export default function App() {
  const draggingRef = useRef(false);
  const [{ y }, set] = useSpring(() => ({ y: height }));

  let myPos = 0;
  const open = ({ canceled }) => {
    set({ y: myPos, config: canceled ? config.wobbly : config.stiff });
  };
  const close = (velocity = 0) => {
    set({ y: height, config: { ...config.stiff, velocity } });
  };
  console.log("Y", y);
  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (first) draggingRef.current = true;
      else if (last) setTimeout(() => (draggingRef.current = false), 0);

      if (last) my > height * 0.5 || vy > 0.5 ? close(vy) : open(vy);
      else set({ y: my, immediate: false, config: config.stiff });
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  return (
    <>
      <a.div
        className="sheet"
        {...bind()}
        style={{ display: "block", bottom: `calc(-100vh + ${height}px)`, y }}
      >
        <MediaPlayer />
      </a.div>
    </>
  );
}
