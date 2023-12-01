import { modalState } from "@/atoms/atom";
import { imgUrl } from "@/constants/url";
import { Movie } from "@/typings";
import { trailer } from "@/utils/trailer";
import { useRecoilState } from 'recoil'

interface props {
    Movie: Movie
}

function Thumbnail({ Movie }:props) {
    const [showTrailer, setShowTrailer] = useRecoilState(modalState)
    const show_trailer = async() => {
        const data = await trailer(Movie.id)
        console.log(data)
    }
    return (
        <figure onClick={() => {setShowTrailer(true), show_trailer()} } className="h-40 w-72 flex-shrink-0 hover:scale-[102%] cursor-pointer">
            <img src={`${imgUrl}${Movie.backdrop_path || Movie.poster_path}`} alt="Thumbnail" className="relative rounded-md object-cover w-full h-full" />
        </figure>
    );
}

export default Thumbnail;