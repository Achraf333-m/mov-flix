import { Movie } from "@/typings";
import Thumbnail from "./Thumbnail";
import { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { DocumentData } from "firebase/firestore";

interface props {
  Movies: Movie[] | DocumentData;
  title: String;
}

function Row({ Movies, title }: props) {
  const movedRef = useRef<HTMLDivElement | null>(null);

  const rowMoved = (direction: string) => {
    if (!movedRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = movedRef.current;
    const scroll =
      direction === "left"
        ? scrollLeft - clientWidth
        : clientWidth + scrollLeft;

    movedRef.current?.scrollTo({ left: scroll, behavior: "smooth" });
  };

  return (
    <div className="max-h-60 w-full space-y-0.5 md:space-y-4 flex-shrink ">
      <h2 className="font-light text-lg md:text-3xl md:ml-[156px]">{title}</h2>
      <div className="flex md:space-x-24">
        <div className="hidden md:flex md:px-8 justify-center md:space-x-28">
          <button className="arRow" onClick={() => rowMoved("left")}>
            <BsChevronLeft />
          </button>
          <button className="arRow" onClick={() => rowMoved("right")}>
            <BsChevronRight />
          </button>
        </div>
        <div
          ref={movedRef}
          className="flex overflow-x-scroll space-x-0.5 scrollbar-hide items-center md:space-x-2.5 md:p-2"
        >
          {Movies.map((original:Movie) => (
            <Thumbnail Movie={original} key={original.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
