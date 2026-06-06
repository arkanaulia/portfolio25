"use client";

import { useEffect, useRef, useState } from "react";

const ExplosionContainer = () => {
  const explosionContainerRef = useRef(null);
  const footerRef = useRef(null);
  const [explosionTriggered, setExplosionTriggered] = useState(false);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  const mountedRef = useRef(false);

  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 150,
    horizontalForce: 20,
    verticalForce: 15,
    rotationSpeed: 10,
    resetDelay: 500,
  };

  const imageParticleCount = 15;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    (_, i) => `/logo3.png`
  );

  class Particle {
    constructor(element) {
      this.element = element;
      this.x = 0;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * config.horizontalForce;
      this.vy = -config.verticalForce - Math.random() * 10;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
    }

    update() {
      this.vy += config.gravity;
      this.vx *= config.friction;
      this.vy *= config.friction;
      this.rotationSpeed *= config.friction;

      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.element) {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
      }
    }
  }

  const createParticles = () => {
    if (!mountedRef.current || !explosionContainerRef.current) return;

    try {
      explosionContainerRef.current.innerHTML = "";
    } catch {
      return;
    }
    particlesRef.current = [];

    imagePaths.forEach((path) => {
      const particle = document.createElement("img");
      particle.src = path;
      particle.classList.add("explosion-particle-img");
      particle.style.width = `${config.imageSize}px`;
      explosionContainerRef.current?.appendChild(particle);
    });

    const particleElements = explosionContainerRef.current.querySelectorAll(
      ".explosion-particle-img"
    );
    particlesRef.current = Array.from(particleElements).map(
      (element) => new Particle(element)
    );
  };

  const explode = () => {
    if (!mountedRef.current || explosionTriggered) return;
    setExplosionTriggered(true);

    createParticles();

    let finished = false;

    const animate = () => {
      if (finished || !mountedRef.current) return;

      particlesRef.current.forEach((particle) => particle.update());

      if (
        explosionContainerRef.current &&
        particlesRef.current.every(
          (particle) =>
            particle.y > explosionContainerRef.current.offsetHeight / 2
        )
      ) {
        cancelAnimationFrame(animationRef.current);
        finished = true;
        resetTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            setExplosionTriggered(false);
          }
        }, config.resetDelay);
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const checkFooterPosition = () => {
    if (!footerRef.current) return;

    const footerRect = footerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (
      !explosionTriggered &&
      footerRect.top <= viewportHeight - footerRect.height * 1
    ) {
      explode();
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    let alive = true;
    const timeouts = new Set();

    const schedule = (fn, ms) => {
      const id = setTimeout(() => {
        timeouts.delete(id);
        if (alive) fn();
      }, ms);
      timeouts.add(id);
      return id;
    };

    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });

    footerRef.current = document.querySelector("footer");

    createParticles();

    let checkTimeout;
    const handleScroll = () => {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(() => {
        if (alive) checkFooterPosition();
      }, 10);
    };

    window.addEventListener("scroll", handleScroll);

    schedule(checkFooterPosition, 500);

    const handleResize = () => {
      setExplosionTriggered(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      alive = false;
      mountedRef.current = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(checkTimeout);
      clearTimeout(resetTimeoutRef.current);
      cancelAnimationFrame(animationRef.current);
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, []);

  return (
    <div ref={explosionContainerRef} className="explosion-container"></div>
  );
};

export default ExplosionContainer;
