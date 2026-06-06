// LandingReveal.jsx
"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import styles from "./LandingReveal.module.css";

export default function LandingReveal() {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const counterTweenRef = useRef(null);
  const revealStartedRef = useRef(false);
  const startTimeRef = useRef(0);
  const counterValueRef = useRef({ value: 0 });
  const completionTimeoutRef = useRef(null);
  const forceTimeoutRef = useRef(null);
  const { progress, active } = useProgress();

  const MIN_LOADER_MS = 1500;
  const FORCE_COMPLETE_MS = 8000;

  const startReveal = () => {
    if (!loaderRef.current || revealStartedRef.current) return;
    revealStartedRef.current = true;

    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }
    if (forceTimeoutRef.current) {
      clearTimeout(forceTimeoutRef.current);
    }
    if (counterTweenRef.current) {
      counterTweenRef.current.kill();
    }

    gsap.set(counterValueRef.current, { value: 100 });
    if (counterRef.current) {
      counterRef.current.textContent = "100";
    }

    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "hop" } });

    tl.to(`.${styles.spinner}`, { opacity: 0, duration: 0.3 });
    tl.to(`.${styles.counterValue}`, { opacity: 0, duration: 0.3 }, "<");
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

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.7,
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
      },
    });
  };

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");
    startTimeRef.current = performance.now();

    if (counterRef.current) {
      counterRef.current.textContent = "00";
    }

    forceTimeoutRef.current = setTimeout(() => {
      startReveal();
    }, FORCE_COMPLETE_MS);

    return () => {
      if (counterTweenRef.current) {
        counterTweenRef.current.kill();
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
      if (forceTimeoutRef.current) {
        clearTimeout(forceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!counterRef.current || revealStartedRef.current) return;

    const target = Math.min(100, Math.round(progress));

    if (counterTweenRef.current) {
      counterTweenRef.current.kill();
    }

    counterTweenRef.current = gsap.to(counterValueRef.current, {
      value: target,
      duration: 0.35,
      ease: "power3.out",
      onUpdate: () => {
        const nextValue = Math.round(counterValueRef.current.value);
        if (counterRef.current) {
          counterRef.current.textContent = String(nextValue).padStart(2, "0");
        }
      },
    });

    const elapsed = performance.now() - startTimeRef.current;
    const shouldComplete =
      target >= 100 || (!active && target > 0) || elapsed >= FORCE_COMPLETE_MS;

    if (!shouldComplete || revealStartedRef.current) return;

    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }

    completionTimeoutRef.current = setTimeout(() => {
      startReveal();
    }, remaining);
  }, [progress, active]);

  return (
    <div className={styles.reveal}>
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
          <h1 ref={counterRef} className={styles.counterValue}>
            00
          </h1>
        </div>
      </div>
    </div>
  );
}
