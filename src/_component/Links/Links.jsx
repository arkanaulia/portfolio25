import Link from "next/link";
import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Links() {
  const dotLottieRef = useRef(null);
  return (
    <div className="flex flex-row items-center justify-between w-[94vw] h-16 backdrop-blur-md text-center bg-white/10 border border-white/30 rounded-full shadow-lg py-2 pr-2 ">
      <div
        className="flex flex-row items-center justify-center p-2 h-16 w-16 transition-all duration-300 hover:w-32 
       overflow-hidden text-center rounded-full hover:mx-0 mx-2"
      >
        <Link href={"/"} className="text-lg font-bold">
          <div className="h-10 z-[100] w-max">
            <DotLottieReact
              src="/logo.lottie"
              dotLottieRefCallback={(instance) => {
                dotLottieRef.current = instance;
              }}
              onMouseEnter={() => {
                dotLottieRef.current?.setMode("forward");
                dotLottieRef.current?.play();
              }}
              onMouseLeave={() => {
                dotLottieRef.current?.setMode("reverse");
                dotLottieRef.current?.play();
              }}
              className=""
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center h-full w-max backdrop-blur-md text-center bg-white/5 border border-white/30 rounded-full shadow-lg ">
        <div className="w-max  rounded-full px-6 py-2  flex justify-center items-center text-white transition hover:bg-white/20 hover:border-white/50">
          <Link href={"/"} className="text-lg font-bold">
            Project
          </Link>
        </div>
        <div className="w-max  rounded-full px-6 py-2  flex justify-center items-center text-white transition hover:bg-white/20 hover:border-white/50">
          <Link href={"/"} className="text-lg font-bold">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
