"use client";

import { useEffect, useRef } from "react";
import ReactLenis from "lenis/react";
import Image from "next/image";
import { FaDroplet } from "react-icons/fa6";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Nav from "./component/Nav/Nav";
import HoverLogo from "./component/HoverLogo";
import ExplosionContainer from "./component/ExplosionContainer";
import Cards from "./component/Cards/Cards";
import Separate from "./component/Separate/Separate";
import LandingReveal from "./component/LandingReveal/LandingReveal";
import Works from "./component/Works/Works";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const logooRef = useRef(null);
  const bglogoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".logocon",
        start: "top 30%",
        end: "top -30%",
        scrub: true,
      },
    });

    tl.to(logooRef.current, {
      width: "0%",
    }).to(
      bglogoRef.current,
      {
        width: "100%",
        zIndex: -1,
        // scrub: true,
        filter: "blur(16px)",
        opacity: 0.5,
      },
      "<"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    // Pin the titles as before
    gsap.to(".logocon", {
      scrollTrigger: {
        trigger: ".logocon",
        start: "top top",
        endTrigger: ".container",
        end: "bottom 30%",
        pin: true,
        scrub: true,
      },
    });
  }, []);

  // Enable Lenis smooth scroll on touch devices
 

  return (
    <ReactLenis root options={{ gestureOrientation: "both", syncTouch: true }}>
      {/* <LandingReveal /> */}
      <Nav />
      <div className="container max-w-[100svw] overflow-x-hidden">
        <section className="hero">
          <div className="sticky top-0 left-0 w-full z-0 bg-[#0a0a0a] h-[35vh]">
            <div className="NAME w-full h-full bg-[url(/hero1.png)] p-5 bg-cover bg-center flex items-center justify-center">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-center gap-5 md:gap-12 w-[900px]">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={2000}
                  height={2000}
                  className="w-max md:h-44 h-16"
                />
                <div className="inline-flex flex-col md:items-start">
                  <h1 className="text-orange-500 font-display md:text-4xl text-3xl -mb-1 mix-blend-difference">
                    Everything.
                  </h1>
                  <p className="text-white md:text-lg text-xs font-light text-left font-sans">
                    Unfortunately born to be jack of all trades—analyze, design,
                    code, write, fix, plan—you name it. Not too flashy, just the
                    one who gets it done when no one else can. Because in the
                    end, everyone needs everything.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="logocon z-10 backdrop-opacity-50 backdrop-blur-xl bg-neutral-900">
            <div className="w-full flex flex-row h-[100vh] justify-between items-start z-0">
              <div className="logoo max-w-[20%]" ref={logooRef}>
                <Image
                  src="/herologo.svg"
                  alt="herologo"
                  width={500}
                  height={500}
                  className="pt-4"
                />
              </div>
              <div
                className="w-full h-[100vh] p-6 bglogo rounded-3xl overflow-hidden"
                ref={bglogoRef}
              >
                <HoverLogo />
              </div>
            </div>
          </div>
        </section>

        <section className="z-20 ">
          <Separate />
        </section>

        <section className="z-20 ">
          <Cards containerRef={container} />
        </section>

        <section className="mt-[280vh] z-20">
          <Works />
        </section>

        <footer className="footer z-20">
          <h1>Everyone Needs Everything</h1>
          <div className="copyright-info">
            <p>&copy; 2025 arkanaulia</p>
            <p className="flex flex-row items-center gap-1">
              Built with Blood and Tears <FaDroplet />
            </p>
          </div>
          <ExplosionContainer />
        </footer>
      </div>
    </ReactLenis>
  );
}
