import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Home() {
  gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
  const methodsTweenRef = useRef<gsap.core.Tween | null>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    gsap.effects.fade(".box");
    const tween = gsap.fromTo(
      ".from-to",
      { opacity: 0 },
      { duration: 2, opacity: 1 }
    );
    tween.delay(1);
    const methodsTween = gsap.fromTo(
      ".tween-methods",
      {
        rotation: 0,
        paused: true, // Start paused so we can control it with buttons
      },
      {
        rotation: 360,
        x: "400px",
        duration: 5,
        ease: "ease-in-out",
        paused: true, // Start paused so we can control it with buttons
      }
    );
    methodsTweenRef.current = methodsTween;

    const floatTween = gsap.fromTo(
      ".tween-methods",
      {
        y: 0,
        paused: true, // Start paused so we can control it with buttons
      },
      {
        y: "-20px",
        ease: "ease-in-out",
        paused: true, // Start paused so we can control it with buttons
      }
    );
    floatTweenRef.current = floatTween;
  });

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex flex-col gap-10">
        <div>
          <p className="font-semibold">fade in effect using gsap effects</p>
          <div className="box h-20 w-20 rounded-lg bg-red-500"></div>
        </div>
        <div>
          <p className="font-semibold">
            fade in effect using gsap fromTo with a delay of 1 second
          </p>
          <div className="from-to h-20 w-20 rounded-lg bg-blue-500"></div>
        </div>

        <div>
          <p className="font-semibold mb-3">using tween methods on target</p>
          <div className="tween-methods h-20 w-20 rounded-lg bg-green-500"></div>

          <div className="flex gap-3 items-center mt-4">
            <div
              onClick={() => methodsTweenRef.current?.play()}
              className="cursor-pointer rounded-[30px] bg-green-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Play</p>
            </div>
            <div
              onClick={() => methodsTweenRef.current?.pause()}
              className="cursor-pointer rounded-[30px] bg-red-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Pause</p>
            </div>
            <div
              onClick={() => methodsTweenRef.current?.reverse()}
              className="cursor-pointer rounded-[30px] bg-gray-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Reverse</p>
            </div>
            <div
              onClick={() => methodsTweenRef.current?.restart()}
              className="cursor-pointer rounded-[30px] bg-blue-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Restart</p>
            </div>
            <div
              onClick={() =>
                methodsTweenRef.current?.yoyo(true).repeat(3).play()
              }
              className="cursor-pointer rounded-[30px] bg-green-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Play Yoyo 3 times</p>
            </div>
            <div
              onClick={() =>
                methodsTweenRef.current
                  ?.play()
                  .then(() => floatTweenRef.current?.play())
                  .then(() => floatTweenRef.current?.reverse())
                  .then(() => methodsTweenRef.current?.reverse())
              }
              className="cursor-pointer rounded-[30px] bg-green-400 px-5 py-1 flex items-center justify-center"
            >
              <p>After initial animation do something else</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
