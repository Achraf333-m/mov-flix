import Banner from "@/components/Banner";
import Header from "@/components/Header";
import { Movie } from "@/typings";
import links from "@/utils/links";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface props {
  Trending: Movie[];
  Originals: Movie[];
  TopRated: Movie[];
  Action: Movie[];
  Comedy: Movie[];
  Horror: Movie[];
  Romance: Movie[];
  Documentaries: Movie[];
}

function Home({
  Trending,
  Originals,
  TopRated,
  Action,
  Comedy,
  Horror,
  Romance,
  Documentaries,
}: props) {
  console.log(TopRated)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="">
        <Header />
        <Banner TopRated={TopRated}/>
      </div>
    </>
  );
}

export default Home;

export const getServerSideProps:GetServerSideProps = async () => {
  const [
    Trending,
    Originals,
    TopRated,
    Action,
    Comedy,
    Horror,
    Romance,
    Documentaries,
  ] = await Promise.all([
    fetch(links.Trending).then((res) => res?.json()),
    fetch(links.Originals).then((res) => res?.json()),
    fetch(links.TopRated).then((res) => res?.json()),
    fetch(links.Action).then((res) => res?.json()),
    fetch(links.Comedy).then((res) => res?.json()),
    fetch(links.Horror).then((res) => res?.json()),
    fetch(links.Romance).then((res) => res?.json()),
    fetch(links.Documentaries).then((res) => res?.json()),
  ]);

  return {
    props: {
      Trending: Trending.results || null,
      Originals: Originals.results || null,
      TopRated: TopRated.results || null,
      Action: Action.results || null,
      Comedy: Comedy.results || null,
      Horror: Horror.results || null,
      Romance: Romance.results || null,
      Documentaries: Documentaries.results || null,
    },
  };
};