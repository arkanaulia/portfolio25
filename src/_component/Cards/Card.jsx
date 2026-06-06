import { forwardRef } from "react";
import Image from "next/image";

// eslint-disable-next-line react/display-name
const Card = forwardRef(
  ({ id, frontSrc, frontAlt, backText, onClick, backSrc }, ref) => {
    return (
      <div className="card" id={id} ref={ref} onClick={onClick}>
        <div className="card-wrapper">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Image
                src={frontSrc}
                width={800}
                height={800}
                sizes="(max-width: 768px) 144px, 240px"
                alt={frontAlt}
              />
            </div>
            <div className="flip-card-back">
              <div className=" w-full flex flex-col justify-between h-full">
                <h1 className="self-start">{backText}</h1>
                <div className="self-center -m-4">
                  <Image
                    src={backSrc}
                    width={800}
                    height={800}
                    sizes="(max-width: 768px) 144px, 240px"
                    alt={backText}
                  />
                </div>
                <h1 className="self-end rotate-180 ">{backText}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
