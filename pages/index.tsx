import Banner from "@/components/Banner";
import BasicModal from "@/components/Modal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Row from "@/components/Row";
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
  return (
    <div className="relative !bg-gradient-to-b box-border ">
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className="px-4 lg:space-y-16 lg:px-8 relative pb-24">
        <Banner Trending={Trending} />
        <section>
          <Row title="MovieFLix Originals" Movies={Originals} />
          <Row title="Top Rated Movies" Movies={TopRated} />
          {/* my list */}
          <Row title="Action Movies" Movies={Action} />
          <Row title="Comedy Movies" Movies={Comedy} />
          <Row title="Horror Movies" Movies={Horror} />
          <Row title="Romance Movies" Movies={Romance} />
          <Row title="Documentaries" Movies={Documentaries} />
        </section>
        <BasicModal />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
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
