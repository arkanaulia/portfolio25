"use client";
import { useRef } from "react";
import ReactLenis from "@studio-freight/react-lenis";
import Image from "next/image";
import { FaDroplet } from "react-icons/fa6";

import Nav from "./component/Nav/Nav";
import HoverLogo from "./component/HoverLogo";
import ExplosionContainer from "./component/ExplosionContainer";
import Cards from "./component/Cards/Cards";
import Separate from "./component/Separate/Separate";
import LandingReveal from "./component/LandingReveal/LandingReveal";

export default function Home() {
  const container = useRef(null);

  return (
    <ReactLenis root>
      <LandingReveal />
      <Nav />
      <div className="container" ref={container}>
        {/* Hero and Intro Sections */}
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
          <div className="z-50 backdrop-opacity-50 backdrop-blur-xl bg-neutral-900">
            <div className="w-full flex flex-row h-[65vh] justify-between z-0">
              <div className="">
                <Image
                  src="/herologo.svg"
                  alt="herologo"
                  width={1000}
                  height={1000}
                  className="h-full w-full"
                />
              </div>
              <div className="w-[85%] p-6">
                <HoverLogo />
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <Separate />
        </section>

        {/* Cards Section */}
        <Cards containerRef={container} />

        {/* Footer */}
        <footer className="footer">
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
