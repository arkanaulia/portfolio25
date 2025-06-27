"use client";

import { useEffect, useRef } from "react";
import ReactLenis from "lenis/react";
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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LuArrowUpRight } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const logooRef = useRef(null);
  const bglogoRef = useRef(null);
  const lotiRef = useRef(null);
  const logoheroRef = useRef(null);
  const navRef = useRef(null);
  const hitRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".logocon",
        start: "top 10%",
        end: "top -120%",
        scrub: true,
      },
    });

    tl
      .to(logooRef.current, {
        width: "0%",
        duration: 5,
      })
      .to(
        bglogoRef.current,
        {
          width: "100%",
          zIndex: -1,
          // scrub: true,
          filter: "blur(16px)",
          opacity: 0.5,
        },
        "<"
      )
      .to(navRef.current, {
        ease: "power2.inOut",
        width: "auto",
        duration: 5,
      })
      .to(hitRef.current, {
        ease: "power2.inOut",
        width: "0",
        opacity: 0,
        duration: 5,
      }),
      "<";

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

  const dotLottieRef = useRef(null);

  return (
    <ReactLenis root options={{ gestureOrientation: "both", syncTouch: true }}>
      {/* <LandingReveal /> */}
      {/* <Nav /> */}
      <div
        ref={navRef}
        className="px-20 w-[100%] mt-10 z-50 fixed flex justify-end"
      >
        <div className="navrev flex flex-row items-center justify-between w-full h-16 backdrop-blur-md text-center  bg-white/10 border border-white/30 rounded-full shadow-lg py-2 pr-2 ">
          <div
            className="flex flex-row items-center justify-center p-2 h-16 w-16 transition-all duration-300 hover:w-32 
       overflow-hidden text-center rounded-full hover:mx-0 mx-2"
          >
            <Link href={"/"} className="text-lg font-bold">
              <div className="h-10 z-[100] w-max">
                <DotLottieReact
                  src="/logo.lottie"
                  dotLottieRefCallback={(instance) => {
                    dotLottieRef.current = instance;
                  }}
                  onMouseEnter={() => {
                    dotLottieRef.current?.setMode("forward");
                    dotLottieRef.current?.play();
                  }}
                  onMouseLeave={() => {
                    dotLottieRef.current?.setMode("reverse");
                    dotLottieRef.current?.play();
                  }}
                  className=""
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center justify-center h-full w-max backdrop-blur-md text-center bg-white/5 border border-white/30 rounded-full shadow-lg ">
              <div className="w-max  rounded-full px-6 py-2  flex justify-center items-center text-white transition hover:bg-white/20 hover:border-white/50">
                <Link href={"/"} className="text-lg font-bold">
                  Project
                </Link>
              </div>
              <div className="w-max  rounded-full px-6 py-2  flex justify-center items-center text-white transition hover:bg-white/20 hover:border-white/50">
                <Link href={"/"} className="text-lg font-bold">
                  About
                </Link>
              </div>
            </div>
            <div ref={hitRef} className="w-max overflow-hidden">
              <div className="w-max rounded-full px-6 py-2 mt-[2px] group flex flex-col transition-all duration-300 justify-start items-center ">
                <Link
                  href={"/"}
                  className="text-lg font-bold text-white  transition-all duration-300"
                >
                  Contact Me
                  <LuArrowUpRight className="inline-block -ml-2 transition-all duration-300 group-hover:ml-1 group-hover:opacity-100 opacity-0 " />
                </Link>
                <div className="h-[2px]  group-hover:w-full transition-all duration-300 w-0 bg-orange-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[100svw] h-[700vh] overflow-hidden">
        <section className="hero">
          <div className="sticky top-0 left-0 w-full z-0 bg-[#0a0a0a] h-[40vh]">
            <div className="NAME w-full h-full bg-[url(/hero1.png)] p-5 bg-cover bg-center flex items-center justify-center">
              <div className="herologos flex flex-col mt-20 md:flex-row items-start md:items-end justify-center gap-5 md:gap-10 w-[900px]">
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
