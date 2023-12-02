import { Movie } from "@/typings";
import Thumbnail from "./Thumbnail";
import { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface props {
  Movies: Movie[];
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
    <div className="h-60 w-full space-y-0.5 md:space-y-4 ">
      <h2 className="font-light text-3xl ml-[156px]">{title}</h2>
      <div className="flex space-x-24">
        <div className="flex px-8 justify-center space-x-28">
          <button className="arRow" onClick={() => rowMoved("left")}>
            <BsChevronLeft />
          </button>
          <button className="arRow" onClick={() => rowMoved("right")}>
            <BsChevronRight />
          </button>
        </div>
        <div
          ref={movedRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide items-center"
        >
          {Movies.map((original) => (
            <Thumbnail Movie={original} key={original.backdrop_path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
