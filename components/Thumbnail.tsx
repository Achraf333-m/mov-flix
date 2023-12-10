import { VideoState, modalState, movieState } from "@/atoms/atom";
import { imgUrl } from "@/constants/url";
import { Movie } from "@/typings";
import { trailer } from "@/utils/trailer";
import { useRecoilState } from 'recoil'

interface props {
    Movie: Movie
}

function Thumbnail({ Movie }:props) {
    const [showTrailer, setShowTrailer] = useRecoilState(modalState)
    const [movieTrailer, setmovieTrailer] = useRecoilState(movieState)
    const [videoState, setVideoState] = useRecoilState(VideoState)
    const show_trailer = async() => {
        const data = await trailer(Movie?.id, Movie?.first_air_date)
        setmovieTrailer(data)
        setVideoState(Movie)
    }
    
    return (                                                        
        <figure onClick={() => {setShowTrailer(true), show_trailer()} } className="h-28 min-w-[180px] hover:scale-105 relative transition duration-200 cursor-pointer md:h-36 md:min-w-[260px]">
            <img src={`${imgUrl}${Movie.backdrop_path || Movie.poster_path}`} alt="Thumbnail" className="relative rounded-md object-cover w-full h-full" />
        </figure>
    );
}

export default Thumbnail;