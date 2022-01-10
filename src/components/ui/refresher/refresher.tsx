import React, { useRef } from "react";

interface RefresherProps {
  threshold?: number;
  header?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const Refresher: React.FC<RefresherProps> = ({
  refreshing = false,
  threshold = 100,
  header = true,
  onRefresh,
  children,
}) => {
  const { useState, useEffect } = React;
  // const { useSpring, animated, config } = ReactSpring;
  // const ReloadArrowRef = useRef<HTMLElement>(null);

  // const THRESHOLD = threshold;

  // const [refresh, setRefresh] = useState(false);
  // const [dragValue, setDragValue] = useState(0);
  // const [{ y }, set] = useSpring<{
  //   y: ReactSpring.SpringValue<number>;
  // }>(() => ({
  //   y: 0,
  //   config: { ...config, mass: 1, tension: 210, friction: 20 },
  // }));

  // useEffect(() => {
  //   let timerId: NodeJS.Timeout;
  //   if (refresh) {
  //     onRefresh?.();
  //     timerId = setTimeout(() => {
  //       setRefresh(false);
  //       ReloadArrowRef.current?.classList.remove("animate-rotate");
  //       set({ y: 0 });
  //       // Your Request Here...
  //     }, 3000);
  //   }
  //   return () => clearTimeout(timerId);
  // }, [refresh, refreshing, set]);

  // const bind = useDrag(
  //   ({ movement: [x, y], down, velocity, direction: [dx, dy] }) => {
  //     setDragValue(y * 3);
  //     if (refresh) return;
  //     if (!down) {
  //       if (y >= THRESHOLD) {
  //         setRefresh(true);
  //         ReloadArrowRef.current?.classList.add("animate-rotate");
  //         set({ y: THRESHOLD, config: { duration: 250 } });
  //       } else set({ y: 0, config: { duration: 250 } });
  //     } else
  //       set({
  //         y,
  //         config: { duration: 80 },
  //       });
  //   },
  //   {
  //     from: () => [0, y.get()],
  //     bounds: { left: 0, right: 0, top: 0, bottom: THRESHOLD },
  //     rubberband: true,
  //   }
  // );

  return (
    <>
      {header && (
        <div className="relative bg-white h-14 w-full shadow-md z-[1]"></div>
      )}
      <div className="w-full bg-stone-200">
        {/* <div className="relative flex justify-center">
          <animated.div
            className={`absolute bg-white mx-auto rounded-full w-8 h-8 flex items-center justify-center -top-16`}
            style={{
              boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.02),
          0 6.7px 5.3px rgba(0, 0, 0, 0.028),
          0 12.5px 10px rgba(0, 0, 0, 0.035),
          0 22.3px 17.9px rgba(0, 0, 0, 0.042),
          0 41.8px 33.4px rgba(0, 0, 0, 0.05),
          0 100px 80px rgba(0, 0, 0, 0.07)
        `,
              y,
            }}
          >
            <i
              ref={ReloadArrowRef}
              className="las la-redo-alt la-lg fill-current"
              style={{ transform: `rotate(${dragValue}deg)` }}
            ></i>
          </animated.div>
        </div>

        <animated.div
          {...bind()}
          style={{
            position: "relative",
            y,
          }}
        >
          {children}
        </animated.div> */}
      </div>
    </>
  );
};
