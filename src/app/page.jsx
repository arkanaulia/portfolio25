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
import { RiInstagramFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const logooRef = useRef(null);
  const bglogoRef = useRef(null);
  const lotiRef = useRef(null);
  const logoheroRef = useRef(null);
  const navRef = useRef(null);
  const hitRef = useRef(null);
  const hitRef2 = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".logocon",
        start: "top 10%",
        end: "top -120%",
        scrub: true,
      },
    });

    tl.to(
      logooRef.current,
      {
        width: "0%",
      },
      "<"
    ).to(
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

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        // Play your effect here (e.g., hide nav)
        gsap.to(hitRef2.current, {
          width: "0%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(hitRef.current, {
          width: "0%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Scrolling up
        // Play your effect here (e.g., show nav)
        gsap.to(hitRef2.current, {
          width: "100%",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(hitRef.current, {
          width: "100%",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dotLottieRef = useRef(null);

  return (
    <ReactLenis root options={{ gestureOrientation: "both", syncTouch: true }}>
      {/* <LandingReveal /> */}
      {/* <Nav /> */}
      <div
        ref={navRef}
        className="px-20 z-50 w-max fixed bottom-6 flex justify-end justify-self-center"
      >
        <div className="navrev flex flex-row items-center justify-between w-full h-16 backdrop-blur-md text-center  bg-white/10 border border-white/30 rounded-full shadow-lg py-2 pr-2 ">
          <div className="flex flex-row items-center justify-center w-max">
            <div className="flex flex-row items-center justify-center">
              <Link
                href={"/"}
                className="text-lg font-bold  transition-all duration-300 hover:w-max 
       text-center  hover:mr-4 hover:pl-6 "
              >
                <div className="h-10 z-[100] w-max  flex justify-center items-center">
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
              <div ref={hitRef2} className=" overflow-hidden ">
                <div className="flex flex-row pr-6 py-2 overflow-hidden w-max mr-6 border border-white/30 rounded-full items-center justify-center">
                  <DotLottieReact
                    src="/activated.lottie"
                    autoplay
                    loop
                    className="h-6 "
                  />
                  <h1 className="text-md font-semibold text-white w-max">
                    Open to Work
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center justify-center h-max w-max backdrop-blur-md text-center bg-white/5 border border-white/30 rounded-full shadow-lg ">
              <div className="w-max  rounded-full px-6 py-2  flex justify-center items-center text-white transition hover:bg-white/20 hover:border-white/50">
                <Link href={"/"} className="text-lg font-bold w-max">
                  Projects
                </Link>
              </div>
              <div className="w-max rounded-full px-6 py-2  flex justify-center items-center text-white transition hover:bg-white/20 hover:border-white/50">
                <Link href={"/"} className="text-lg font-bold w-max">
                  About
                </Link>
              </div>
            </div>
            <div ref={hitRef} className=" overflow-hidden flex flex-row">
              <div className="w-max rounded-full pl-6 py-2 mt-[2px] group flex flex-col transition-all duration-300 justify-start items-center ">
                <Link
                  href={"/"}
                  className="text-lg font-bold text-white w-max transition-all duration-300"
                >
                  <RiInstagramFill className="text-white text-3xl" />
                </Link>

                <div className="h-[2px]  group-hover:w-full transition-all duration-300 w-0 bg-orange-500"></div>
              </div>
              <div className="w-max rounded-full pl-6 py-2 mt-[2px] group flex flex-col transition-all duration-300 justify-start items-center ">
                <Link
                  href={"/"}
                  className="text-lg font-bold text-white w-max transition-all duration-300"
                >
                  <RiLinkedinBoxFill className="text-white text-3xl" />
                </Link>

                <div className="h-[2px]  group-hover:w-full transition-all duration-300 w-0 bg-orange-500"></div>
              </div>

              <div className="w-max rounded-full px-6 py-2 mt-[2px] group flex flex-col transition-all duration-300 justify-start items-center ">
                <Link
                  href={"/"}
                  className="text-lg font-bold text-white w-max transition-all duration-300"
                >
                  Work with Me!
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
          <div className="fixed top-0 left-0 w-full z-0 bg-[#0a0a0a] h-[35vh]">
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
