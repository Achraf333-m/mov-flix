import { Movie } from "@/typings";
import { useEffect, useState } from "react";
import { imgUrl } from "@/constants/url";
import { FaPlay } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { LuPopcorn } from "react-icons/lu";

interface props {
  TopRated: Movie[];
}

function Banner({ TopRated }: props) {
  const [topRated, setToprated] = useState<Movie | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setToprated(TopRated[Math.floor(Math.random() * TopRated.length)]);
    }, 1000);
  }, [TopRated]);

  console.log(topRated);
  return (
    <div className="w-full h-full">
      <img
        className="absolute opacity-50 object-fit top-0 left-0 -z-10"
        src={`${imgUrl}${topRated?.backdrop_path || topRated?.poster_path}`}
        alt=""
      />

      <div className="p-20 absolute top-[50%] bottom-[50%] flex flex-col space-y-6 justify-center items-center">
        <h1 className="text-[50px] font-light " >{topRated?.title}</h1>
        <div className="flex space-x-4">
          <button className="btn">
            {" "}
            <FaPlay className="w-4 h-4  md:h-7 md:w-7" />
            Play
          </button>
          <button className="btn">
            <RiMovie2Fill className="w-4 h-4  md:h-7 md:w-7" />
            Trailer
          </button>
        </div>
        <div className="flex  space-x-4">
          <h3 className="flex space-x-2 text-lg text-green-500">
            {topRated && Math.floor(topRated?.popularity)}
            <LuPopcorn className="w-4 h-4  md:h-7 md:w-7" />
          </h3>
          <h3 className="flex space-x-2 text-lg text-green-500">
            {topRated && Math.floor(topRated?.vote_count / 100)} watchers
          </h3>
        </div>
        <p className="text-center max-w-md font-extralight text-lg">{topRated?.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
