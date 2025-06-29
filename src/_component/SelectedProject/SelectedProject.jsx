"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "./SelectedProject.css"; // Import the global CSS file
import { MdOutlineArrowOutward } from "react-icons/md";
import { useLayoutEffect } from "react";
import React from "react";
import Link from "next/link";

export default function SelectedProject() {
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".seemore",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".seemore2",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".seemore2",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = document.querySelectorAll(".card");
      const images = document.querySelectorAll(".card img");
      const totalCards = cards.length;

      gsap.set(cards[0], { y: "0%", scale: 1, rotation: 0 });
      gsap.set(images[0], { scale: 1 });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], { y: "100%", scale: 1, rotation: 0 });
        gsap.set(images[i], { scale: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const currentImage = images[i];
        const nextCard = cards[i + 1];
        const position = i;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.5,
            rotation: 10,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          currentImage,
          {
            scale: 1.5,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <div
      className="selected-project container md:-my-52"
      ref={container}
    >
      <div className="sticky-cards md:-mt-0 w-full">
        <div className="absolute top-44 left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl text-center seemore">/SelectionWorks</h1>
        </div>
        <div className="cards-container">
          <Link href="/project/emr-berkah-sehat">
            <div className="card">
              <div className="tag">
                <p>aaa</p>
              </div>
              <div className="relative">
                <img
                  src={"/img-1.gif"}
                  alt={"aaaa"}
                  style={{ filter: "brightness(0.5)" }}
                />
                {/* Overlay text can go here if needed */}
              </div>
            </div>
          </Link>
          <div className="card">
            <div className="tag">
              <p>bbb</p>
            </div>
            <div className="relative">
              <img
                src={"/img-1.gif"}
                alt={"aaaa"}
                style={{ filter: "brightness(0.5)" }}
              />
            </div>
          </div>
          <div className="card">
            <div className="tag">
              <p>cccc</p>
            </div>
            <div className="relative">
              <img
                src={"/img-1.gif"}
                alt={"aaaa"}
                style={{ filter: "brightness(0.5)" }}
              />
            </div>
          </div>
          <div className="card">
            <div className="tag">
              <p>cccc</p>
            </div>
            <div className="relative">
              <img
                src={"/img-1.gif"}
                alt={"aaaa"}
                style={{ filter: "brightness(0.5)" }}
              />
            </div>
          </div>
        </div>
        <Link
          href="/project"
          className="seemore2 absolute bottom-24 left-1/2 transform group -translate-x-1/2 w-6/12 bg-stone-50/10 h-16 flex items-center justify-between px-8 rounded-lg shadow-lg hover:bg-stone-50/20 transition-colors duration-300"
        >
          <div className=" relative inline-block">
            <h1>
              <span className="relative z-10 text-xl">See More Works</span>
            </h1>
          </div>
          <MdOutlineArrowOutward />
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-lg w-0 opacity-0 outline-2 outline-orange-500 h-full transition-all duration-300 group-hover:w-full group-hover:opacity-100"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}
