"use client";

import Link from "next/link";
import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LuArrowUpRight } from "react-icons/lu";
import { RiInstagramFill } from "react-icons/ri";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Links({ ws }) {
  const lotiRef = useRef(null);
  const navRef = useRef(null);
  const hitRef = useRef(null);
  const hitRef2 = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY.current) {
        // Scrolling down
        gsap.to(hitRef2.current, {
          width: "0px",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(hitRef.current, {
          width: "0px",
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      } else {
        // Scrolling up
        gsap.to(hitRef2.current, {
          width: "auto",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(hitRef.current, {
          width: "auto",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        });
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dotLottieRef = useRef(null);

  return (
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
                  Open for Projects
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
                Grab a Coffee?
                <LuArrowUpRight className="inline-block -ml-2 transition-all duration-300 group-hover:ml-1 group-hover:opacity-100 opacity-0 " />
              </Link>

              <div className="h-[2px]  group-hover:w-full transition-all duration-300 w-0 bg-orange-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
