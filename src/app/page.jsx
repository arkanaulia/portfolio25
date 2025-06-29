"use client";

import { useEffect, useRef } from "react";
import ReactLenis from "lenis/react";
import { useLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import { FaDroplet } from "react-icons/fa6";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState } from "react";
import Link from "next/link";

import Nav from "../_component/Nav/Nav";
import HoverLogo from "../_component/HoverLogo";
import ExplosionContainer from "../_component/ExplosionContainer";
import Cards from "../_component/Cards/Cards";
import Separate from "../_component/Separate/Separate";
import LandingReveal from "../_component/LandingReveal/LandingReveal";
import Works from "../_component/Works/Works";
import Links from "@/_component/Links/Links";

import OverlayOne from "../_component/overlays/OverlayOne";
import OverlayTwo from "../_component/overlays/OverlayTwo";
import OverlayThree from "../_component/overlays/OverlayThree";
import OverlayFour from "../_component/overlays/OverlayFour";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const logooRef = useRef(null);
  const bglogoRef = useRef(null);
  const logoheroRef = useRef(null);

  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const closeOverlay = () => setActiveCardIndex(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".logocon",
        start: "top 20%",
        end: "top -80%",
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
      },
      "<"
    );
    // .to(
    //   navRef.current,
    //   {
    //     ease: "power2.inOut",
    //     width: "max-content",
    //   },
    //   "<"
    // )
    // .to(
    //   hitRef.current,
    //   {
    //     ease: "power2.inOut",
    //     width: "0",
    //     opacity: 0,
    //   },
    //   "<"
    // )
    // .to(
    //   hitRef2.current,
    //   {
    //     ease: "power2.inOut",
    //     width: "0",
    //     opacity: 0,
    //   },
    //   "<"
    // );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".herologos",
        start: "top top",
        endTrigger: ".logocon",
        end: "top top",
        scrub: true,
      },
    });

    tl.to(logoheroRef.current, {
      marginTop: "-10vh",
    });

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

  let [ws, setWs] = useState(0);

  useEffect(() => {
    const handleScroll = () => setWs(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial value
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ReactLenis root options={{ gestureOrientation: "both", syncTouch: true }}>
      {/* <LandingReveal /> */}
      {/* <Nav /> */}
      <Links ws={ws} />

      <div className="container max-w-[100svw] h-[700vh]">
        <section className="hero">
          <div className="fixed top-0 left-0 w-full z-0 bg-[#0a0a0a] h-[40vh]">
            <div className="NAME w-full h-full bg-[url(/hero1.png)] p-5 bg-cover bg-center flex items-center justify-center">
              <div className="herologos flex flex-col md:flex-row items-start md:items-end justify-center gap-5 md:gap-10 w-[900px]">
                <div className="w-2/5 md:h-44 h-16">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    height={200}
                    width={200}
                    className="h-44 w-max logoheros"
                    ref={logoheroRef}
                  />
                </div>
                <div className="inline-flex flex-col md:items-start w-3/5">
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

          <div className="logocon z-10 mt-[40vh] backdrop-opacity-50 backdrop-blur-xl bg-neutral-900">
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
          <Cards
            containerRef={container}
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
          />
        </section>
        {/* Render overlays here */}
        {activeCardIndex === 0 && <OverlayOne onClose={closeOverlay} />}
        {activeCardIndex === 1 && <OverlayTwo onClose={closeOverlay} />}
        {activeCardIndex === 2 && <OverlayThree onClose={closeOverlay} />}
        {activeCardIndex === 3 && <OverlayFour onClose={closeOverlay} />}
        {/* ... */}
        <footer className="footer z-20 left-0 top-[700vh]">
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
