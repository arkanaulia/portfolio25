"use client";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import "./Nav.css";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import MenuBtn from "../MenuBtn/MenuBtn";
import Image from "next/image";
import ImageTrail from "../ImageTrail";

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  useEffect(() => {
    console.log("Initializing Nav component");
    if (menuRef.current) {
      const menu = menuRef.current;
      const links = menu.querySelectorAll(".link");
      const socialLinks = menu.querySelectorAll(".socials p");

      gsap.set(menu, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(links, { y: 30, opacity: 0 });
      gsap.set(socialLinks, { y: 30, opacity: 0 });
      gsap.set(".header h1 span", {
        y: 500,
        rotateY: 90,
        scale: 0.8,
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      console.log("Menu ref is not available");
      return;
    }

    const menu = menuRef.current;
    const links = menu.querySelectorAll(".link");
    const socialLinks = menu.querySelectorAll(".socials p");

    setIsAnimating(true);

    if (open) {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onComplete: () => {
          setIsAnimating(false);
          console.log("Open animation completed");
        },
      });

      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(socialLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        delay: 0.85,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(".video-wrapper", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "hop",
        duration: 1.5,
        delay: 0.5,
      });

      gsap.to(".header h1 span", {
        rotateY: 0,
        stagger: 0.05,
        delay: 0.75,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.to(".header h1 span", {
        y: 0,
        scale: 1,
        stagger: 0.05,
        delay: 0.5,
        duration: 1.5,
        ease: "power4.out",
      });
    } else {
      gsap.to(menu, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop",
        duration: 1.5,
        onComplete: () => {
          menu.style.pointerEvents = "none";
          gsap.set(menu, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });

          gsap.set(links, { y: 30, opacity: 0 });
          gsap.set(socialLinks, { y: 30, opacity: 0 });
          gsap.set(".header h1 span", {
            y: 500,
            rotateY: 90,
            scale: 0.8,
          });

          setIsAnimating(false);
          console.log("Close animation completed");
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      console.log(`isOpen changed: ${isOpen}`);
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    }
  }, [isAnimating, isOpen]);

  const images = Array.from({ length: 35 }, (_, i) => `/logo3.png`);

  return (
    <div className="">
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="menu z-30 trail-container" ref={menuRef}>
        <ImageTrail images={images} />
        <div className="col col-1">
          <div className="menu-logo">
            <Link href="/">
              <Image src="/logo.png" alt="herologo" width={100} height={500} />
            </Link>
          </div>
          <div className="justify-center text-6xl w-80">
            <div className="link hover:font-bold ">
              <Link href="/">Projects</Link>
            </div>
            <div className="link hover:font-bold">
              <Link href="/">Expertise</Link>
            </div>
            <div className="link hover:font-bold">
              <Link href="/">Agency</Link>
            </div>
            <div className="link hover:font-bold">
              <Link href="/">Contact</Link>
            </div>
          </div>
          {/* <div className="video-wrapper">
            <video src={"/video.mp4"} muted autoPlay loop />
          </div> */}
        </div>
        <div className="col col-2">
          <div className="socials">
            <div className="sub-col">
              <p>Arkan Aulia Farhan</p>
              <p>UX Designer</p>
              <p>Frontend Coder</p>
              <p>3D Artist</p>
            </div>
            <div className="sub-col">
              <p>Instagram</p>
              <p>LinkedIn</p>
              <p>Twitter</p>
              <p>Facebook</p>
            </div>
          </div>

          <div className="header"></div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
