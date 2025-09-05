/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function App({ Component, pageProps }: AppProps) {
  gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
  // register the effect with GSAP:

  gsap.registerEffect({
    name: "fade",
    effect: (targets: any) => {
      return gsap.fromTo(
        targets,
        { opacity: 0, y: "10px" },
        { duration: 2, opacity: 1, y: "0px" }
      );
    },
    defaults: { duration: 2 }, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, //now you can call the effect directly on any GSAP timeline to have the result immediately inserted in the position you define (default is sequenced at the end)
  });

  // gsap.globalTimeline.timeScale(4); // accelerates ALL animations by x times

  return <Component {...pageProps} />;
}
