import { Element } from "@/typings"

const key = process.env.NEXT_PUBLIC_KEY


export async function trailer(id:Number, airDate:string | undefined) {
    const link = await fetch(`https://api.themoviedb.org/3/${airDate? 'tv' : 'movie'}/${id}?api_key=${key}&append_to_response=videos`)
    const { videos } = await link.json()
    const videoList = videos?.results
    const Trailer = videoList?.filter((elem:Element) => elem.type === 'Trailer')[0]
    return Trailer?.key
}
