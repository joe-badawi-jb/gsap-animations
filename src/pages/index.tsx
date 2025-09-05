import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
  const methodsTweenRef = useRef<gsap.core.Tween | null>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const timeline1Ref = useRef<gsap.core.Timeline | null>(null);
  const timeline2Ref = useRef<gsap.core.Timeline | null>(null);
  const timeline3Ref = useRef<gsap.core.Timeline | null>(null);

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

    const tl1 = gsap.timeline({ paused: true }); // Pause the timeline, not individual tweens
    tl1
      .fromTo("#first", { x: 0 }, { x: 200, duration: 1, ease: "ease-in-out" })
      .fromTo("#second", { x: 0 }, { x: 200, duration: 2, ease: "ease-in-out" })
      .fromTo("#third", { x: 0 }, { x: 200, duration: 2, ease: "ease-in-out" });

    timeline1Ref.current = tl1;

    const tl2 = gsap.timeline({ paused: true }); // Pause the timeline, not individual tweens
    tl2
      .fromTo("#pos1", { x: 0 }, { x: 200, duration: 1, ease: "ease-in-out" })
      .fromTo(
        "#pos2",
        { x: 0 },
        { x: 200, duration: 2, ease: "ease-in-out" },
        "+=2"
      )
      .fromTo(
        "#pos3",
        { x: 0 },
        { x: 200, duration: 2, ease: "ease-in-out" },
        "<"
      );

    timeline2Ref.current = tl2;
  });

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-4xl">GSAP Tween examples</h1>
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
          <div className="w-full">
            <div className="tween-methods h-20 w-20 rounded-lg bg-green-500"></div>
          </div>

          <div className="flex gap-3 items-center mt-4 flex-wrap">
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

      <div className="w-1/4 border-t-4 border-gray-300 border-dotted my-20 mx-auto"></div>

      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-4xl">GSAP Timeline examples</h1>
        <h2 className="font-bold text-2xl">
          Timeline allows to control all tweens as a whole and manage their
          timing together
        </h2>

        <div className="flex flex-col gap-5">
          <div id="first" className="h-20 w-20 rounded-lg bg-red-500"></div>
          <div id="second" className="h-20 w-20 rounded-lg bg-blue-500"></div>
          <div id="third" className="h-20 w-20 rounded-lg bg-green-500"></div>
          <div className="flex gap-3 items-center flex-wrap">
            <div
              onClick={() => timeline1Ref.current?.play()}
              className="cursor-pointer rounded-[30px] bg-green-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Play Timeline</p>
            </div>
            <div
              onClick={() => timeline1Ref.current?.pause()}
              className="cursor-pointer rounded-[30px] bg-red-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Pause</p>
            </div>
            <div
              onClick={() => timeline1Ref.current?.reverse()}
              className="cursor-pointer rounded-[30px] bg-gray-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Reverse</p>
            </div>
            <div
              onClick={() => timeline1Ref.current?.restart()}
              className="cursor-pointer rounded-[30px] bg-blue-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Restart</p>
            </div>
            <div
              onClick={() => timeline1Ref.current?.progress(0.5)}
              className="cursor-pointer rounded-[30px] bg-purple-400 px-5 py-1 flex items-center justify-center"
            >
              <p>50% Progress</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          <h2 className="text-2xl font-bold">
            Second and third tween starts after first tween with a delay of 2s
          </h2>
          <div id="pos1" className="h-20 w-20 rounded-lg bg-red-500"></div>
          <div id="pos2" className="h-20 w-20 rounded-lg bg-blue-500"></div>
          <div id="pos3" className="h-20 w-20 rounded-lg bg-green-500"></div>
          <div id="pos4" className="h-20 w-20 rounded-lg bg-gray-500"></div>
          <div className="flex gap-3 items-center flex-wrap">
            <div
              onClick={() => timeline2Ref.current?.play()}
              className="cursor-pointer rounded-[30px] bg-green-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Play Timeline</p>
            </div>
            <div
              onClick={() => timeline2Ref.current?.pause()}
              className="cursor-pointer rounded-[30px] bg-red-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Pause</p>
            </div>
            <div
              onClick={() => timeline2Ref.current?.reverse()}
              className="cursor-pointer rounded-[30px] bg-gray-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Reverse</p>
            </div>
            <div
              onClick={() => timeline2Ref.current?.restart()}
              className="cursor-pointer rounded-[30px] bg-blue-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Restart</p>
            </div>

            <div
              onClick={() => {
                // Reset pos4 first, then add it to timeline and play
                gsap.set("#pos4", { x: 0 }); // Reset pos4 position
                timeline2Ref.current?.restart();
                timeline2Ref.current?.add(
                  gsap.fromTo(
                    "#pos4",
                    { x: 0 },
                    { x: 200, duration: 2, ease: "ease-in-out" }
                  ),
                  ">" // Add after current timeline content
                );
                timeline2Ref.current?.play();
              }}
              className="cursor-pointer rounded-[30px] bg-orange-400 px-5 py-1 flex items-center justify-center"
            >
              <p>Add pos4 to timeline and play</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4 border-t-4 border-gray-300 border-dotted my-20 mx-auto"></div>

      <h1 className="font-bold text-4xl mb-3">GSAP Easing</h1>
      <h2 className="text-2xl font-bold">
        Easing is used to control the speed of the animation, you can check{" "}
        <a
          href="https://gsap.com/docs/v3/Eases"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-all duration-300 hover:text-[#0ae448]"
        >
          HERE
        </a>
      </h2>

      <div className="w-1/4 border-t-4 border-gray-300 border-dotted my-20 mx-auto"></div>

      <div className="flex justify-end">
        <Link href={"/scrolltrigger"}>
          <div className="rounded-xl shadow-2xl p-4 h-40 flex flex-col justify-between transition-all duration-300 hover:bg-green-500">
            <h1 className="font-bold text-2xl">Check ScrollTrigger Examples</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}
