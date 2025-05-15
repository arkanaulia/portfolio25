import { forwardRef } from "react";
import Image from "next/image";

// eslint-disable-next-line react/display-name
const Card = forwardRef(
  ({ id, frontSrc, frontAlt, backText, onClick }, ref) => {
    return (
      <div className="card" id={id} ref={ref} onClick={onClick}>
        <div className="card-wrapper">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Image
                priority
                src={frontSrc}
                width={800}
                height={800}
                alt={frontAlt}
              />
            </div>
            <div className="flip-card-back">
              <p>{backText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
