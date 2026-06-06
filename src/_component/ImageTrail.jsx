"use client";

import { useEffect, useRef } from "react";

const ImageTrail = ({ images: customImages }) => {
  const trailRef = useRef([]);
  const animationRef = useRef(null);
  const timeoutsRef = useRef(new Set());
  const containerRef = useRef(null);
  const refs = useRef({
    mouseX: 0,
    mouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    isMoving: false,
    isCursorInContainer: false,
    isScrolling: false,
    scrollTicking: false,
    lastRemovalTime: 0,
    lastSteadyImageTime: 0,
    lastScrollTime: 0,
  });

  const config = {
    imageCount: 35,
    imageLifespan: 750,
    removalDelay: 50,
    mouseThreshold: 100,
    scrollThreshold: 50,
    idleCursorInterval: 300,
    inDuration: 750,
    outDuration: 1000,
    inEasing: "cubic-bezier(.07,.5,.5,1)",
    outEasing: "cubic-bezier(.87, 0, .13, 1)",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const s = refs.current;
    const moveTimeout = { current: null };
    const scrollTimeout = { current: null };
    const timeouts = timeoutsRef.current;
    let alive = true;

    const schedule = (fn, ms) => {
      const id = setTimeout(() => {
        timeouts.delete(id);
        if (alive) fn();
      }, ms);
      timeouts.add(id);
      return id;
    };

    const images =
      customImages ||
      Array.from({ length: config.imageCount }, (_, i) => `/logo3.png`);

    const isInContainer = (x, y) => {
      const rect = container.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const hasMovedEnough = () => {
      const dx = s.mouseX - s.lastMouseX;
      const dy = s.mouseY - s.lastMouseY;
      return Math.sqrt(dx * dx + dy * dy) > config.mouseThreshold;
    };

    const createImage = () => {
      if (!alive || !s.isCursorInContainer) return;

      const img = document.createElement("img");
      img.className = "trail-img";
      const idx = Math.floor(Math.random() * images.length);
      const rotation = (Math.random() - 0.5) * 50;
      img.src = images[idx];

      const rect = container.getBoundingClientRect();
      const rx = s.mouseX - rect.left;
      const ry = s.mouseY - rect.top;
      img.style.cssText = `left:${rx}px;top:${ry}px;transform:translate(-50%,-50%) rotate(${rotation}deg) scale(0);transition:transform ${config.inDuration}ms ${config.inEasing}`;

      container.appendChild(img);

      schedule(() => {
        img.style.transform = `translate(-50%,-50%) rotate(${rotation}deg) scale(1)`;
      }, 10);

      trailRef.current.push({
        element: img,
        rotation,
        removeTime: Date.now() + config.imageLifespan,
      });
    };

    const createTrailImage = () => {
      if (!s.isCursorInContainer) return;
      const now = Date.now();

      if (s.isMoving && hasMovedEnough()) {
        s.lastMouseX = s.mouseX;
        s.lastMouseY = s.mouseY;
        createImage();
        return;
      }

      if (!s.isMoving && now - s.lastSteadyImageTime >= config.idleCursorInterval) {
        s.lastSteadyImageTime = now;
        createImage();
      }
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (now - s.lastRemovalTime < config.removalDelay || trailRef.current.length === 0) return;

      const oldest = trailRef.current[0];
      if (now < oldest.removeTime) return;

      trailRef.current.shift();
      const el = oldest.element;

      el.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
      el.style.transform = `translate(-50%,-50%) rotate(${oldest.rotation}deg) scale(0)`;

      s.lastRemovalTime = now;

      schedule(() => {
        try {
          if (el.parentNode === container) {
            // container.removeChild(el);
          }
        } catch {
          // already gone
        }
      }, config.outDuration);
    };

    const animate = () => {
      if (!alive) return;
      createTrailImage();
      removeOldImages();
      animationRef.current = requestAnimationFrame(animate);
    };

    const setInitialMousePos = (event) => {
      s.mouseX = event.clientX;
      s.mouseY = event.clientY;
      s.lastMouseX = s.mouseX;
      s.lastMouseY = s.mouseY;
      s.isCursorInContainer = isInContainer(s.mouseX, s.mouseY);
      document.removeEventListener("mousemove", setInitialMousePos, false);
    };

    document.addEventListener("mousemove", setInitialMousePos, { once: true });

    const handleMouseMove = (e) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
      s.isCursorInContainer = isInContainer(s.mouseX, s.mouseY);

      if (s.isCursorInContainer) {
        s.isMoving = true;
        clearTimeout(moveTimeout.current);
        moveTimeout.current = setTimeout(() => { s.isMoving = false; }, 100);
      }
    };

    const handleScroll1 = () => {
      s.isCursorInContainer = isInContainer(s.mouseX, s.mouseY);
      if (s.isCursorInContainer) {
        s.isMoving = true;
        s.lastMouseX += (Math.random() - 0.5) * 10;
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => { s.isMoving = false; }, 100);
      }
    };

    const handleScroll2 = () => {
      const now = Date.now();
      s.isScrolling = true;
      if (now - s.lastScrollTime < config.scrollThreshold) return;
      s.lastScrollTime = now;

      if (!s.scrollTicking) {
        requestAnimationFrame(() => {
          if (s.isScrolling) {
            s.lastMouseX += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);
            s.lastMouseY += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);
            createImage();
            s.isScrolling = false;
          }
          s.scrollTicking = false;
        });
        s.scrollTicking = true;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll1, { passive: true });
    window.addEventListener("scroll", handleScroll2, { passive: true });

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      alive = false;
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll1);
      window.removeEventListener("scroll", handleScroll2);
      clearTimeout(moveTimeout.current);
      clearTimeout(scrollTimeout.current);

      cancelAnimationFrame(animationRef.current);

      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();

      trailRef.current.forEach((item) => {
        try {
          if (item.element && item.element.parentNode === container) {
            // container.removeChild(item.element);
          }
        } catch {
          // already gone
        }
      });
      trailRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden z-10"
    />
  );
};

export default ImageTrail;
