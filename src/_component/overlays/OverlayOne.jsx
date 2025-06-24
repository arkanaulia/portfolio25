import { useEffect, useRef } from "react";
import gsap from "gsap";

const OverlayOne = ({ onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const el = overlayRef.current;

    // Set initial state
    gsap.set(el, {
      clipPath: "inset(100% 0% 0% 0%)",
      y: 50,
    });

    // Entry animation
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      y: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    // Exit animation
    return () => {
      gsap.to(el, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 50,
        duration: 1.5,
        ease: "power4.inOut",
      });
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center text-white"
      onClick={onClose}
    >
      <div className="bg-[#111] p-10 rounded-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Overlay One</h2>
        <p>This is the overlay content for card one.</p>
      </div>
    </div>
  );
};

export default OverlayOne;
