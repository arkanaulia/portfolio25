"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import OverlayOne from "../overlays/OverlayOne";
import OverlayTwo from "../overlays/OverlayTwo";
import OverlayThree from "../overlays/OverlayThree";
import OverlayFour from "../overlays/OverlayFour";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Cards.css";

gsap.registerPlugin(ScrollTrigger);

export default function Cards({ containerRef }) {
  const cardRefs = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const cardData = [
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card One",
      backText: "Details for card 1",
    },
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card Two",
      backText: "Details for card 2",
    },
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card Three",
      backText: "Details for card 3",
    },
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card Four",
      backText: "Details for card 4",
    },
  ];

  useGSAP(() => {
    const cards = cardRefs.current;
    const totalScrollHeight = window.innerHeight * 3;
    const positions = [14, 38, 62, 86];
    const rotations = [-15, -7.5, 7.5, 15];

    const container = containerRef.current;
    const cardsEl = container?.querySelector(".cards");
    if (!cardsEl) return;

    ScrollTrigger.create({
      trigger: cardsEl,
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    cards.forEach((card, index) => {
      if (!card) return;

      gsap.to(card, {
        left: `${positions[index]}%`,
        rotation: `${rotations[index]}`,
        ease: "none",
        scrollTrigger: {
          trigger: cardsEl,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.5,
          id: `spread-${index}`,
        },
      });

      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back");

      const staggerOffset = index * 0.05;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: cardsEl,
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            gsap.to(frontEl, { rotateY: -180 * animationProgress });
            gsap.to(backEl, { rotateY: 180 - 180 * animationProgress });
            gsap.to(card, {
              xPercent: -50,
              yPercent: -50,
              rotate: rotations[index] * (1 - animationProgress),
            });
          }
        },
      });
    });
  }, [containerRef]);

  const handleCardClick = (index) => setActiveCardIndex(index);
  const closeOverlay = () => setActiveCardIndex(null);

  return (
    <section className="cards">
      <h1 className="text-orange-500 font-display text-7xl absolute inset-0 flex mt-32 justify-center blur-xs">
        Choose My Version.
      </h1>
      <p className="text-white font-light font-sans text-xl absolute inset-0 flex mt-36 justify-center">
        Whatever you choose, it’s still me.
      </p>
      {cardData.map((card, index) => (
        <Card
          key={index}
          id={`card-${index + 1}`}
          frontSrc={card.frontSrc}
          frontAlt={card.frontAlt}
          backText={card.backText}
          ref={(el) => (cardRefs.current[index] = el)}
          onClick={() => handleCardClick(index)}
        />
      ))}

      {/* Overlays */}
      {activeCardIndex === 0 && <OverlayOne onClose={closeOverlay} />}
      {activeCardIndex === 1 && <OverlayTwo onClose={closeOverlay} />}
      {activeCardIndex === 2 && <OverlayThree onClose={closeOverlay} />}
      {activeCardIndex === 3 && <OverlayFour onClose={closeOverlay} />}
    </section>
  );
}
