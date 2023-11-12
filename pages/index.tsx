import Banner from "@/components/Banner";
import Header from "@/components/Header";
import links from "@/utils/links";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="px-10 py-4">
        <Header/>
        <Banner />
      </div>
    </>
  );
}

export default Home;

export const getServerSideProps = async() => {
  const [
    Trending,
    Originals,
    TopRated,
    Action,
    Comedy,
    Horror,
    Romance,
    Documentaries
  ] = await Promise.all([
    fetch(links.Trending).then(res => res.json()),
    fetch(links.Originals).then(res => res.json()),
    fetch(links.TopRated).then(res => res.json()),
    fetch(links.Action).then(res => res.json()),
    fetch(links.Comedy).then(res => res.json()),
    fetch(links.Horror).then(res => res.json()),
    fetch(links.Romance).then(res => res.json()),
    fetch(links.Documentaries).then(res => res.json())
  ])

  return {
    props: {
      Trending: Trending.results,
      Originals: Originals.results,
      TopRated: TopRated.results,
      Action: Action.results,
      Comedy: Comedy.results,
      Horror: Horror.results,
      Romance: Romance.results,
      Documentaries: Documentaries.results,
    }
  }
}