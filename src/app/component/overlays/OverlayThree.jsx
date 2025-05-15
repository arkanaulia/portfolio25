import { useEffect, useRef } from "react";
import gsap from "gsap";

const OverlayThree = ({ onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
    return () => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power3.in",
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
        <h2 className="text-2xl font-bold mb-4">Overlay 3</h2>
        <p>This is the overlay content for card 3.</p>
      </div>
    </div>
  );
};

export default OverlayThree;
