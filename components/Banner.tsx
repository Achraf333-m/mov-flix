import { Movie } from "@/typings";
import { useEffect, useState } from "react";
import { imgUrl } from "@/constants/url";
import { FaPlay } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { LuPopcorn } from "react-icons/lu";
import { VideoState, modalState, movieState } from "@/atoms/atom";
import { useRecoilState } from "recoil";
import { trailer } from "@/utils/trailer";

interface props {
  Trending: Movie[];
}

function Banner({ Trending }: props) {
  const [Movie, setMovie] = useState<Movie | null>(null);
  const [showTrailer, setShowTrailer] = useRecoilState(modalState);
  const [movieTrailer, setmovieTrailer] = useRecoilState(movieState);
  const [videoState, setVideoState] = useRecoilState(VideoState);
  const show_trailer = async () => {
    const data = await trailer(Movie?.id!, Movie?.first_air_date);
    setmovieTrailer(data);
    setVideoState(Movie);
  };

  useEffect(() => {
    setTimeout(() => {
      setMovie(Trending[Math.floor(Math.random() * Trending.length)]);
    }, 1000);
  }, [Trending]);

  return (
    <div className="flex flex-col pt-10 xl:py-16 space-y-2 mb-4 xl:mb-10 md:justify-end md:space-y-4 lg:h-[85vh] lg:pb-12">
      <figure className="absolute top-0 left-0 h-[95vh] w-full -z-10">
       {Movie && ( <img
          className=" opacity-50 object-cover -z-10"
          src={`${imgUrl}${Movie?.backdrop_path || Movie?.poster_path}`}
          alt=""
        />)}
      </figure>

      <div className=" flex justify-center pt-10 items-center max-w-md flex-col space-y-6">
        <h1 className="text-xl sm:text-3xl p-2 md:text-[50px] max-w-2xl md:max-w-7xl font-light text-center">
          {Movie?.title || Movie?.original_name}
        </h1>
        <div className="flex space-x-4">
          <button className="btn" onClick={() => alert('As this is a mock website, I can only show you the trailers, sorry :D')}>
            {" "}
            <FaPlay className="w-4 h-4  md:h-7 md:w-7" />
            Play
          </button>
          <button
            onClick={() => {
              setShowTrailer(true), show_trailer();
            }}
            className="btn"
          >
            <RiMovie2Fill className="w-4 h-4  md:h-7 md:w-7" />
            Trailer
          </button>
        </div>
        <div className="md:flex max-w-md hidden space-x-4">
          <h3 className="flex justify-center space-x-2 text-lg text-green-500">
            {Movie && Math.floor(Movie?.popularity)}
            <LuPopcorn className="w-4 h-4  md:h-7 md:w-7" />
          </h3>
          <h3 className="flex space-x-2 text-lg text-green-500">
            {Movie && Math.floor(Movie?.vote_count / 100)} watchers
          </h3>
        </div>
        <p className="hidden sm:block text-center max-w-xs font-extralight text-lg text-ellipsis">
          {Movie?.overview.substring(0, 200).concat("....")}
        </p>
      </div>
    </div>
  );
}

export default Banner;
