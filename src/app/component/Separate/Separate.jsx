"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Separate.css";
import Image from "next/image";
import Aqua from "../Aqua";

gsap.registerPlugin(ScrollTrigger);

export default function Separate() {
  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card2 card-left">
            <Image
              src={`/img-${2 * i - 1}.gif`}
              alt=""
              width={800}
              height={800}
            />
          </div>
          <div className="card2 card-right">
            <Image src={`/img-${2 * i}.gif`} alt="" width={800} height={800} />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <section className="main">
      <div className="main-content">
        <div className=" h-96 w-4xl absolute -mt-64 z-50">
          <Aqua />
        </div>
        <div className="copy text-sm text-neutral-50">
          <div className="line">
            <p>a passionate 3D designer with a focus on UI/UX,</p>
          </div>
          <div className="line">
            <p> studying Information Technology and</p>
          </div>
          <div className="line">
            <p>building a career in IT Business Analyst</p>
          </div>
        </div>
        {/* <div className="btn">
          <button>Get PRO</button>
        </div> */}
      </div>

      {generateRows()}
    </section>
  );
}
