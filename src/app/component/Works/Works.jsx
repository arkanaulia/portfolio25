"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
    // Pin the titles as before
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

    // Pin each listsec as before
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

    // For each parlistcon, stack its workcards
    parlistconRefs.current.forEach((parlistcon, idx) => {
      // Get all workcards inside this parlistcon
      const cards = Array.from(parlistcon.querySelectorAll(".workcard"));
      cards.forEach((card, i) => {
        // Calculate start position: 30% + (i * 5%)
        const startPercent = 30 + i * 5;

        // If this is the last workcard in the parlistcon, fade out the parlistcon as it scrolls out
        if (i === cards.length - 1) {
          gsap.to(parlistcon, {
            opacity: 0,
            scrollTrigger: {
              trigger: card,
              start: `top ${startPercent - 5}%`, // start fading after pin ends
              end: "bottom 40%", // fully faded when card leaves viewport
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
            // markers: true, // Uncomment for debugging
          },
        });
      });
    });
  }, []);

  return (
    <div className="con ">
      <div className=" titles absolute w-full">
        <h1 className="text-orange-500 font-display text-7xl absolute inset-0 flex mt-32 justify-center blur-xs">
          Selected Works
        </h1>
        <p className="text-white font-light font-sans text-xl absolute inset-0 flex mt-36 justify-center">
          Not that bad. I guess.
        </p>
      </div>

      <div className="w-full h-[40vh]"></div>

      {/* First Section: Dev Projects */}
      <div
        ref={addToParlistconRefs}
        className="w-full flex flex-row justify-between  px-40 parlistcon1"
      >
        <div
          ref={addToListsecRefs}
          className="listsec1 w-1/2 flex justify-center items-center h-96"
        >
          <h1 className="font-display text-6xl text-orange-500">
            Dev Projects
          </h1>
        </div>
        <div className="w-1/2 flex flex-col gap-10">
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-100 h-96 rounded-4xl workcard"
          ></div>
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-200 h-96 rounded-4xl workcard"
          ></div>
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-300 h-96 rounded-4xl workcard"
          ></div>
        </div>
      </div>

      {/* Second Section: UX Projects */}
      <div
        ref={addToParlistconRefs}
        className="w-full flex flex-row justify-between mt-10 px-40 parlistcon2"
      >
        <div className="w-1/2 flex flex-col gap-10">
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-100 h-96 rounded-4xl workcard"
          ></div>
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-200 h-96 rounded-4xl workcard"
          ></div>
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-300 h-96 rounded-4xl workcard"
          ></div>
        </div>
        <div
          ref={addToListsecRefs}
          className="listsec2 w-1/2 flex justify-center items-center h-96"
        >
          <h1 className="font-display text-6xl text-orange-500">UX Projects</h1>
        </div>
      </div>

      {/* Third Section: 3D Projects */}
      <div
        ref={addToParlistconRefs}
        className="w-full flex flex-row justify-between mt-10 px-40 parlistcon3"
      >
        <div
          ref={addToListsecRefs}
          className="listsec3 w-1/2 flex justify-center items-center h-96"
        >
          <h1 className="font-display text-6xl text-orange-500">3D Projects</h1>
        </div>
        <div className="w-1/2 flex flex-col gap-10">
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-100 h-96 rounded-4xl workcard"
          ></div>
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-200 h-96 rounded-4xl workcard"
          ></div>
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-300 h-96 rounded-4xl workcard"
          ></div>
        </div>
      </div>

      {/* Fourth Section: PM and Analyst */}
      <div
        ref={addToParlistconRefs}
        className="w-full flex flex-row justify-between mt-10 px-40 parlistcon4"
      >
        <div className="w-1/2 flex flex-col gap-10">
          <div
            ref={addToWorkcardRefs}
            className="w-full bg-amber-100 h-96 rounded-4xl workcard"
          ></div>
        </div>
        <div
          ref={addToListsecRefs}
          className="listsec4 w-1/2 flex justify-center items-center h-96"
        >
          <h1 className="font-display text-6xl text-orange-500">
            PM and Analyst
          </h1>
        </div>
      </div>
    </div>
  );
}
