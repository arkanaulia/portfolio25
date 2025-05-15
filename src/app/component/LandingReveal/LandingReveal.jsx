// LandingReveal.jsx
"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import styles from "./LandingReveal.module.css";

export default function LandingReveal() {
  const loaderRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "hop" } });

    const counts = document.querySelectorAll(`.${styles.count}`);

    counts.forEach((count, index) => {
      const digits = count.querySelectorAll(`.${styles.digit} h1`);
      tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);
      if (index < counts.length) {
        tl.to(
          digits,
          { y: "-100%", duration: 1, stagger: 0.075 },
          index * 1 + 1
        );
      }
    });

    tl.to(`.${styles.spinner}`, { opacity: 0, duration: 0.3 });
    tl.to(`.${styles.word} h1`, { y: "0%", duration: 1 }, "<");
    tl.to(`.${styles.divider}`, {
      scaleY: "100%",
      duration: 1,
      onComplete: () =>
        gsap.to(`.${styles.divider}`, {
          opacity: 0,
          duration: 0.3,
          delay: 0.3,
        }),
    });
    tl.to("#word1 h1", { y: "100%", duration: 1, delay: 0.3 });
    tl.to("#word2 h1", { y: "-100%", duration: 1 }, "<");

    tl.to(
      `.${styles.block}`,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.5,
        stagger: 0.1,
        delay: 0.1,
      },
      "<"
    );

    // Fade and disable interaction after reveal
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.7,
      onComplete: () => {
        loaderRef.current.style.display = "none";
      },
    });
  });

  return (
    <div className={styles.loader} ref={loaderRef}>
      <div className={styles.overlay}>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
      </div>

      <div className={styles.introLogo}>
        <div className={styles.word} id="word1">
          <h1>
            <span>arkan</span>
          </h1>
        </div>
        <div className={styles.word} id="word2">
          <h1 className="font-display">aulia</h1>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>

      <div className={styles.counter}>
        {[
          ["0", "0"],
          ["2", "7"],
          ["6", "5"],
          ["9", "8"],
          ["9", "9"],
        ].map((digits, i) => (
          <div className={styles.count} key={i}>
            {digits.map((d, j) => (
              <div className={styles.digit} key={j}>
                <h1>{d}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
