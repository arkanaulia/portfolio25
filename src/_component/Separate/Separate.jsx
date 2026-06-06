"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Separate.css";
import Image from "next/image";
import dynamic from "next/dynamic";

const Aqua = dynamic(() => import("../Aqua"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Separate() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggerSettings = {
        trigger: ".main",
        start: "top 25%",
        toggleActions: "play reverse play reverse",
      };

      const leftXValues = [-800, -900, -400];
      const rightXValues = [800, 900, 400];
      const leftRotationValues = [-30, -20, -35];
      const rightRotationValues = [30, 20, 35];
      const yValues = [100, -150, -400];

      gsap.utils.toArray(".row").forEach((row, index) => {
        const cardLeft = row.querySelector(".card-left");
        const cardRight = row.querySelector(".card-right");

        gsap.to(cardLeft, {
          x: leftXValues[index],
          scrollTrigger: {
            trigger: ".main",
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${
                progress * leftXValues[index]
              }px) translateY(${progress * yValues[index]}px) rotate(${
                progress * leftRotationValues[index]
              }deg)`;
              cardRight.style.transform = `translateX(${
                progress * rightXValues[index]
              }px) translateY(${progress * yValues[index]}px) rotate(${
                progress * rightRotationValues[index]
              }deg)`;
            },
          },
        });
      });

      gsap.to(".logo", {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: scrollTriggerSettings,
      });

      gsap.to(".line p", {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: scrollTriggerSettings,
      });

      gsap.to("button", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.25,
        scrollTrigger: scrollTriggerSettings,
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="cardtwo card-left">
            <Image
              src={`/img-${2 * i - 1}.webp`}
              alt=""
              width={800}
              height={800}
              sizes="(max-width: 900px) 50vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="cardtwo card-right">
            <Image
              src={`/img-${2 * i}.webp`}
              alt=""
              width={800}
              height={800}
              sizes="(max-width: 900px) 50vw, 30vw"
            />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <section className="main -mt-[30vh] md:-mt-0 px-4 py-8 md:px-12 lg:px-24">
      <div className="main-content relative max-w-6xl mx-auto">
        <div className="h-48  overflow-hidden md:h-96 md:w-[70%] absolute -mt-24 md:-mt-64 z-50">
          <Aqua />
        </div>
        <div className="copy text-sm md:text-xl text-neutral-50">
          <div className="line">
            <h1>a passionate 3D designer with a focus on UI/UX,</h1>
          </div>
          <div className="line">
            <h1>studying Information Technology and</h1>
          </div>
          <div className="line">
            <h1>building a career in IT Business Analyst</h1>
          </div>
        </div>
      </div>

      <div className="space-y-8 md:space-y-12">{generateRows()}</div>
    </section>
  );
}
