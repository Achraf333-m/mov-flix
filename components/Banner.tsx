import { Movie } from "@/typings";
import { useEffect, useState } from "react";
import { imgUrl } from "@/constants/url";
import { FaPlay } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { LuPopcorn } from "react-icons/lu";

interface props {
  Trending: Movie[];
}

function Banner({ Trending }: props) {
  const [Movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setMovie(Trending[Math.floor(Math.random() * Trending.length)]);
    }, 1000);
  }, [Trending]);

  return (
    <div className="flex flex-col py-16 space-y-2 mb-10 md:justify-end md:space-y-4 lg:h-[85vh] lg:pb-12">
      <figure className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <img
          className=" opacity-50 object-cover -z-10"
          src={`${imgUrl}${Movie?.backdrop_path || Movie?.poster_path}`}
          alt=""
        />
      </figure>

      <div className=" flex flex-col space-y-6 justify-items-end items-center">
        <h1 className="text-[50px] font-light ">{Movie?.title || Movie?.original_name}</h1>
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
            {Movie && Math.floor(Movie?.popularity)}
            <LuPopcorn className="w-4 h-4  md:h-7 md:w-7" />
          </h3>
          <h3 className="flex space-x-2 text-lg text-green-500">
            {Movie && Math.floor(Movie?.vote_count / 100)} watchers
          </h3>
        </div>
        <p className="text-center max-w-xs font-extralight text-lg text-ellipsis">
          {Movie?.overview}
        </p>
      </div>
    </div>
  );
}

export default Banner;
