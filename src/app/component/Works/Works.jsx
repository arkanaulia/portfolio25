"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const listsecRefs = useRef([]);
  const workcardRefs = useRef([]);
  const parlistconRefs = useRef([]);

  const addToListsecRefs = (el) => {
    if (el && !listsecRefs.current.includes(el)) {
      listsecRefs.current.push(el);
    }
  };

  const addToWorkcardRefs = (el) => {
    if (el && !workcardRefs.current.includes(el)) {
      workcardRefs.current.push(el);
    }
  };

  const addToParlistconRefs = (el) => {
    if (el && !parlistconRefs.current.includes(el)) {
      parlistconRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.to(".titles", {
      scrollTrigger: {
        trigger: ".titles",
        pin: true,
        start: "top top",
        endTrigger: ".parlistcon4",
        end: "top 30%",
        scrub: true,
      },
    });

    [1, 2, 3, 4].forEach((i) => {
      gsap.to(`.listsec${i}`, {
        scrollTrigger: {
          trigger: `.listsec${i}`,
          pin: true,
          start: "top 30%",
          endTrigger: i === 4 ? ".parlistcon4" : `.parlistcon${i + 1}`,
          end: i === 4 ? "bottom bottom" : "top 70%",
          scrub: true,
        },
      });
    });

    parlistconRefs.current.forEach((parlistcon, idx) => {
      const cards = Array.from(parlistcon.querySelectorAll(".workcard"));
      cards.forEach((card, i) => {
        const startPercent = 30 + i * 5;
        if (i === cards.length - 1) {
          gsap.to(parlistcon, {
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              start: `top ${startPercent - 5}%`,
              end: "bottom 40%",
              scrub: true,
            },
          });
        }
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            pin: true,
            start: `top ${startPercent - 4}%`,
            endTrigger: parlistconRefs.current[idx + 1] || parlistcon,
            end: parlistconRefs.current[idx + 1] ? "top 70%" : "bottom bottom",
            scrub: true,
          },
        });
      });
    });
  }, []);

  // Detect if desktop
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  return (
    <div className="con relative">
      <div className="titles absolute w-full">
        <h1 className="text-orange-500 font-display text-center text-4xl md:text-7xl absolute inset-0 flex mt-20 md:mt-32 justify-center blur-[2px] md:blur-xs">
          Selected Works
        </h1>
        <p className="text-white font-light font-sans text-md md:text-xl absolute inset-0 flex md:mt-36 mt-20 justify-center">
          Not that bad. I guess.
        </p>
      </div>

      <div className="w-full h-[30vh] md:h-[40vh]"></div>

      {/* Section Template */}
      {[
        {
          title: "Dev Projects",
          classSuffix: 1,
          images: ["/img-5.gif", "/img-6.gif", "/emr.webp"],
        },
        {
          title: "UX Projects",
          classSuffix: 2,
          images: ["/img-1.gif", "/img-2.gif", "/img-3.gif"],
        },
        {
          title: "3D Projects",
          classSuffix: 3,
          images: ["/sicepat.jpg", "/holy.jpg", "/yarsi.jpg"],
        },
        {
          title: "PM and Analyst",
          classSuffix: 4,
          images: ["/pm2.jpg"],
        },
      ].map(({ title, classSuffix, images }, i) => (
        <div
          key={classSuffix}
          ref={addToParlistconRefs}
          className={`w-full flex flex-col md:flex-row justify-between mt-10 px-4 md:px-20 parlistcon${classSuffix}`}
        >
          {/* Always show on mobile, conditional on desktop */}
          {(isDesktop ? classSuffix % 2 === 1 || classSuffix === 3 : true) && (
            <div
              ref={addToListsecRefs}
              className={`listsec${classSuffix} w-full md:w-1/2 flex justify-center items-center h-32 md:h-96 mb-4 md:mb-0`}
            >
              <h1 className="font-bold text-3xl md:text-6xl text-white text-center">
                {title}
              </h1>
            </div>
          )}

          <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
            {images.map((src, idx) => (
              <div
                key={idx}
                ref={addToWorkcardRefs}
                className="w-full border-4 border-white/30 h-72 md:h-96 rounded-3xl workcard overflow-hidden"
              >
                <Image
                  src={src}
                  alt=""
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Only show on desktop and for even classSuffix except 3 */}
          {isDesktop && classSuffix % 2 === 0 && classSuffix !== 3 && (
            <div
              ref={addToListsecRefs}
              className={`listsec${classSuffix} w-full md:w-1/2 flex justify-center items-center h-32 md:h-96 mt-4 md:mt-0`}
            >
              <h1 className="font-bold text-3xl md:text-6xl text-white text-center">
                {title}
              </h1>
            </div>
          )}
        </div>
      ))}

      <div className="mt-[30vh] md:mt-[40vh] w-full relative">
        <h1 className="text-orange-500 font-display text-center text-4xl md:text-7xl absolute inset-0 flex -mt-14 md:-mt-20 justify-center blur-[2px] md:blur-xs">
          Grab some Coffee
        </h1>
        <p className="text-white font-light font-sans text-md md:text-xl absolute inset-0 flex md:-mt-16 -mt-12 justify-center">
          Contact Me.
        </p>
        <div className="flex justify-center gap-3 md:gap-8 mt-8 z-20">
          {["LinkedIn", "Email", "Instagram"].map((label, idx) => (
            <a
              key={idx}
              href=""
              className="backdrop-blur-md h-max bg-white/10 border border-white/30 rounded-xl px-4 py-3 md:px-8 md:py-4 text-white font-semibold shadow-lg transition hover:bg-white/20 hover:border-white/50"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
