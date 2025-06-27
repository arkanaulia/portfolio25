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
      backText: "Developer",
      backSrc: "/hands1.jpg",
    },
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card Two",
      backText: "UI/UX Designer",
      backSrc: "/hands2.jpg",
    },
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card Three",
      backText: "3D / Motion / Graphics",
      backSrc: "/hands3.jpg",
    },
    {
      frontSrc: "/cardfront3.jpg",
      frontAlt: "Card Four",
      backText: "Product Manager",
      backSrc: "/hands4.jpg",
    },
  ];

  useGSAP(() => {
    const cards = cardRefs.current;
    const totalScrollHeight = window.innerHeight * 3;
    let positions = [14, 38, 62, 86];
    // Responsive positions and rotations
    let rotations;
    if (window.innerWidth < 768) {
      // Mobile/tablet: 2x2 grid, smaller cards
      positions = [30, 70, 30, 70];
      rotations = [0, 0, 0, 0];
      cards.forEach((card, idx) => {
        if (card) {
          const row = Math.floor(idx / 2);
          const col = idx % 2;
          gsap.set(card, {
            top: `${30 + row * 30}%`,
            left: `${30 + col * 40}%`,
            xPercent: -50,
            yPercent: -50,
            scale: 0.6,
            rotate: 0,
          });
        }
      });
    } else {
      // Desktop: original spread
      positions = [14, 38, 62, 86];
      rotations = [-15, -7.5, 7.5, 15];
      cards.forEach((card) => {
        if (card) {
          gsap.set(card, { scale: 1 });
        }
      });
    }

    // Use document.querySelector if containerRef is not provided
    const cardsEl =
      containerRef?.current?.querySelector(".cards2") ||
      document.querySelector(".cards2");
    if (!cardsEl) return;

    // Remove absolute positioning from .cards2 if present in CSS
    // and ensure it has position: relative or static

    ScrollTrigger.create({
      trigger: cardsEl,
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    cards.forEach((card, index) => {
      if (!card) return;
      const backsEl = card.querySelector(".flip-card-back");
      if (backsEl) {
        // Set default state (mouseleave) initially
        gsap.set(card, {
          scale: window.innerWidth < 768 ? 0.6 : 1,
          filter: "grayscale(1)",
        });

        backsEl.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.12,
            duration: 0.4,
            filter: "grayscale(0)",
            ease: "bounce.out",
          });
        });

        backsEl.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: window.innerWidth < 768 ? 0.6 : 1,
            duration: 0.3,
            filter: "grayscale(1)",
            ease: "power2.out",
          });
        });
      }
     
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

    // Refresh ScrollTrigger after mount to ensure correct pinning
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [containerRef]);

  const handleCardClick = (index) => setActiveCardIndex(index);
  const closeOverlay = () => setActiveCardIndex(null);

  return (
    <section className="cards2 carding">
      {" "}
      {/* added carding class here */}
      <h1 className="text-orange-500 font-display text-center text-4xl md:text-7xl absolute inset-0 flex mt-10 md:mt-20 justify-center blur-[2px] md:blur-xs">
        Choose My Version.
      </h1>
      <p className="text-white font-light font-sans text-md md:text-xl absolute inset-0 flex md:mt-24 mt-10 justify-center">
        Whatever you choose, it’s still me.
      </p>
      {cardData.map((card, index) => (
        <Card
          key={index}
          id={`card-${index + 1}`}
          frontSrc={card.frontSrc}
          backSrc={card.backSrc}
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
    
    <div className="absolute bottom-30 w-full flex justify-center items-center mt-16">
        <a
          href=""
          className="backdrop-blur-md h-max w-56 text-center bg-white/10 border border-white/30 rounded-full px-4 py-3 md:px-8 md:py-4 text-white font-semibold shadow-lg transition hover:bg-white/20 hover:border-white/50"
        >
          See More Works
        </a>
      </div>
    </section>
  );
}
