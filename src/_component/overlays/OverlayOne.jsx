import { useEffect, useRef } from "react";
import gsap from "gsap";
import SelectedProject from "../SelectedProject/SelectedProject";
import Works from "../Works/Works";
import ReactLenis from "lenis/react";
import Image from "next/image";

const OverlayOne = ({ onClose }) => {
  const overlayRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    const el = overlayRef.current;
    let exitTween = null;

    const handleClose = () => {
      if (exitTween) return;
      exitTween = gsap.to(el, {
        clipPath: "inset(0% 100% 0% 0%)",
        y: 50,
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          if (el && el.parentNode) {
            onClose();
          }
        },
      });
      gsap.to(backRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: () => {
          if (el && el.parentNode) {
            onClose();
          }
        },
      });
    };

    el.handleClose = handleClose;

    // Set initial state
    gsap.set(el, {
      clipPath: "inset(0% 100% 0% 0%)",
      y: 50,
    });
    gsap.set(backRef.current, {
      opacity: 0,
    });

    // Entry animation
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      y: 0,
      duration: 1.5,
      ease: "power4.out",
    });
    gsap.to(backRef.current, {
      opacity: 1,
    });

    // Exit animation
    return () => {
      gsap.to(el, {
        clipPath: "inset(0% 100% 0% 0%)",
        y: 50,
        duration: 1.5,
        ease: "power4.inOut",
      });
      gsap.to(backRef.current, {
        opacity: "0%",
      });
    };
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const stopScrollPropagation = (e) => {
      e.stopPropagation();
    };

    el.addEventListener("wheel", stopScrollPropagation, { passive: false });
    el.addEventListener("touchmove", stopScrollPropagation, { passive: false });

    return () => {
      el.removeEventListener("wheel", stopScrollPropagation);
      el.removeEventListener("touchmove", stopScrollPropagation);
    };
  }, []);

  return (
    <ReactLenis>
      <div
        ref={backRef}
        className="fixed left-0 top-0 h-[100vh] w-[100vw] opacity-100 bg-black/30 z-30 backdrop-blur-sm"
        onClick={() => overlayRef.current.handleClose()}
      ></div>{" "}
      <div
        ref={overlayRef}
        className="fixed overflow-y-scroll top-0 left-0 w-[40vw] h-[100vh] bg-black/60 backdrop-blur-3xl bg-opacity-80 z-40 text-white"
      >
        <div className="sticky top-0 left-0 w-[40vw] flex flex-row justify-between z-50 p-12">
          <h1 className="text-orange-500 font-display text-center text-4xl md:text-7xl absolute top-9 z-40 right-10 flex  justify-center blur-[2px] md:blur-xs">
            Selected Works
          </h1>

          <div
            onClick={() => overlayRef.current.handleClose()}
            className="cursor-pointer bg-white/10 backdrop-blur-sm h-max w-max text-white px-4 py-2 rounded"
          >
            Close
          </div>
          <div className=" w-max text-white rounded-lg text-right z-50">
            <h2 className="text-3xl font-bold mb-4">Projects::Coder Edition</h2>
            <p>cOdIng iS mY pAssIoN</p>
          </div>
        </div>

        <div className="h-[400vh] px-20">
          <div className="fixed mt-5 ml-5 z-40 px-4 py-2 bg-black/30 rounded-full">
            <h1 className="text-sm font-light">aaa</h1>
          </div>
          <div className="overflow-hidden rounded-2xl flex flex-col gap-2 bg-stone-950/40 border-2 border-white/10 p-2">
            <Image
              src="/img-1.gif"
              alt="hero"
              width={1000}
              height={1000}
              className="w-full object-cover overflow-hidden rounded-2xl brightness-75"
            />
            <div className=" p-2 flex flex-row justify-between items-center w-full">
              <h1 className="text-white font-bold">SMR Inventory System</h1>
              <h1 className="text-orange-500 font-bold font-display blur-[1px]">
                Safari Mas Raya
              </h1>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default OverlayOne;
